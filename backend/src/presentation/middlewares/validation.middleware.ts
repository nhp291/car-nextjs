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

  export const validate = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.parseAsync({
          body: req.body,
          query: req.query,
          params: req.params,
        });
        next();
      } catch (error: any) {
        const errorMessage = error.errors?.map((err: any) => err.message).join(', ') || 'Validation failed';
        
        return res.status(400).json({
          success: false,
          message: errorMessage,
          errors: error.errors
        });
      }
    };
  };

  // Sanitize input data
  export const sanitizeInput = (req: any, res: any, next: any): void => {
    // Remove any potential XSS attempts
    const sanitizeObject = (obj: any): any => {
      if (typeof obj === 'string') {
        return obj
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<[^>]*>/g, '')
          .trim();
      }
      
      if (Array.isArray(obj)) {
        return obj.map(sanitizeObject);
      }
      
      if (obj && typeof obj === 'object') {
        const sanitized: any = {};
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            sanitized[key] = sanitizeObject(obj[key]);
          }
        }
        return sanitized;
      }
      
      return obj;
    };

    if (req.body) {
      req.body = sanitizeObject(req.body);
    }
    
    if (req.query) {
      req.query = sanitizeObject(req.query);
    }
    
    if (req.params) {
      req.params = sanitizeObject(req.params);
    }

    next();
  };

  // Check content type for POST/PUT requests
  export const checkContentType = (req: any, res: any, next: any): void => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      const contentType = req.get('Content-Type');
      
      if (!contentType || !contentType.includes('application/json')) {
        const response = {
          success: false,
          message: 'Content-Type must be application/json',
          timestamp: new Date().toISOString(),
        };
        
        res.status(400).json(response);
        return;
      }
    }
    
    next();
  };