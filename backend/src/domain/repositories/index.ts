import { Car, Prisma } from '@prisma/client';
import { FilterCarsDtoType } from '../../application/dtos/car.dto';

export interface ICarRepository {
  findAll(filters?: FilterCarsDtoType): Promise<Car[]>;
  findById(id: string): Promise<Car | null>;
  create(data: Prisma.CarCreateInput): Promise<Car>;
  update(id: string, data: Prisma.CarUpdateInput): Promise<Car>;
  delete(id: string): Promise<void>;
  findByBrand(brand: string): Promise<Car[]>;
  findByPriceRange(min: number, max: number): Promise<Car[]>;
  count(filters?: FilterCarsDtoType): Promise<number>;
}

export interface IUserRepository {
  findById(id: string): Promise<any | null>;
  findByEmail(email: string): Promise<any | null>;
  create(data: any): Promise<any>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<void>;
}

export interface IAuthRepository {
  createSession(userId: string, token: string): Promise<any>;
  findSession(token: string): Promise<any | null>;
  deleteSession(token: string): Promise<void>;
}
