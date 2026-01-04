import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      ...(err instanceof ValidationError && err.details && { details: err.details }),
    });
  }

  // Unexpected errors
  console.error("Unexpected error:", err);
  res.status(500).json({
    error: "Internal server error",
  });
};

