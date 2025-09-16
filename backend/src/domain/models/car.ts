// Car domain model (entity)
export enum CarCondition {
  NEW = 'NEW',
  USED = 'USED',
  CERTIFIED = 'CERTIFIED',
}
export enum FuelType {
  PETROL = 'PETROL',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
  PLUG_IN_HYBRID = 'PLUG_IN_HYBRID',
  LPG = 'LPG',
  CNG = 'CNG',
}
export enum Transmission {
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC',
  CVT = 'CVT',
  SEMI_AUTOMATIC = 'SEMI_AUTOMATIC',
}
export enum DriveType {
  FWD = 'FWD',
  RWD = 'RWD',
  AWD = 'AWD',
  FOUR_WHEEL_DRIVE = 'FOUR_WHEEL_DRIVE',
}

export interface Car {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  mileage: number;
  condition: CarCondition;
  fuelType: FuelType;
  transmission: Transmission;
  driveType: DriveType;
  engineSize: number;
  power: number;
  torque: number;
  acceleration?: number;
  topSpeed?: number;
  fuelConsumption?: number;
  color: string;
  description?: string;
  shortDescription?: string;
  length?: number;
  width?: number;
  height?: number;
  wheelbase?: number;
  weight?: number;
  seatingCapacity: number;
  images: string[];
  videos: string[];
  virtualTourUrl?: string;
  features: string[];
  safetyFeatures: string[];
  colors: string[];
  isAvailable: boolean;
  isNew: boolean;
  isPopular: boolean;
  isFeatured: boolean;
  stock: number;
  dealerId?: string;
  warranty?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords: string[];
  rating?: number;
  reviewCount: number;
  viewCount: number;
  favoriteCount: number;
  aiScore?: number;
  marketTrend?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}