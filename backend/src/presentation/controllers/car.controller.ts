import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { logger } from '../../shared/utils/logger.util';

const prisma = new PrismaClient();

export class CarController {
  async getCars(req: Request, res: Response) {
    try {
      const { page = 1, limit = 12, search, brand, category, priceMin, priceMax } = req.query;
      
      const where: any = {
        isAvailable: true
      };

      if (search) {
        where.OR = [
          { name: { contains: search as string, mode: 'insensitive' } },
          { brand: { contains: search as string, mode: 'insensitive' } },
          { model: { contains: search as string, mode: 'insensitive' } }
        ];
      }

      if (brand) {
        where.brand = brand;
      }

      if (priceMin || priceMax) {
        where.price = {};
        if (priceMin) where.price.gte = Number(priceMin);
        if (priceMax) where.price.lte = Number(priceMax);
      }

      const skip = (Number(page) - 1) * Number(limit);
      
      const [cars, total] = await Promise.all([
        prisma.car.findMany({
          where,
          skip,
          take: Number(limit),
          orderBy: { createdAt: 'desc' },
          include: {
            categories: {
              include: {
                category: true
              }
            },
            _count: {
              select: {
                reviews: true,
                favorites: true
              }
            }
          }
        }),
        prisma.car.count({ where })
      ]);

      res.status(200).json({
        success: true,
        data: cars,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit))
        }
      });
    } catch (error) {
      logger.error('Get cars error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh sách xe'
      });
    }
  }

  async getCarById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const car = await prisma.car.findUnique({
        where: { id },
        include: {
          categories: {
            include: {
              category: true
            }
          },
          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            },
            orderBy: { createdAt: 'desc' }
          },
          _count: {
            select: {
              reviews: true,
              favorites: true
            }
          }
        }
      });

      if (!car) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy xe'
        });
      }

      res.status(200).json({
        success: true,
        data: car
      });
    } catch (error) {
      logger.error('Get car by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy thông tin xe'
      });
    }
  }

  async searchCars(req: Request, res: Response) {
    try {
      const { q, brand, model, year, priceMin, priceMax } = req.query;

      const where: any = {
        isAvailable: true
      };

      if (q) {
        where.OR = [
          { name: { contains: q as string, mode: 'insensitive' } },
          { brand: { contains: q as string, mode: 'insensitive' } },
          { model: { contains: q as string, mode: 'insensitive' } }
        ];
      }

      if (brand) where.brand = brand;
      if (model) where.model = model;
      if (year) where.year = Number(year);
      if (priceMin || priceMax) {
        where.price = {};
        if (priceMin) where.price.gte = Number(priceMin);
        if (priceMax) where.price.lte = Number(priceMax);
      }

      const cars = await prisma.car.findMany({
        where,
        take: 20,
        orderBy: { createdAt: 'desc' },
        include: {
          categories: {
            include: {
              category: true
            }
          }
        }
      });

      res.status(200).json({
        success: true,
        data: cars
      });
    } catch (error) {
      logger.error('Search cars error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi tìm kiếm xe'
      });
    }
  }

  async getBrands(req: Request, res: Response) {
    try {
      const brands = await prisma.car.findMany({
        select: { brand: true },
        where: { isAvailable: true },
        distinct: ['brand'],
        orderBy: { brand: 'asc' }
      });

      res.status(200).json({
        success: true,
        data: brands.map(b => b.brand)
      });
    } catch (error) {
      logger.error('Get brands error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh sách hãng xe'
      });
    }
  }

  async getCategories(req: Request, res: Response) {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' }
      });

      res.status(200).json({
        success: true,
        data: categories
      });
    } catch (error) {
      logger.error('Get categories error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh mục xe'
      });
    }
  }

  async getFeaturedCars(req: Request, res: Response) {
    try {
      const cars = await prisma.car.findMany({
        where: { 
          isAvailable: true,
          isFeatured: true 
        },
        take: 6,
        orderBy: { createdAt: 'desc' },
        include: {
          categories: {
            include: {
              category: true
            }
          }
        }
      });

      res.status(200).json({
        success: true,
        data: cars
      });
    } catch (error) {
      logger.error('Get featured cars error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy xe nổi bật'
      });
    }
  }

  async getPopularCars(req: Request, res: Response) {
    try {
      const cars = await prisma.car.findMany({
        where: { isAvailable: true },
        take: 8,
        orderBy: { viewCount: 'desc' },
        include: {
          categories: {
            include: {
              category: true
            }
          }
        }
      });

      res.status(200).json({
        success: true,
        data: cars
      });
    } catch (error) {
      logger.error('Get popular cars error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy xe phổ biến'
      });
    }
  }

  async getNewCars(req: Request, res: Response) {
    try {
      const cars = await prisma.car.findMany({
        where: { 
          isAvailable: true,
          year: { gte: new Date().getFullYear() - 1 }
        },
        take: 8,
        orderBy: { year: 'desc' },
        include: {
          categories: {
            include: {
              category: true
            }
          }
        }
      });

      res.status(200).json({
        success: true,
        data: cars
      });
    } catch (error) {
      logger.error('Get new cars error:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy xe mới'
      });
    }
  }

  // Placeholder methods for future implementation
  async getCarStats(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async getCarsByBrand(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async getCarsByCategory(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async getCarBySlug(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async toggleFavorite(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async getSimilarCars(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async incrementViewCount(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async createInquiry(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async scheduleTestDrive(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async createCar(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async updateCar(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async deleteCar(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async updateCarStatus(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async getAllCarsAdmin(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async getCarAnalytics(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async bulkImportCars(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }

  async bulkUpdateCars(req: Request, res: Response) {
    res.status(501).json({
      success: false,
      message: 'Chức năng đang được phát triển'
    });
  }
}
