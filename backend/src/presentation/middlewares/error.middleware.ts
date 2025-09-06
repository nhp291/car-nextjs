import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../../core/errors/app.error';
import { logger } from '../../shared/utils/logger.util';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  // Zod validation errors
  if (error instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: error.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message
      }))
    });
  }

  // Custom AppError
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  // Prisma errors
  if (error.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({
      status: 'error',
      message: 'Database operation failed'
    });
  }

  // Default error
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};
