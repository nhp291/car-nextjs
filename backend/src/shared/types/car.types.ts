// Car input types for create/update, matching Prisma Car model
import { Decimal } from '@prisma/client/runtime/library';

export interface CreateCarInput {
  slug: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: Decimal | number | string;
  originalPrice?: Decimal | number | string;
  mileage?: number;
  condition?: string;
  fuelType: string;
  transmission: string;
  driveType: string;
  engineSize: Decimal | number | string;
  power: number;
  torque: number;
  acceleration?: Decimal | number | string;
  topSpeed?: number;
  fuelConsumption?: Decimal | number | string;
  color: string;
  description?: string;
  shortDescription?: string;
  length?: number;
  width?: number;
  height?: number;
  wheelbase?: number;
  weight?: number;
  seatingCapacity?: number;
  images?: string[];
  videos?: string[];
  virtualTourUrl?: string;
  features?: string[];
  safetyFeatures?: string[];
  colors?: string[];
  isAvailable?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
  stock?: number;
  location?: string;
  dealerId?: string;
  warranty?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface UpdateCarInput extends Partial<CreateCarInput> {}
