import { 
  ApiResponse, 
  PaginatedResponse, 
  User, 
  AuthResponse, 
  Car, 
  CarStats, 
  CarQueryParams,
  LoginForm,
  RegisterForm,
  CarForm,
  ApiError 
} from '../types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,
  backoffMultiplier: 2,
};

// Helper function for API calls with retry logic
const apiCall = async <T>(
  endpoint: string, 
  options: RequestInit = {},
  retryCount = 0
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
      (error as any).statusCode = response.status;
      throw error;
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    // Retry logic for network errors
    if (retryCount < RETRY_CONFIG.maxRetries && 
        (error instanceof TypeError || (error as any).message?.includes('fetch'))) {
      const delay = RETRY_CONFIG.retryDelay * Math.pow(RETRY_CONFIG.backoffMultiplier, retryCount);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      
      return apiCall<T>(endpoint, options, retryCount + 1);
    }
    
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (userData: RegisterForm): Promise<AuthResponse> => {
    return apiCall<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  login: async (credentials: LoginForm): Promise<AuthResponse> => {
    return apiCall<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  getProfile: async (): Promise<User> => {
    return apiCall<User>('/auth/profile');
  },
  
  updateProfile: async (userData: Partial<User>): Promise<AuthResponse> => {
    return apiCall<AuthResponse>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
};

// Cars API
export const carsAPI = {
  getAll: async (params: CarQueryParams = {}): Promise<PaginatedResponse<Car>> => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    return apiCall<PaginatedResponse<Car>>(`/cars?${searchParams.toString()}`);
  },
  
  getById: async (id: string): Promise<ApiResponse<Car>> => {
    return apiCall<ApiResponse<Car>>(`/cars/${id}`);
  },
  
  create: async (carData: CarForm): Promise<ApiResponse<Car>> => {
    return apiCall<ApiResponse<Car>>('/cars', {
      method: 'POST',
      body: JSON.stringify(carData),
    });
  },
  
  update: async (id: string, carData: Partial<CarForm>): Promise<ApiResponse<Car>> => {
    return apiCall<ApiResponse<Car>>(`/cars/${id}`, {
      method: 'PUT',
      body: JSON.stringify(carData),
    });
  },
  
  delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiCall<ApiResponse<{ message: string }>>(`/cars/${id}`, {
      method: 'DELETE',
    });
  },
  
  getByBrand: async (brand: string): Promise<ApiResponse<Car[]>> => {
    return apiCall<ApiResponse<Car[]>>(`/cars/brand/${brand}`);
  },
  
  getStats: async (): Promise<ApiResponse<CarStats>> => {
    return apiCall<ApiResponse<CarStats>>('/cars/stats');
  },
};

// Utility functions
export const setAuthToken = (token: string | null): void => {
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Error handling utility
export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: (error as any).statusCode,
    };
  }
  
  return {
    message: 'An unexpected error occurred',
  };
}; 