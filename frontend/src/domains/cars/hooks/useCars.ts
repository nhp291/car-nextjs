import { useState, useEffect } from 'react';
import { fetchCars } from '../services/car.service';
import { Car } from '../types/car.types';

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCars()
      .then(setCars)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { cars, loading, error };
}
