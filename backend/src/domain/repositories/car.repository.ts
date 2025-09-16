import { Car } from '../models/car';

export interface ICarRepository {
  findById(id: string): Promise<Car | null>;
  findAll(): Promise<Car[]>;
  create(data: Partial<Car>): Promise<Car>;
  update(id: string, data: Partial<Car>): Promise<Car>;
  delete(id: string): Promise<void>;
  findBySlug(slug: string): Promise<Car | null>;
  findPopular(): Promise<Car[]>;

}