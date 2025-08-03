# 🚗 CarFinder - Implementation Guide (Part 2)

## 🎨 FRONTEND MODERNIZATION (Continued)

### 3. Modern Component Architecture (Continued)

```typescript
// src/features/cars/components/CarCard/CarCard.tsx (continued)
          {/* Rating */}
          {car.rating && (
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(car.rating!)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {car.rating} ({car.reviewCount} reviews)
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

// src/features/cars/components/CarGrid/CarGrid.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Car } from '@/shared/types/car.types';
import { CarCard } from '../CarCard/CarCard';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner/LoadingSpinner';

interface CarGridProps {
  cars: Car[];
  loading?: boolean;
  favorites?: string[];
  onFavoriteToggle?: (carId: string) => void;
  className?: string;
}

export const CarGrid: React.FC<CarGridProps> = ({
  cars,
  loading = false,
  favorites = [],
  onFavoriteToggle,
  className = '',
}) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
          <Car className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          No cars found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your search criteria
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}>
      {cars.map((car, index) => (
        <motion.div
          key={car.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <CarCard
            car={car}
            isFavorite={favorites.includes(car.id)}
            onFavoriteToggle={onFavoriteToggle}
          />
        </motion.div>
      ))}
    </div>
  );
};

// src/features/cars/components/CarFilters/CarFilters.tsx
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/atoms/Button/Button';
import { Input } from '@/components/atoms/Input/Input';
import { Select } from '@/components/atoms/Select/Select';
import { Slider } from '@/components/atoms/Slider/Slider';
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox';
import { formatPrice } from '@/shared/utils/format.utils';

const filterSchema = z.object({
  brand: z.string().optional(),
  fuelType: z.string().optional(),
  transmission: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  minYear: z.number().optional(),
  maxYear: z.number().optional(),
  isNew: z.boolean().optional(),
  isCertified: z.boolean().optional(),
});

type FilterFormData = z.infer<typeof filterSchema>;

interface CarFiltersProps {
  onFiltersChange: (filters: FilterFormData) => void;
  initialFilters?: Partial<FilterFormData>;
  brands: string[];
  className?: string;
}

export const CarFilters: React.FC<CarFiltersProps> = ({
  onFiltersChange,
  initialFilters = {},
  brands,
  className = '',
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: initialFilters,
  });

  const watchedValues = watch();

  React.useEffect(() => {
    onFiltersChange(watchedValues);
  }, [watchedValues, onFiltersChange]);

  const handleReset = () => {
    reset();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Reset
        </Button>
      </div>

      {/* Brand Filter */}
      <div>
        <label className="block text-sm font-medium mb-2">Brand</label>
        <Select
          {...register('brand')}
          placeholder="Select brand"
          options={brands.map(brand => ({ value: brand, label: brand }))}
        />
      </div>

      {/* Fuel Type Filter */}
      <div>
        <label className="block text-sm font-medium mb-2">Fuel Type</label>
        <Select
          {...register('fuelType')}
          placeholder="Select fuel type"
          options={[
            { value: 'PETROL', label: 'Petrol' },
            { value: 'DIESEL', label: 'Diesel' },
            { value: 'ELECTRIC', label: 'Electric' },
            { value: 'HYBRID', label: 'Hybrid' },
            { value: 'PLUG_IN_HYBRID', label: 'Plug-in Hybrid' },
          ]}
        />
      </div>

      {/* Transmission Filter */}
      <div>
        <label className="block text-sm font-medium mb-2">Transmission</label>
        <Select
          {...register('transmission')}
          placeholder="Select transmission"
          options={[
            { value: 'MANUAL', label: 'Manual' },
            { value: 'AUTOMATIC', label: 'Automatic' },
            { value: 'CVT', label: 'CVT' },
            { value: 'SEMI_AUTOMATIC', label: 'Semi-Automatic' },
          ]}
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Price Range: {formatPrice(watchedValues.minPrice || 0)} - {formatPrice(watchedValues.maxPrice || 10000000000)}
        </label>
        <Slider
          min={0}
          max={10000000000}
          step={100000000}
          value={[watchedValues.minPrice || 0, watchedValues.maxPrice || 10000000000]}
          onValueChange={([min, max]) => {
            setValue('minPrice', min);
            setValue('maxPrice', max);
          }}
        />
      </div>

      {/* Year Range */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Year Range: {watchedValues.minYear || 2000} - {watchedValues.maxYear || new Date().getFullYear()}
        </label>
        <Slider
          min={2000}
          max={new Date().getFullYear()}
          step={1}
          value={[watchedValues.minYear || 2000, watchedValues.maxYear || new Date().getFullYear()]}
          onValueChange={([min, max]) => {
            setValue('minYear', min);
            setValue('maxYear', max);
          }}
        />
      </div>

      {/* Condition Filters */}
      <div className="space-y-3">
        <label className="block text-sm font-medium">Condition</label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isNew"
              {...register('isNew')}
            />
            <label htmlFor="isNew" className="text-sm">New Cars</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isCertified"
              {...register('isCertified')}
            />
            <label htmlFor="isCertified" className="text-sm">Certified Pre-owned</label>
          </div>
        </div>
      </div>
    </div>
  );
};
```

