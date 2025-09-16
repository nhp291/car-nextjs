import { Car, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { ICarRepository } from '@/domain/repositories';
import { FilterCarsDtoType } from '@/application/dtos/car.dto';

export class PrismaCarRepository implements ICarRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(filters?: FilterCarsDtoType): Promise<Car[]> {
    const where: Prisma.CarWhereInput = {
      isAvailable: true,
      ...(filters?.brand && { brand: filters.brand }),
      ...(filters?.year && { year: filters.year }),
      ...(filters?.fuelType && { fuelType: filters.fuelType }),
      ...(filters?.transmission && { transmission: filters.transmission }),
      ...(filters?.priceMin && { price: { gte: filters.priceMin } }),
      ...(filters?.priceMax && { price: { lte: filters.priceMax } }),
      ...(filters?.search && {
        OR: [
          { name: { contains: filters.search, mode: 'insensitive' } },
          { brand: { contains: filters.search, mode: 'insensitive' } },
          { model: { contains: filters.search, mode: 'insensitive' } }
        ]
      })
    };

    const skip = ((filters?.page || 1) - 1) * (filters?.limit || 12);
    
    return this.prisma.car.findMany({
      where,
      skip,
      take: filters?.limit || 12,
      orderBy: { createdAt: 'desc' },
      include: {
        categories: {
          include: {
            category: true
          }
        },
        dealer: true
      }
    });
  }

  async findById(id: number): Promise<Car | null> {
    return this.prisma.car.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            category: true
          }
        },
        dealer: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                avatar: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        priceHistory: {
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            reviews: true,
            favorites: true,
            likes: true
          }
        }
      }
    });
  }

  async create(data: Prisma.CarCreateInput): Promise<Car> {
    return this.prisma.car.create({
      data,
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    });
  }

  async update(id: number, data: Prisma.CarUpdateInput): Promise<Car> {
    return this.prisma.car.update({
      where: { id },
      data,
      include: {
        categories: {
          include: {
            category: true
          }
        },
        priceHistory: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.car.delete({
      where: { id }
    });
  }

  async findByBrand(brand: string): Promise<Car[]> {
    return this.prisma.car.findMany({
      where: { 
        brand,
        isAvailable: true 
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findByPriceRange(min: number, max: number): Promise<Car[]> {
    return this.prisma.car.findMany({
      where: {
        price: {
          gte: min,
          lte: max
        },
        isAvailable: true
      },
      orderBy: { price: 'asc' }
    });
  }

  async count(filters?: FilterCarsDtoType): Promise<number> {
    const where: Prisma.CarWhereInput = {
      isAvailable: true,
      ...(filters?.brand && { brand: filters.brand }),
      ...(filters?.year && { year: filters.year }),
      ...(filters?.fuelType && { fuelType: filters.fuelType }),
      ...(filters?.transmission && { transmission: filters.transmission }),
      ...(filters?.priceMin && { price: { gte: filters.priceMin } }),
      ...(filters?.priceMax && { price: { lte: filters.priceMax } })
    };

    return this.prisma.car.count({ where });
  }
}
