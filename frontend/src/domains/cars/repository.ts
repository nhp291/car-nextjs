import { Car, CarFilters, CarCategory } from './types';

export interface ICarRepository {
  findAll(filters?: CarFilters): Promise<Car[]>;
  findById(id: string): Promise<Car | null>;
  findByCategory(category: CarCategory): Promise<Car[]>;
  findByBrand(brand: string): Promise<Car[]>;
  findFeatured(): Promise<Car[]>;
  findNew(): Promise<Car[]>;
  search(query: string): Promise<Car[]>;
  create(car: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>): Promise<Car>;
  update(id: string, car: Partial<Car>): Promise<Car>;
  delete(id: string): Promise<void>;
}

export class CarRepository implements ICarRepository {
  private cars: Car[] = [];

  constructor() {
    // Initialize with mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    this.cars = [
      {
        id: '1',
        name: 'Mercedes-AMG C-Class',
        brand: 'Mercedes-Benz',
        model: 'C-Class',
        year: 2024,
        price: 85000,
        category: CarCategory.SEDAN,
        fuelType: 'Gasoline' as any,
        transmission: 'Automatic' as any,
        engineSize: 2.0,
        power: 402,
        torque: 500,
        acceleration: 3.9,
        topSpeed: 250,
        fuelConsumption: 8.5,
        emissions: 195,
        images: ['/images/mercedes-amg-c-class.jpg'],
        description: 'Luxury performance sedan with AMG engineering',
        features: ['AMG Performance', 'Luxury Interior', 'Advanced Safety'],
        isNew: true,
        isFeatured: true,
        rating: 4.8,
        reviewCount: 127,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      // Add more mock cars here
    ];
  }

  async findAll(filters?: CarFilters): Promise<Car[]> {
    let filteredCars = [...this.cars];

    if (filters?.category) {
      filteredCars = filteredCars.filter(car => car.category === filters.category);
    }

    if (filters?.brand) {
      filteredCars = filteredCars.filter(car => 
        car.brand.toLowerCase().includes(filters.brand!.toLowerCase())
      );
    }

    if (filters?.priceRange) {
      const [min, max] = filters.priceRange;
      filteredCars = filteredCars.filter(car => car.price >= min && car.price <= max);
    }

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredCars = filteredCars.filter(car =>
        car.name.toLowerCase().includes(searchTerm) ||
        car.brand.toLowerCase().includes(searchTerm) ||
        car.model.toLowerCase().includes(searchTerm)
      );
    }

    return filteredCars;
  }

  async findById(id: string): Promise<Car | null> {
    return this.cars.find(car => car.id === id) || null;
  }

  async findByCategory(category: CarCategory): Promise<Car[]> {
    return this.cars.filter(car => car.category === category);
  }

  async findByBrand(brand: string): Promise<Car[]> {
    return this.cars.filter(car => 
      car.brand.toLowerCase().includes(brand.toLowerCase())
    );
  }

  async findFeatured(): Promise<Car[]> {
    return this.cars.filter(car => car.isFeatured);
  }

  async findNew(): Promise<Car[]> {
    return this.cars.filter(car => car.isNew);
  }

  async search(query: string): Promise<Car[]> {
    const searchTerm = query.toLowerCase();
    return this.cars.filter(car =>
      car.name.toLowerCase().includes(searchTerm) ||
      car.brand.toLowerCase().includes(searchTerm) ||
      car.model.toLowerCase().includes(searchTerm) ||
      car.description.toLowerCase().includes(searchTerm)
    );
  }

  async create(carData: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>): Promise<Car> {
    const newCar: Car = {
      ...carData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.cars.push(newCar);
    return newCar;
  }

  async update(id: string, carData: Partial<Car>): Promise<Car> {
    const index = this.cars.findIndex(car => car.id === id);
    if (index === -1) {
      throw new Error('Car not found');
    }

    this.cars[index] = {
      ...this.cars[index],
      ...carData,
      updatedAt: new Date()
    };

    return this.cars[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.cars.findIndex(car => car.id === id);
    if (index === -1) {
      throw new Error('Car not found');
    }

    this.cars.splice(index, 1);
  }
}



