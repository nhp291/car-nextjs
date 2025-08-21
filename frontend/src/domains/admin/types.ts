export interface DashboardStats {
  totalUsers: number;
  totalCars: number;
  totalNews: number;
  totalRevenue: number;
  activeUsers: number;
  newUsersThisMonth: number;
  carsAddedThisMonth: number;
  newsPublishedThisMonth: number;
}

export interface UserManagement {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  actions: string[];
}

export interface CarManagement {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  price: number;
  isFeatured: boolean;
  isNew: boolean;
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  actions: string[];
}

export interface NewsManagement {
  id: string;
  title: string;
  category: string;
  author: string;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: Date;
  views: number;
  likes: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  actions: string[];
}

export interface SystemSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  supportPhone: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  maintenanceMode: boolean;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  maxUploadSize: number;
  allowedFileTypes: string[];
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId: string;
  details: any;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

export interface AdminPermissions {
  canManageUsers: boolean;
  canManageCars: boolean;
  canManageNews: boolean;
  canManageSettings: boolean;
  canViewAuditLogs: boolean;
  canManageRoles: boolean;
}



