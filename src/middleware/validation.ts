import type { NextFunction, Request, Response } from "express";
import * as z from "zod";

export function validateBody(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = schema.safeParse(req.body);

      if (!validation.success) {
        return res.status(422).json({
          code: "UNPROCESSABLE_ENTITY",
          message: "The request body contains invalid data",
          error: z.treeifyError(validation.error),
        });
      }

      req.body = validation.data;

      return next();
    } catch (error) {
      return res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}
