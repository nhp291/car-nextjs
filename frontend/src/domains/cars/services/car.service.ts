import { Car } from '../types/car.types';

export async function fetchCars(): Promise<Car[]> {
  const res = await fetch('/api/cars');
  if (!res.ok) throw new Error('Failed to fetch cars');
  return res.json();
}
