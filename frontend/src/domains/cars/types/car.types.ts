// Type cho car domain
export interface Car {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  fuelType?: string;
  transmission?: string;
  driveType?: string;
  engineSize?: number;
  power?: number;
  color?: string;
  description?: string;
  images?: string[];
  features?: string[];
  isNew?: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
}
