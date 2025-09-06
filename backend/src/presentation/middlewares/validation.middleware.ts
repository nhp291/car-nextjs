import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { ValidationError } from "../../core/errors/app.error";

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = {
        body: req.body,
        query: req.query,
        params: req.params,
      };

      const parsed = await schema.parseAsync(data);

      req.body = parsed.body;
      req.query = parsed.query;
      req.params = parsed.params;

      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const firstMessage =
          error.errors.length > 0
            ? error.errors[0]?.message
            : "Validation failed";
        next(new ValidationError(firstMessage));
      } else if (error instanceof Error) {
        next(new ValidationError(error.message));
      } else {
        next(new ValidationError("Invalid request"));
      }
    }
  };
};
