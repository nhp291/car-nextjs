import { z } from 'zod';

// User validation schemas
export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  confirmPassword: z.string(),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

export const profileSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().optional(),
  avatar: z.string().optional(),
});

// Car search validation
export const carSearchSchema = z.object({
  query: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().min(0).optional(),
  fuelType: z.enum(['gasoline', 'diesel', 'electric', 'hybrid']).optional(),
  transmission: z.enum(['manual', 'automatic']).optional(),
  bodyType: z.enum(['sedan', 'suv', 'hatchback', 'coupe', 'convertible', 'wagon']).optional(),
});

// Car comparison validation
export const carComparisonSchema = z.object({
  carIds: z.array(z.string()).min(2, 'Phải chọn ít nhất 2 xe để so sánh').max(4, 'Chỉ có thể so sánh tối đa 4 xe'),
});

// Contact form validation
export const contactSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  subject: z.string().min(5, 'Tiêu đề phải có ít nhất 5 ký tự'),
  message: z.string().min(10, 'Nội dung phải có ít nhất 10 ký tự'),
});

// Review validation
export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(5, 'Tiêu đề phải có ít nhất 5 ký tự'),
  content: z.string().min(10, 'Nội dung phải có ít nhất 10 ký tự'),
});

// Admin car creation/update validation
export const carFormSchema = z.object({
  name: z.string().min(2, 'Tên xe phải có ít nhất 2 ký tự'),
  brand: z.string().min(2, 'Hãng xe phải có ít nhất 2 ký tự'),
  model: z.string().min(2, 'Dòng xe phải có ít nhất 2 ký tự'),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  price: z.number().min(0, 'Giá phải lớn hơn 0'),
  description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  specifications: z.object({
    engine: z.string().optional(),
    power: z.string().optional(),
    transmission: z.enum(['manual', 'automatic']),
    fuelType: z.enum(['gasoline', 'diesel', 'electric', 'hybrid']),
    bodyType: z.enum(['sedan', 'suv', 'hatchback', 'coupe', 'convertible', 'wagon']),
    seats: z.number().min(2).max(10),
    fuelConsumption: z.string().optional(),
  }),
  images: z.array(z.string()).min(1, 'Phải có ít nhất 1 hình ảnh'),
  features: z.array(z.string()).optional(),
  isAvailable: z.boolean().default(true),
});

// Export types
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type CarSearchFormData = z.infer<typeof carSearchSchema>;
export type CarComparisonFormData = z.infer<typeof carComparisonSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type CarFormData = z.infer<typeof carFormSchema>; 