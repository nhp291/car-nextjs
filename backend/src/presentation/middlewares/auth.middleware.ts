import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../../config/env.config";
import { UnauthorizedError, ForbiddenError } from "../../core/errors/app.error";
import { PrismaService } from "../../infrastructure/database/prisma/prisma.service";

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
