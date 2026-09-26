import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(error.message);

  res.status(500).json({
    error: "Internal Server Error",
    message: "Ocurrió un error interno en el servidor"
  });
};