'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Button } from '@/components/button';
import { useApi } from '@/lib/hooks/useApi';
import { API_ENDPOINTS } from '@/lib/constants';
import { Check, X, Star, Car, Fuel, Users, Settings } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  description: string;
  specifications: {
    engine: string;
    power: string;
    transmission: 'manual' | 'automatic';
    fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
    bodyType: 'sedan' | 'suv' | 'hatchback' | 'coupe' | 'convertible' | 'wagon';
    seats: number;
    fuelConsumption: string;
  };
  features: string[];
  images: string[];
  rating: number;
}

interface CarComparisonProps {
  carIds: string[];
  onClose?: () => void;
}

export function CarComparison({ carIds, onClose }: CarComparisonProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const { execute, loading, error } = useApi<Car>();

  useEffect(() => {
    const fetchCars = async () => {
      const fetchedCars: Car[] = [];
      
      for (const carId of carIds) {
        const car = await execute(API_ENDPOINTS.cars.detail(carId));
        if (car) {
          fetchedCars.push(car);
        }
      }
      
      setCars(fetchedCars);
    };

    if (carIds.length > 0) {
      fetchCars();
    }
  }, [carIds, execute]);

  const getSpecificationValue = (car: Car, spec: keyof Car['specifications']) => {
    return car.specifications[spec];
  };

  const renderComparisonRow = (
    label: string,
    getValue: (car: Car) => any,
    renderValue?: (value: any) => React.ReactNode
  ) => {
    return (
      <tr className="border-b">
        <td className="p-3 font-medium bg-gray-50">{label}</td>
        {cars.map((car) => (
          <td key={car.id} className="p-3 text-center">
            {renderValue ? renderValue(getValue(car)) : getValue(car)}
          </td>
        ))}
      </tr>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p className="text-red-600">Lỗi khi tải dữ liệu so sánh: {error}</p>
        </CardContent>
      </Card>
    );
  }

  if (cars.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">Không có xe nào để so sánh</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">So sánh xe</h2>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left border border-gray-200">Thông số</th>
              {cars.map((car) => (
                <th key={car.id} className="p-3 text-center border border-gray-200">
                  <div className="space-y-2">
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className="w-24 h-16 object-cover rounded mx-auto"
                    />
                    <div>
                      <h3 className="font-semibold">{car.name}</h3>
                      <p className="text-sm text-gray-600">{car.brand} {car.model}</p>
                      <p className="text-sm text-gray-500">{car.year}</p>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Giá */}
            {renderComparisonRow(
              'Giá',
              (car) => car.price,
              (price) => formatCurrency(price)
            )}

            {/* Đánh giá */}
            {renderComparisonRow(
              'Đánh giá',
              (car) => car.rating,
              (rating) => (
                <div className="flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1">{rating}/5</span>
                </div>
              )
            )}

            {/* Động cơ */}
            {renderComparisonRow(
              'Động cơ',
              (car) => getSpecificationValue(car, 'engine')
            )}

            {/* Công suất */}
            {renderComparisonRow(
              'Công suất',
              (car) => getSpecificationValue(car, 'power')
            )}

            {/* Hộp số */}
            {renderComparisonRow(
              'Hộp số',
              (car) => getSpecificationValue(car, 'transmission'),
              (transmission) => (
                <span className="capitalize">{transmission}</span>
              )
            )}

            {/* Nhiên liệu */}
            {renderComparisonRow(
              'Nhiên liệu',
              (car) => getSpecificationValue(car, 'fuelType'),
              (fuelType) => (
                <div className="flex items-center justify-center">
                  <Fuel className="w-4 h-4 mr-1" />
                  <span className="capitalize">{fuelType}</span>
                </div>
              )
            )}

            {/* Kiểu thân xe */}
            {renderComparisonRow(
              'Kiểu thân xe',
              (car) => getSpecificationValue(car, 'bodyType'),
              (bodyType) => (
                <span className="capitalize">{bodyType}</span>
              )
            )}

            {/* Số chỗ ngồi */}
            {renderComparisonRow(
              'Số chỗ ngồi',
              (car) => getSpecificationValue(car, 'seats'),
              (seats) => (
                <div className="flex items-center justify-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{seats}</span>
                </div>
              )
            )}

            {/* Tiêu thụ nhiên liệu */}
            {renderComparisonRow(
              'Tiêu thụ nhiên liệu',
              (car) => getSpecificationValue(car, 'fuelConsumption')
            )}

            {/* Tính năng */}
            {renderComparisonRow(
              'Tính năng',
              (car) => car.features,
              (features) => (
                <div className="space-y-1">
                  {features.slice(0, 3).map((feature: string, index: number) => (
                    <div key={index} className="flex items-center text-sm">
                      <Check className="w-3 h-3 text-green-500 mr-1" />
                      {feature}
                    </div>
                  ))}
                  {features.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{features.length - 3} tính năng khác
                    </div>
                  )}
                </div>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center space-x-4">
        <Button variant="outline" onClick={() => window.print()}>
          In bảng so sánh
        </Button>
        <Button onClick={() => {
          // Share functionality
          if (navigator.share) {
            navigator.share({
              title: 'So sánh xe',
              text: 'Xem bảng so sánh chi tiết các xe',
              url: window.location.href,
            });
          }
        }}>
          Chia sẻ
        </Button>
      </div>
    </div>
  );
} 