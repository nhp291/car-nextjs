import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { logger } from '../../shared/utils/logger.util';
import { PrismaCarRepository } from '../../infrastructure/database/prisma/repositories/car.repository';
import { ValidationError } from '../../core/errors/app.error';

interface FilterCarsDto {
  search?: string;
  brand?: string;
  priceMin?: string;
  priceMax?: string;
  page?: string;
  limit?: string;
}

export class CarController {
  private carRepository: PrismaCarRepository;

  constructor(private prismaService: PrismaService) {
    this.carRepository = new PrismaCarRepository(prismaService);
  }

  async getCars(req: Request, res: Response, next: NextFunction) {
    try {
      const { 
        search, 
        brand, 
        priceMin, 
        priceMax, 
        page = '1', 
        limit = '12'
      } = req.query as FilterCarsDto;
      
      const where: Prisma.CarWhereInput = {
        isAvailable: true
      };

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { brand: { contains: search, mode: 'insensitive' } },
          { model: { contains: search, mode: 'insensitive' } }
        ];
      }

      if (brand) {
        where.brand = brand;
      }

      if (priceMin || priceMax) {
        where.price = {};
        if (priceMin) where.price = { ...where.price, gte: new Prisma.Decimal(priceMin) };
        if (priceMax) where.price = { ...where.price, lte: new Prisma.Decimal(priceMax) };
      }

      const pageNum = Math.max(1, parseInt(page));
      const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
      const skip = (pageNum - 1) * limitNum;
      
      const [cars, total] = await Promise.all([
        this.prismaService.car.findMany({
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
        this.prismaService.car.count({ where })
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

  async getCarById(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id;
    if (!id || isNaN(parseInt(id))) {
      throw new ValidationError("Invalid car ID");
    }

    const car = await this.carRepository.findById(parseInt(id));

    if (!car) {
      res.status(404).json({
        success: false,
        message: "Không tìm thấy xe",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: car,
    });
  } catch (error) {
    logger.error("Get car by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy thông tin xe",
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

      const cars = await this.prismaService.car.findMany({
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
      const brands = await this.prismaService.car.findMany({
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
      const categories = await this.prismaService.category.findMany({
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
      const cars = await this.prismaService.car.findMany({
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
      const cars = await this.prismaService.car.findMany({
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
      const cars = await this.prismaService.car.findMany({
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
