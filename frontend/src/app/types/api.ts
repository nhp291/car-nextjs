// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    pagination: {
      totalPages: number;
      currentPage: number;
      total: number;
      limit: number;
    };
  };
}

// User Types
export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  token: string;
}

// Car Types
export interface Car {
  _id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'LPG';
  transmission: 'Manual' | 'Automatic' | 'CVT';
  engineSize: number;
  power: number;
  color: string;
  description?: string;
  images: string[];
  features: string[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CarStats {
  overall: {
    totalCars: number;
    avgPrice: number;
    minPrice: number;
    maxPrice: number;
  };
  byBrand: Array<{
    _id: string;
    count: number;
    avgPrice: number;
  }>;
}

// API Query Parameters
export interface CarQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  brand?: string;
  fuelType?: Car['fuelType'];
  minPrice?: number;
  maxPrice?: number;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CarForm {
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: Car['fuelType'];
  transmission: Car['transmission'];
  engineSize: number;
  power: number;
  color: string;
  description?: string;
  images?: string[];
  features?: string[];
  isAvailable?: boolean;
}

// Error Types
export interface ApiError {
  message: string;
  statusCode?: number;
  field?: string;
}

// Loading States
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
} 