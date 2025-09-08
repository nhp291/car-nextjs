import { ICarRepository } from "@/domain/repositories/car.repository";
import { CreateCarDto } from "../dtos/car.dto";

export class CarService {
  constructor(private carRepo: ICarRepository) {}

  async listCars() {
    return this.carRepo.findAll();
  }

  async getCar(id: number) {
    return this.carRepo.findById(id);
  }

  async createCar(data: CreateCarDto) {
    return this.carRepo.create({
      id: 0,
      ...data,
      isAvailable: data.isAvailable ?? true,
    });
  }

  async updateCar(id: number, data: Partial<CreateCarDto>) {
    return this.carRepo.update(id, data);
  }

  async deleteCar(id: number) {
    return this.carRepo.delete(id);
  }
}