### 4. Modern Hooks & State Management

```typescript
// src/shared/hooks/useAuth.ts
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials, RegisterData } from '@/shared/types/auth.types';
import { authAPI } from '@/shared/services/api.service';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.login(credentials);
          set({
            user: response.data.user,
            token: response.data.token,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.register(data);
          set({
            user: response.data.user,
            token: response.data.token,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null });
      },

      clearError: () => {
        set({ error: null });
      },

      refreshUser: async () => {
        const { token } = get();
        if (!token) return;

        try {
          const user = await authAPI.getProfile();
          set({ user: user.data });
        } catch (error) {
          // Token might be expired, logout user
          set({ user: null, token: null });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);

// src/shared/hooks/useCars.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Car, CarFilters, CreateCarData, UpdateCarData } from '@/shared/types/car.types';
import { carsAPI } from '@/shared/services/api.service';
import { PaginatedResponse } from '@/shared/types/api.types';

export const useCars = (filters: CarFilters = {}, page: number = 1, limit: number = 12) => {
  return useQuery({
    queryKey: ['cars', filters, page, limit],
    queryFn: () => carsAPI.getAll({ ...filters, page, limit }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCar = (id: string) => {
  return useQuery({
    queryKey: ['car', id],
    queryFn: () => carsAPI.getById(id),
    enabled: !!id,
  });
};

export const useCreateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCarData) => carsAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
};

export const useUpdateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCarData }) =>
      carsAPI.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      queryClient.invalidateQueries({ queryKey: ['car', id] });
    },
  });
};

export const useDeleteCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => carsAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
};

// src/shared/hooks/useFavorites.ts
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[];
  addFavorite: (carId: string) => void;
  removeFavorite: (carId: string) => void;
  toggleFavorite: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (carId) => {
        set((state) => ({
          favorites: [...new Set([...state.favorites, carId])],
        }));
      },

      removeFavorite: (carId) => {
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== carId),
        }));
      },

      toggleFavorite: (carId) => {
        const { favorites } = get();
        if (favorites.includes(carId)) {
          get().removeFavorite(carId);
        } else {
          get().addFavorite(carId);
        }
      },

      isFavorite: (carId) => {
        return get().favorites.includes(carId);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
);
```

### 5. Modern API Service Layer

```typescript
// src/shared/services/api.service.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '@/shared/hooks/useAuth';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          useAuthStore.getState().logout();
          window.location.href = '/auth/login';
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiService = new ApiService();

// Auth API
export const authAPI = {
  login: (credentials: LoginCredentials) =>
    apiService.post<AuthResponse>('/auth/login', credentials),
  
  register: (data: RegisterData) =>
    apiService.post<AuthResponse>('/auth/register', data),
  
  getProfile: () =>
    apiService.get<ApiResponse<User>>('/auth/profile'),
  
  updateProfile: (data: Partial<User>) =>
    apiService.put<AuthResponse>('/auth/profile', data),
  
  logout: () =>
    apiService.post('/auth/logout'),
};

// Cars API
export const carsAPI = {
  getAll: (params: CarQueryParams = {}) =>
    apiService.get<PaginatedResponse<Car>>('/cars', { params }),
  
  getById: (id: string) =>
    apiService.get<ApiResponse<Car>>(`/cars/${id}`),
  
  getBySlug: (slug: string) =>
    apiService.get<ApiResponse<Car>>(`/cars/slug/${slug}`),
  
  create: (data: CreateCarData) =>
    apiService.post<ApiResponse<Car>>('/cars', data),
  
  update: (id: string, data: UpdateCarData) =>
    apiService.put<ApiResponse<Car>>(`/cars/${id}`, data),
  
  delete: (id: string) =>
    apiService.delete<ApiResponse<void>>(`/cars/${id}`),
  
  getStats: () =>
    apiService.get<ApiResponse<CarStats>>('/cars/stats'),
  
  search: (query: string) =>
    apiService.get<ApiResponse<Car[]>>(`/cars/search?q=${encodeURIComponent(query)}`),
};
```

