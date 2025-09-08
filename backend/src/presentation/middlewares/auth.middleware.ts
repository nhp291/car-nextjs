import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../../config/env.config";
import { UnauthorizedError, ForbiddenError } from "../../core/errors/app.error";
import { PrismaService } from "../../infrastructure/database/prisma/prisma.service";
import { logger } from '../../shared/utils/logger.util';


declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const prisma = new PrismaService();


export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedError("No token provided");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new UnauthorizedError("Token missing");
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;

    if (!decoded?.id) {
      throw new UnauthorizedError("Invalid token structure");
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true,
        isActive: true,
        isVerified: true,
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedError("Invalid or expired token");
    }

    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedError("Authentication failed"));
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError("Not authenticated"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError("Not authorized"));
    }

    next();
  };
};

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

// export const authenticate = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const authHeader = req.headers.authorization;
    
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({
//         success: false,
//         message: 'Token không được cung cấp'
//       });
//     }

//     const token = authHeader.substring(7); // Remove 'Bearer ' prefix

//     if (!process.env.JWT_SECRET) {
//       logger.error('JWT_SECRET is not configured');
//       return res.status(500).json({
//         success: false,
//         message: 'Lỗi cấu hình server'
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;

//     // Check if user still exists
//     const user = await prisma.user.findUnique({
//       where: { id: decoded.userId },
//       select: { id: true, email: true, role: true }
//     });

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Token không hợp lệ'
//       });
//     }

//     req.user = {
//       userId: user.id,
//       email: user.email,
//       role: user.role
//     };

//     next();
//   } catch (error) {
//     logger.error('Authentication error:', error);
//     return res.status(401).json({
//       success: false,
//       message: 'Token không hợp lệ'
//     });
//   }
// };

// export const authorize = (roles: string[]) => {
//   return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Không có quyền truy cập'
//       });
//     }

//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({
//         success: false,
//         message: 'Không có quyền thực hiện hành động này'
//       });
//     }

//     next();
//   };
// };

// Middleware for optional authentication (doesn't fail if no token)

export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: any,
  next: any
): Promise<void> => {
  try {
    const authHeader = req.headers?.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      next();
      return;
    }

    req.user = {
      id: 'dummy-user-id',
      email: 'dummy@example.com',
      role: 'USER',
    };

    next();
  } catch (error) {
    next();
  }
};