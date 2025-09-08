import { Car } from "../models/car";

export interface ICarRepository {
  findAll(): Promise<Car[]>;
  findById(id: number): Promise<Car | null>;
  create(data: Car): Promise<Car>;
  update(id: number, data: Partial<Car>): Promise<Car | null>;
  delete(id: number): Promise<void>;
}
