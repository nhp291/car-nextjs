// Car Types
export interface Car {
    id: string;
    slug: string;
    name: string;
    brand: string;
    category: string;
    description: string;
    image: string;
    images?: string[];
    price: number;
    originalPrice?: number;
    fuelType: string;
    transmission: string;
    driveType: string;
    engine: string;
    power: string;
    torque: string;
    acceleration: string;
    topSpeed: string;
    fuelConsumption: string;
    dimensions: {
        length: number;
        width: number;
        height: number;
        wheelbase: number;
    };
    weight: number;
    seatingCapacity: number;
    features: string[];
    safety: string[];
    colors: string[];
    isNew: boolean;
    isAvailable: boolean;
    rating?: number;
    reviewCount?: number;
    createdAt: string;
    updatedAt: string;
}

// News Types
export interface News {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    images?: string[];
    author: {
        id: string;
        name: string;
        avatar: string;
        bio?: string;
    };
    category: string;
    tags: string[];
    publishedAt: string;
    updatedAt: string;
    readTime: number;
    views: number;
    likes: number;
    comments: number;
    isFeatured: boolean;
    isPublished: boolean;
    seo: {
        title?: string;
        description?: string;
        keywords?: string[];
    };
}

// User Types
export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: 'user' | 'admin';
    phone?: string;
    address?: string;
    dateOfBirth?: string;
    favorites: string[];
    createdAt: string;
    updatedAt: string;
}

// Auth Types
export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone?: string;
    agreeToTerms: boolean;
}

// Filter Types
export interface CarFilters {
    brand?: string;
    category?: string;
    priceRange?: {
        min: number;
        max: number;
    };
    fuelType?: string;
    transmission?: string;
    driveType?: string;
    isNew?: boolean;
    isAvailable?: boolean;
}

export interface NewsFilters {
    category?: string;
    author?: string;
    dateRange?: {
        start: string;
        end: string;
    };
    tags?: string[];
    isFeatured?: boolean;
}

// Search Types
export interface SearchResult {
    type: 'car' | 'news' | 'user';
    id: string;
    title: string;
    description: string;
    image?: string;
    url: string;
    relevance: number;
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// Form Types
export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio';
    placeholder?: string;
    required?: boolean;
    validation?: {
        minLength?: number;
        maxLength?: number;
        pattern?: string;
        custom?: (value: unknown) => string | undefined;
    };
    options?: Array<{
        value: string;
        label: string;
    }>;
}

// Modal Types
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
}

// Toast Types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
}

// Loading Types
export interface LoadingState {
    isLoading: boolean;
    error?: string;
    data?: unknown;
}

// Pagination Types
export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

// Sort Types
export type SortDirection = 'asc' | 'desc';

export interface SortOption {
    field: string;
    direction: SortDirection;
    label: string;
}

// Theme Types
export interface Theme {
    mode: 'light' | 'dark' | 'system';
    primaryColor: string;
    secondaryColor: string;
}

// Settings Types
export interface UserSettings {
    theme: Theme;
    language: string;
    notifications: {
        email: boolean;
        push: boolean;
        sms: boolean;
    };
    privacy: {
        profileVisibility: 'public' | 'private' | 'friends';
        showEmail: boolean;
        showPhone: boolean;
    };
}

// Contact Types
export interface ContactForm {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    agreeToTerms: boolean;
}

// Compare Types
export interface CompareItem {
    id: string;
    type: 'car' | 'news';
    data: Car | News;
}

// Favorite Types
export interface FavoriteItem {
    id: string;
    type: 'car' | 'news';
    itemId: string;
    addedAt: string;
}

// Review Types
export interface Review {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    rating: number;
    title: string;
    content: string;
    images?: string[];
    likes: number;
    createdAt: string;
    updatedAt: string;
}

// Comment Types
export interface Comment {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    content: string;
    likes: number;
    replies?: Comment[];
    createdAt: string;
    updatedAt: string;
} 