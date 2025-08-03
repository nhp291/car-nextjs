// Application Constants
export const APP_CONFIG = {
  name: 'CarFinder',
  version: '2.0.0',
  description: 'Modern Car Discovery Platform',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  environment: process.env.NODE_ENV || 'development',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
  },
  cars: {
    list: '/cars',
    detail: (id: string) => `/cars/${id}`,
    search: '/cars/search',
    compare: '/cars/compare',
    favorites: '/cars/favorites',
  },
  news: {
    list: '/news',
    detail: (id: string) => `/news/${id}`,
  },
} as const;

// UI Constants
export const UI_CONFIG = {
  pagination: {
    defaultPageSize: 12,
    maxPageSize: 50,
  },
  search: {
    debounceMs: 300,
    minSearchLength: 2,
  },
  carousel: {
    autoplayInterval: 5000,
  },
} as const;

// Feature Flags
export const FEATURES = {
  enable3DViewer: true,
  enableComparison: true,
  enableFavorites: true,
  enableNews: true,
  enableAdminPanel: true,
} as const; 