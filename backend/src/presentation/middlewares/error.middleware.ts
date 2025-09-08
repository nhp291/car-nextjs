import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../../shared/utils/logger.util';
import { AppError } from '@/core/errors/app.error';

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

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export class CustomError extends Error implements AppError {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// export const errorHandler = (
//   err: AppError,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   let error = { ...err };
//   error.message = err.message;

//   // Log error
//   logger.error({
//     message: err.message,
//     stack: err.stack,
//     url: req.url,
//     method: req.method,
//     ip: req.ip,
//     userAgent: req.get('User-Agent'),
//   });

//   // Prisma errors
//   if (err.name === 'PrismaClientKnownRequestError') {
//     const prismaError = err as any;
    
//     switch (prismaError.code) {
//       case 'P2002':
//         error = new CustomError('Duplicate entry', 400);
//         break;
//       case 'P2025':
//         error = new CustomError('Record not found', 404);
//         break;
//       case 'P2003':
//         error = new CustomError('Foreign key constraint failed', 400);
//         break;
//       case 'P2000':
//         error = new CustomError('Value too long for column', 400);
//         break;
//       case 'P2001':
//         error = new CustomError('Record not found', 404);
//         break;
//       default:
//         error = new CustomError('Database error', 500);
//     }
//   }

//   // Prisma validation errors
//   if (err.name === 'PrismaClientValidationError') {
//     error = new CustomError('Validation error', 400);
//   }

//   // JWT errors
//   if (err.name === 'JsonWebTokenError') {
//     const message = 'Invalid token';
//     error = new CustomError(message, 401);
//   }

//   if (err.name === 'TokenExpiredError') {
//     const message = 'Token expired';
//     error = new CustomError(message, 401);
//   }

//   // Zod validation errors
//   if (err.name === 'ZodError') {
//     const zodError = err as any;
//     const message = zodError.errors.map((e: any) => e.message).join(', ');
//     error = new CustomError(message, 400);
//   }

//   res.status(error.statusCode || 500).json({
//     success: false,
//     error: error.message || 'Server Error',
//     ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
//   });
// };

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};