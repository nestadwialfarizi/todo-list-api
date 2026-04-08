import { type Request, type Response, Router } from "express";
import { eq } from "drizzle-orm";

import { db, table } from "../../lib/db";
import { validateBody } from "../../middleware/validation";
import { compareEncrypted, encrypt } from "../../utils/bcrypt";
import { generateToken } from "../../utils/jwt";

import * as schema from "./schema";

const router = Router();

router.post(
  "/register",
  validateBody(schema.registerBody),
  async (req: Request<object, object, schema.RegisterBody>, res: Response) => {
    try {
      const count = await db.$count(
        table.users,
        eq(table.users.email, req.body.email),
      );

      if (count !== 0) {
        return res.status(409).json({
          code: "CONFLICT",
          message: `${req.body.email} is already used by another user`,
        });
      }

      const users = await db
        .insert(table.users)
        .values({
          name: req.body.name,
          email: req.body.email,
          password: encrypt(req.body.password),
        })
        .returning({ id: table.users.id });

      return res.status(201).json({ token: generateToken(users[0].id) });
    } catch (error) {
      return res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

router.post(
  "/login",
  validateBody(schema.loginBody),
  async (req: Request<object, object, schema.LoginBody>, res: Response) => {
    try {
      const users = await db
        .select({
          id: table.users.id,
          password: table.users.password,
        })
        .from(table.users)
        .where(eq(table.users.email, req.body.email));

      if (users.length === 0) {
        return res.status(404).json({
          code: "NOT_FOUND",
          message: `${req.body.email} is not registered`,
        });
      }

      if (!compareEncrypted(req.body.password, users[0].password)) {
        return res.status(404).json({
          code: "UNAUTHORIZED",
          message: "Wrong email or password",
        });
      }

      return res.status(200).json({ token: generateToken(users[0].id) });
    } catch (error) {
      return res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

export { router as authRouter };
