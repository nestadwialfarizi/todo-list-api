import { type Request, type Response, Router } from "express";

import { db, table } from "../lib/db";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const todos = await db.select().from(table.todos);
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
