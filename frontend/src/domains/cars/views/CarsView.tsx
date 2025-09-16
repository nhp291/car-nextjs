import React from 'react';
import { useCars } from '../hooks/useCars';

export function CarsView() {
  const { cars, loading, error } = useCars();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Car List</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>{car.name} - {car.brand} - {car.year}</li>
        ))}
      </ul>
    </div>
  );
}
