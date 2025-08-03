import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { logger } from '../../shared/utils/logger.util';

const prisma = new PrismaClient();

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, phone } = req.body;

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        res.status(400).json({
          success: false,
          message: 'Email đã được sử dụng'
        });
        return;
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const user = await prisma.user.create({
        data: {
          firstName: name,
          username: email.split('@')[0], // Generate username from email
          email,
          password: hashedPassword,
          phone: phone || null,
          role: 'USER'
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true
        }
      });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '15m' }
      );

      const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: '7d' }
      );

      logger.info(`User registered: ${user.email}`);

      res.status(201).json({
        success: true,
        message: 'Đăng ký thành công',
        data: {
          user: {
            ...user,
            name: `${user.firstName} ${user.lastName || ''}`.trim()
          },
          token,
          refreshToken
        }
      });
    } catch (error) {
      logger.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi đăng ký'
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Email hoặc mật khẩu không đúng'
        });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Email hoặc mật khẩu không đúng'
        });
      }

      // Generate tokens
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '15m' }
      );

      const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: '7d' }
      );

      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() }
      });

      logger.info(`User logged in: ${user.email}`);

      res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công',
        data: {
          user: {
            id: user.id,
            name: `${user.firstName} ${user.lastName || ''}`.trim(),
            email: user.email,
            phone: user.phone,
            role: user.role
          },
          token,
          refreshToken
        }
      });
    } catch (error) {
      logger.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi đăng nhập'
      });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
          lastLoginAt: true
        }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy người dùng'
        });
      }

      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      logger.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy thông tin profile'
      });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const { name, phone } = req.body;

      const user = await prisma.user.update({
        where: { id: userId },
        data: { firstName: name, phone },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          updatedAt: true
        }
      });

      res.status(200).json({
        success: true,
        message: 'Cập nhật profile thành công',
        data: user
      });
    } catch (error) {
      logger.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi cập nhật profile'
      });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      // In a real app, you might want to blacklist the token
      res.status(200).json({
        success: true,
        message: 'Đăng xuất thành công'
      });
    } catch (error) {
      logger.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi đăng xuất'
      });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: 'Refresh token không được cung cấp'
        });
      }

      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Token không hợp lệ'
        });
      }

      const newToken = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '15m' }
      );

      res.status(200).json({
        success: true,
        data: { token: newToken }
      });
    } catch (error) {
      logger.error('Refresh token error:', error);
      res.status(401).json({
        success: false,
        message: 'Token không hợp lệ'
      });
    }
  }

  // Admin methods
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
          lastLoginAt: true
        },
        orderBy: { createdAt: 'desc' }
      });

      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      logger.error('Get all users error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh sách người dùng'
      });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({
        where: { id: id! },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
          lastLoginAt: true
        }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy người dùng'
        });
      }

      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      logger.error('Get user by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy thông tin người dùng'
      });
    }
  }

  // Placeholder methods for future implementation
  async changePassword(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async deleteAccount(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async updateUserStatus(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async deleteUser(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async forgotPassword(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async resetPassword(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async verifyEmail(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }
}