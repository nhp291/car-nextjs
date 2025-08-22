export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: CarCategory;
  fuelType: FuelType;
  transmission: Transmission;
  engineSize: number;
  power: number;
  torque: number;
  acceleration: number;
  topSpeed: number;
  fuelConsumption: number;
  emissions: number;
  images: string[];
  description: string;
  features: string[];
  isNew: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum CarCategory {
  SEDAN = 'Sedan',
  SUV = 'SUV',
  HATCHBACK = 'Hatchback',
  COUPE = 'Coupe',
  CONVERTIBLE = 'Convertible',
  WAGON = 'Wagon',
  PICKUP = 'Pickup',
  VAN = 'Van',
  SUPERCAR = 'Supercar',
  HYBRID = 'Hybrid',
  ELECTRIC = 'Electric'
}

export enum FuelType {
  GASOLINE = 'Gasoline',
  DIESEL = 'Diesel',
  HYBRID = 'Hybrid',
  ELECTRIC = 'Electric',
  PLUGIN_HYBRID = 'Plugin Hybrid'
}

export enum Transmission {
  MANUAL = 'Manual',
  AUTOMATIC = 'Automatic',
  CVT = 'CVT',
  DUAL_CLUTCH = 'Dual Clutch'
}

export interface CarFilters {
  category?: CarCategory;
  brand?: string;
  priceRange?: [number, number];
  fuelType?: FuelType;
  transmission?: Transmission;
  yearRange?: [number, number];
  search?: string;
}

export interface CarComparison {
  id: string;
  cars: Car[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CarReview {
  id: string;
  carId: string;
  userId: string;
  rating: number;
  comment: string;
  pros: string[];
  cons: string[];
  createdAt: Date;
  updatedAt: Date;
}



