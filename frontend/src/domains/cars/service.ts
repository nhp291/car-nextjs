import { Car, CarFilters, CarCategory, CarReview } from './types';
import { ICarRepository } from './repository';

export interface ICarService {
  getCars(filters?: CarFilters): Promise<Car[]>;
  getCarById(id: string): Promise<Car | null>;
  getFeaturedCars(): Promise<Car[]>;
  getNewCars(): Promise<Car[]>;
  searchCars(query: string): Promise<Car[]>;
  getCarsByCategory(category: CarCategory): Promise<Car[]>;
  getCarsByBrand(brand: string): Promise<Car[]>;
  createCar(carData: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>): Promise<Car>;
  updateCar(id: string, carData: Partial<Car>): Promise<Car>;
  deleteCar(id: string): Promise<void>;
  addCarReview(carId: string, review: Omit<CarReview, 'id' | 'carId' | 'createdAt' | 'updatedAt'>): Promise<CarReview>;
  getCarReviews(carId: string): Promise<CarReview[]>;
  getCarAverageRating(carId: string): Promise<number>;
}

export class CarService implements ICarService {
  constructor(private carRepository: ICarRepository) {}

  async getCars(filters?: CarFilters): Promise<Car[]> {
    try {
      return await this.carRepository.findAll(filters);
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw new Error('Failed to fetch cars');
    }
  }

  async getCarById(id: string): Promise<Car | null> {
    try {
      return await this.carRepository.findById(id);
    } catch (error) {
      console.error('Error fetching car by id:', error);
      throw new Error('Failed to fetch car');
    }
  }

  async getFeaturedCars(): Promise<Car[]> {
    try {
      return await this.carRepository.findFeatured();
    } catch (error) {
      console.error('Error fetching featured cars:', error);
      throw new Error('Failed to fetch featured cars');
    }
  }

  async getNewCars(): Promise<Car[]> {
    try {
      return await this.carRepository.findNew();
    } catch (error) {
      console.error('Error fetching new cars:', error);
      throw new Error('Failed to fetch new cars');
    }
  }

  async searchCars(query: string): Promise<Car[]> {
    try {
      if (!query.trim()) {
        return [];
      }
      return await this.carRepository.search(query);
    } catch (error) {
      console.error('Error searching cars:', error);
      throw new Error('Failed to search cars');
    }
  }

  async getCarsByCategory(category: CarCategory): Promise<Car[]> {
    try {
      return await this.carRepository.findByCategory(category);
    } catch (error) {
      console.error('Error fetching cars by category:', error);
      throw new Error('Failed to fetch cars by category');
    }
  }

  async getCarsByBrand(brand: string): Promise<Car[]> {
    try {
      return await this.carRepository.findByBrand(brand);
    } catch (error) {
      console.error('Error fetching cars by brand:', error);
      throw new Error('Failed to fetch cars by brand');
    }
  }

  async createCar(carData: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>): Promise<Car> {
    try {
      // Validate car data
      this.validateCarData(carData);
      
      return await this.carRepository.create(carData);
    } catch (error) {
      console.error('Error creating car:', error);
      throw new Error('Failed to create car');
    }
  }

  async updateCar(id: string, carData: Partial<Car>): Promise<Car> {
    try {
      // Validate car exists
      const existingCar = await this.carRepository.findById(id);
      if (!existingCar) {
        throw new Error('Car not found');
      }

      // Validate update data
      if (carData.price && carData.price < 0) {
        throw new Error('Price cannot be negative');
      }

      return await this.carRepository.update(id, carData);
    } catch (error) {
      console.error('Error updating car:', error);
      throw new Error('Failed to update car');
    }
  }

  async deleteCar(id: string): Promise<void> {
    try {
      await this.carRepository.delete(id);
    } catch (error) {
      console.error('Error deleting car:', error);
      throw new Error('Failed to delete car');
    }
  }

  async addCarReview(carId: string, reviewData: Omit<CarReview, 'id' | 'carId' | 'createdAt' | 'updatedAt'>): Promise<CarReview> {
    try {
      // Validate car exists
      const car = await this.carRepository.findById(carId);
      if (!car) {
        throw new Error('Car not found');
      }

      // Validate review data
      if (reviewData.rating < 1 || reviewData.rating > 5) {
        throw new Error('Rating must be between 1 and 5');
      }

      const review: CarReview = {
        ...reviewData,
        id: Date.now().toString(),
        carId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Update car rating
      await this.updateCarRating(carId);

      return review;
    } catch (error) {
      console.error('Error adding car review:', error);
      throw new Error('Failed to add car review');
    }
  }

  async getCarReviews(carId: string): Promise<CarReview[]> {
    try {
      // This would typically come from a separate review repository
      // For now, return empty array
      return [];
    } catch (error) {
      console.error('Error fetching car reviews:', error);
      throw new Error('Failed to fetch car reviews');
    }
  }

  async getCarAverageRating(carId: string): Promise<number> {
    try {
      const car = await this.carRepository.findById(carId);
      return car?.rating || 0;
    } catch (error) {
      console.error('Error fetching car average rating:', error);
      throw new Error('Failed to fetch car average rating');
    }
  }

  private validateCarData(carData: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>): void {
    if (!carData.name || !carData.brand || !carData.model) {
      throw new Error('Car name, brand, and model are required');
    }

    if (carData.price < 0) {
      throw new Error('Price cannot be negative');
    }

    if (carData.year < 1900 || carData.year > new Date().getFullYear() + 1) {
      throw new Error('Invalid year');
    }

    if (carData.power < 0) {
      throw new Error('Power cannot be negative');
    }

    if (carData.torque < 0) {
      throw new Error('Torque cannot be negative');
    }
  }

  private async updateCarRating(carId: string): Promise<void> {
    try {
      const reviews = await this.getCarReviews(carId);
      if (reviews.length > 0) {
        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        await this.carRepository.update(carId, { 
          rating: Math.round(averageRating * 10) / 10,
          reviewCount: reviews.length
        });
      }
    } catch (error) {
      console.error('Error updating car rating:', error);
    }
  }
}



