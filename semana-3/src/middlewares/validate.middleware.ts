import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        error: "Validation Error",
        message: "Los datos enviados no son válidos",
        details: result.error.errors.map((error) => ({
          field: error.path.join("."),
          message: error.message
        }))
      });
      return;
    }

    req.body = result.data;
    next();
  };
};