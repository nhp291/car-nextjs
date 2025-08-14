import { z } from 'zod';

export const createCarSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Tên xe không được để trống'),
    brand: z.string().min(1, 'Hãng xe không được để trống'),
    model: z.string().min(1, 'Model không được để trống'),
    year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
    price: z.number().positive('Giá phải là số dương'),
    mileage: z.number().int().min(0).optional(),
    fuelType: z.enum(['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID', 'PLUG_IN_HYBRID', 'LPG', 'CNG']),
    transmission: z.enum(['MANUAL', 'AUTOMATIC', 'CVT', 'SEMI_AUTOMATIC']),
    driveType: z.enum(['FWD', 'RWD', 'AWD', 'FOUR_WHEEL_DRIVE']),
    engineSize: z.number().positive('Dung tích động cơ phải là số dương'),
    power: z.number().int().min(0, 'Công suất phải là số nguyên dương'),
    torque: z.number().int().min(0).optional(),
    color: z.string().min(1, 'Màu sắc không được để trống'),
    description: z.string().optional(),
    shortDescription: z.string().optional(),
    images: z.array(z.string().url()).optional(),
    features: z.array(z.string()).optional(),
    safetyFeatures: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),
    location: z.string().optional(),
    warranty: z.string().optional(),
    stock: z.number().int().min(0).default(0),
    isNew: z.boolean().default(false),
    isPopular: z.boolean().default(false),
    isFeatured: z.boolean().default(false),
  }),
});

export const updateCarSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID xe không được để trống'),
  }),
  body: z.object({
    name: z.string().min(1, 'Tên xe không được để trống').optional(),
    brand: z.string().min(1, 'Hãng xe không được để trống').optional(),
    model: z.string().min(1, 'Model không được để trống').optional(),
    year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
    price: z.number().positive('Giá phải là số dương').optional(),
    mileage: z.number().int().min(0).optional(),
    fuelType: z.enum(['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID', 'PLUG_IN_HYBRID', 'LPG', 'CNG']).optional(),
    transmission: z.enum(['MANUAL', 'AUTOMATIC', 'CVT', 'SEMI_AUTOMATIC']).optional(),
    driveType: z.enum(['FWD', 'RWD', 'AWD', 'FOUR_WHEEL_DRIVE']).optional(),
    engineSize: z.number().positive('Dung tích động cơ phải là số dương').optional(),
    power: z.number().int().min(0, 'Công suất phải là số nguyên dương').optional(),
    torque: z.number().int().min(0).optional(),
    color: z.string().min(1, 'Màu sắc không được để trống').optional(),
    description: z.string().optional(),
    shortDescription: z.string().optional(),
    images: z.array(z.string().url()).optional(),
    features: z.array(z.string()).optional(),
    safetyFeatures: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),
    location: z.string().optional(),
    warranty: z.string().optional(),
    stock: z.number().int().min(0).optional(),
    isNew: z.boolean().optional(),
    isPopular: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    isAvailable: z.boolean().optional(),
  }),
});

export const getCarSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID xe không được để trống'),
  }),
});

export const getCarsSchema = z.object({
  query: z.object({
    page: z.string().transform(Number).pipe(z.number().int().min(1)).optional(),
    limit: z.string().transform(Number).pipe(z.number().int().min(1).max(100)).optional(),
    search: z.string().optional(),
    brand: z.string().optional(),
    category: z.string().optional(),
    priceMin: z.string().transform(Number).pipe(z.number().min(0)).optional(),
    priceMax: z.string().transform(Number).pipe(z.number().min(0)).optional(),
    fuelType: z.string().optional(),
    transmission: z.string().optional(),
    driveType: z.string().optional(),
    year: z.string().transform(Number).pipe(z.number().int().min(1900)).optional(),
  }),
});

export const getCarBySlugSchema = z.object({
  params: z.object({
    slug: z.string().min(1, 'Slug xe không được để trống'),
  }),
});

export const searchCarsSchema = z.object({
  query: z.object({
    q: z.string().optional(),
    brand: z.string().optional(),
    model: z.string().optional(),
    year: z.string().transform(Number).pipe(z.number().int().min(1900)).optional(),
    priceMin: z.string().transform(Number).pipe(z.number().min(0)).optional(),
    priceMax: z.string().transform(Number).pipe(z.number().min(0)).optional(),
  }),
});

export const toggleFavoriteSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID xe không được để trống'),
  }),
});

export const createInquirySchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID xe không được để trống'),
  }),
  body: z.object({
    type: z.enum(['GENERAL', 'PRICING', 'FINANCING', 'TRADE_IN', 'WARRANTY', 'TECHNICAL']).default('GENERAL'),
    subject: z.string().min(1, 'Tiêu đề không được để trống'),
    message: z.string().min(10, 'Nội dung phải có ít nhất 10 ký tự'),
  }),
});

export const scheduleTestDriveSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID xe không được để trống'),
  }),
  body: z.object({
    scheduledAt: z.string().datetime('Thời gian đặt lịch không hợp lệ'),
    notes: z.string().optional(),
  }),
});