### 6. Modern App Router Pages

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/shared/providers/ThemeProvider';
import { QueryProvider } from '@/shared/providers/QueryProvider';
import { Toaster } from '@/components/atoms/Toast/Toaster';
import { Header } from '@/components/organisms/Header/Header';
import { Footer } from '@/components/organisms/Footer/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'CarFinder - Find Your Perfect Car',
    template: '%s | CarFinder',
  },
  description: 'Discover, compare, and find your perfect car with CarFinder. Browse thousands of cars with advanced search and comparison tools.',
  keywords: ['cars', 'automotive', 'car finder', 'car comparison', 'buy cars'],
  authors: [{ name: 'CarFinder Team' }],
  creator: 'CarFinder',
  publisher: 'CarFinder',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'CarFinder - Find Your Perfect Car',
    description: 'Discover, compare, and find your perfect car with CarFinder.',
    siteName: 'CarFinder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CarFinder - Find Your Perfect Car',
    description: 'Discover, compare, and find your perfect car with CarFinder.',
    creator: '@carfinder',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// src/app/page.tsx
import { Suspense } from 'react';
import { Metadata } from 'next';
import { HeroSection } from '@/features/home/components/HeroSection/HeroSection';
import { FeaturedCars } from '@/features/home/components/FeaturedCars/FeaturedCars';
import { PopularBrands } from '@/features/home/components/PopularBrands/PopularBrands';
import { LatestNews } from '@/features/home/components/LatestNews/LatestNews';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner/LoadingSpinner';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Find your perfect car with CarFinder. Browse thousands of cars, compare features, and get the best deals.',
};

export default function HomePage() {
  return (
    <div className="space-y-16 py-8">
      <HeroSection />
      
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedCars />
      </Suspense>
      
      <PopularBrands />
      
      <Suspense fallback={<LoadingSpinner />}>
        <LatestNews />
      </Suspense>
    </div>
  );
}

// src/app/cars/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { Metadata } from 'next';
import { useCars } from '@/shared/hooks/useCars';
import { useFavoritesStore } from '@/shared/hooks/useFavorites';
import { CarGrid } from '@/features/cars/components/CarGrid/CarGrid';
import { CarFilters } from '@/features/cars/components/CarFilters/CarFilters';
import { SearchBar } from '@/components/molecules/SearchBar/SearchBar';
import { Pagination } from '@/components/molecules/Pagination/Pagination';
import { Button } from '@/components/atoms/Button/Button';
import { Filter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Browse Cars',
  description: 'Browse our extensive collection of cars. Filter by brand, price, fuel type, and more to find your perfect match.',
};

export default function CarsPage() {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, error } = useCars(
    { ...filters, search: searchQuery },
    page,
    12
  );

  const { favorites, toggleFavorite } = useFavoritesStore();

  const handleFiltersChange = useCallback((newFilters: any) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page when search changes
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error loading cars</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Browse Cars
        </h1>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search cars by name, brand, or model..."
            className="flex-1 max-w-md"
          />
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside className={`w-80 shrink-0 ${showFilters ? 'block' : 'hidden'} sm:block`}>
          <div className="sticky top-4">
            <CarFilters
              onFiltersChange={handleFiltersChange}
              brands={['Toyota', 'Honda', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen']}
            />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Results Info */}
          {data && (
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {data.data.length} of {data.pagination.total} cars
              </p>
              <div className="text-sm text-gray-500">
                Page {data.pagination.page} of {data.pagination.totalPages}
              </div>
            </div>
          )}

          {/* Cars Grid */}
          <CarGrid
            cars={data?.data || []}
            loading={isLoading}
            favorites={favorites}
            onFavoriteToggle={toggleFavorite}
            className="mb-8"
          />

          {/* Pagination */}
          {data && data.pagination.totalPages > 1 && (
            <Pagination
              currentPage={data.pagination.page}
              totalPages={data.pagination.totalPages}
              onPageChange={handlePageChange}
              hasNext={data.pagination.hasNext}
              hasPrev={data.pagination.hasPrev}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// src/app/cars/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CarDetailView } from '@/features/cars/components/CarDetailView/CarDetailView';
import { carsAPI } from '@/shared/services/api.service';

interface CarPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CarPageProps): Promise<Metadata> {
  try {
    const response = await carsAPI.getBySlug(params.slug);
    const car = response.data;

    return {
      title: car.name,
      description: car.shortDescription || car.description,
      keywords: [car.brand, car.model, car.fuelType, car.transmission],
      openGraph: {
        title: car.name,
        description: car.shortDescription || car.description,
        images: car.images.map(image => ({
          url: image,
          width: 1200,
          height: 630,
          alt: car.name,
        })),
      },
    };
  } catch (error) {
    return {
      title: 'Car Not Found',
    };
  }
}

export default async function CarPage({ params }: CarPageProps) {
  try {
    const response = await carsAPI.getBySlug(params.slug);
    const car = response.data;

    return <CarDetailView car={car} />;
  } catch (error) {
    notFound();
  }
}
```

---

## 🔧 DEVELOPMENT TOOLS CONFIGURATION

### 1. ESLint Configuration

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/