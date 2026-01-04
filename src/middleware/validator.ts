import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { ValidationError } from "../errors/AppError";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = new ValidationError("Validation failed", error.errors);
        return next(validationError);
      }
      next(error);
    }
  };
};

