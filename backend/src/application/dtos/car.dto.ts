import { z } from 'zod';
import { CarCondition, FuelType, Transmission, DriveType } from '@prisma/client';

// Request DTOs
export const CreateCarDto = z.object({
  body: z.object({
    name: z.string().min(1),
    brand: z.string().min(1),
    model: z.string().min(1),
    year: z.number().min(1900).max(new Date().getFullYear() + 1),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Price must be a decimal with up to 2 decimal places'),
    originalPrice: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Price must be a decimal with up to 2 decimal places').optional(),
    mileage: z.number().min(0),
    condition: z.nativeEnum(CarCondition),
    fuelType: z.nativeEnum(FuelType),
    transmission: z.nativeEnum(Transmission),
    driveType: z.nativeEnum(DriveType),
    engineSize: z.string().regex(/^\d+(\.\d{1})?$/, 'Engine size must be a decimal with up to 1 decimal place'),
    power: z.number().positive(),
    torque: z.number().positive(),
    color: z.string().min(1),
    categoryIds: z.array(z.number()).optional(),
    dealerId: z.string().uuid().optional(),
    description: z.string().optional(),
    shortDescription: z.string().optional(),
    features: z.array(z.string()).optional(),
    safetyFeatures: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    videos: z.array(z.string()).optional()
  })
});

export type CreateCarDto = {
  slug: string;
  name: string;
  brand: string;
  year: number;
  price: number;
  isAvailable?: boolean;
};


export const UpdateCarDto = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number')
  }),
  body: CreateCarDto.shape.body.partial()
});

export const GetCarByIdDto = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number')
  })
});

export const GetCarBySlugDto = z.object({
  params: z.object({
    slug: z.string().min(1)
  })
});

export const GetCarsByBrandDto = z.object({
  params: z.object({
    brand: z.string().min(1)
  })
});

export const GetCarsByCategoryDto = z.object({
  params: z.object({
    categoryId: z.string().regex(/^\d+$/, 'Category ID must be a number')
  })
});

export const FilterCarsDto = z.object({
  query: z.object({
    search: z.string().optional(),
    brand: z.string().optional(),
    model: z.string().optional(),
    year: z.string().regex(/^\d+$/, 'Year must be a number').optional(),
    priceMin: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Price must be a decimal').optional(),
    priceMax: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Price must be a decimal').optional(),
    condition: z.nativeEnum(CarCondition).optional(),
    fuelType: z.nativeEnum(FuelType).optional(),
    transmission: z.nativeEnum(Transmission).optional(),
    driveType: z.nativeEnum(DriveType).optional(),
    categoryId: z.string().regex(/^\d+$/, 'Category ID must be a number').optional(),
    page: z.string().regex(/^\d+$/, 'Page must be a number').default('1'),
    limit: z.string().regex(/^\d+$/, 'Limit must be a number').default('12'),
    sortBy: z.enum(['price', 'year', 'createdAt']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  })
});

export const CreateInquiryDto = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Car ID must be a number')
  }),
  body: z.object({
    type: z.string(),
    subject: z.string().min(1),
    message: z.string().min(1)
  })
});

export const CreateTestDriveDto = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'Car ID must be a number')
  }),
  body: z.object({
    scheduledAt: z.string().datetime(),
    notes: z.string().optional()
  })
});

export type FilterCarsDtoType = z.infer<typeof FilterCarsDto>;

// Response type
export type CarResponseDtoType = {
  id: number;
  name: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: string;
  originalPrice?: string;
  mileage: number;
  condition: CarCondition;
  fuelType: FuelType;
  transmission: Transmission;
  driveType: DriveType;
  engineSize: string;
  power: number;
  torque: number;
  color: string;
  categories: Array<{ category: { id: number; name: string; } }>;
  description?: string;
  shortDescription?: string;
  features: string[];
  safetyFeatures: string[];
  images: string[];
  videos: string[];
  isAvailable: boolean;
  dealer?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  _count: {
    reviews: number;
    favorites: number;
  };
  createdAt: Date;
  updatedAt: Date;
};
