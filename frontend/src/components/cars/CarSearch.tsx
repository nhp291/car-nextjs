'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { useApi } from '@/lib/hooks/useApi';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Search, Filter, X, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { CarSearchFormData } from '@/lib/validations';
import { formatCurrency } from '@/lib/utils';

interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  specifications: {
    fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
    transmission: 'manual' | 'automatic';
    bodyType: 'sedan' | 'suv' | 'hatchback' | 'coupe' | 'convertible' | 'wagon';
  };
  images: string[];
}

interface CarSearchProps {
  onCarSelect?: (car: Car) => void;
  onCompareCars?: (cars: Car[]) => void;
}

export function CarSearch({ onCarSelect, onCompareCars }: CarSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [filters, setFilters] = useState({
    brand: '',
    priceMin: '',
    priceMax: '',
    fuelType: '',
    transmission: '',
    bodyType: '',
    year: '',
  });

  const debouncedQuery = useDebounce(searchQuery, 300);
  const { execute, loading, error, data: cars } = useApi<Car[]>();

  useEffect(() => {
    const fetchCars = async () => {
      const queryParams = new URLSearchParams();
      
      if (debouncedQuery) {
        queryParams.append('query', debouncedQuery);
      }
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });

      await execute(`/cars/search?${queryParams.toString()}`);
    };

    fetchCars();
  }, [debouncedQuery, filters, execute]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      priceMin: '',
      priceMax: '',
      fuelType: '',
      transmission: '',
      bodyType: '',
      year: '',
    });
  };

  const toggleCarSelection = (car: Car) => {
    setSelectedCars(prev => {
      const isSelected = prev.some(c => c.id === car.id);
      if (isSelected) {
        return prev.filter(c => c.id !== car.id);
      } else {
        if (prev.length >= 4) {
          return prev;
        }
        return [...prev, car];
      }
    });
  };

  const handleCompare = () => {
    if (selectedCars.length >= 2) {
      onCompareCars?.(selectedCars);
    }
  };

  const fuelTypeOptions = [
    { value: 'gasoline', label: 'Xăng' },
    { value: 'diesel', label: 'Dầu' },
    { value: 'electric', label: 'Điện' },
    { value: 'hybrid', label: 'Hybrid' },
  ];

  const transmissionOptions = [
    { value: 'manual', label: 'Số tay' },
    { value: 'automatic', label: 'Số tự động' },
  ];

  const bodyTypeOptions = [
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'hatchback', label: 'Hatchback' },
    { value: 'coupe', label: 'Coupe' },
    { value: 'convertible', label: 'Convertible' },
    { value: 'wagon', label: 'Wagon' },
  ];

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Tìm kiếm xe theo tên, hãng, model..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Bộ lọc
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          
          {Object.values(filters).some(v => v) && (
            <Button variant="ghost" onClick={clearFilters} className="text-red-600">
              <X className="w-4 h-4 mr-1" />
              Xóa bộ lọc
            </Button>
          )}
        </div>

        {showFilters && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bộ lọc tìm kiếm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium mb-1">Hãng xe</label>
                  <Input
                    placeholder="Nhập hãng xe"
                    value={filters.brand}
                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-1">Giá từ</label>
                  <Input
                    type="number"
                    placeholder="Giá tối thiểu"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Giá đến</label>
                  <Input
                    type="number"
                    placeholder="Giá tối đa"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                  />
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-medium mb-1">Loại nhiên liệu</label>
                  <select
                    value={filters.fuelType}
                    onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Tất cả</option>
                    {fuelTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-sm font-medium mb-1">Hộp số</label>
                  <select
                    value={filters.transmission}
                    onChange={(e) => handleFilterChange('transmission', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Tất cả</option>
                    {transmissionOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Body Type */}
                <div>
                  <label className="block text-sm font-medium mb-1">Kiểu thân xe</label>
                  <select
                    value={filters.bodyType}
                    onChange={(e) => handleFilterChange('bodyType', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Tất cả</option>
                    {bodyTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year */}
                <div>
                  <label className="block text-sm font-medium mb-1">Năm sản xuất</label>
                  <Input
                    type="number"
                    placeholder="Năm"
                    value={filters.year}
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                    min="1900"
                    max={new Date().getFullYear() + 1}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Selected Cars for Comparison */}
      {selectedCars.length > 0 && (
        <Card className="bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg">Xe đã chọn để so sánh ({selectedCars.length}/4)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedCars.map((car) => (
                <div
                  key={car.id}
                  className="flex items-center gap-2 bg-white p-2 rounded border"
                >
                  <img
                    src={car.images[0]}
                    alt={car.name}
                    className="w-8 h-8 object-cover rounded"
                  />
                  <span className="text-sm font-medium">{car.name}</span>
                  <button
                    onClick={() => toggleCarSelection(car)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {selectedCars.length >= 2 && (
                <Button onClick={handleCompare} className="ml-2">
                  So sánh xe
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && (
        <Card>
          <CardContent className="p-6">
            <p className="text-red-600">Lỗi khi tải dữ liệu: {error}</p>
          </CardContent>
        </Card>
      )}

      {cars && cars.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <Card
              key={car.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedCars.some(c => c.id === car.id) ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => onCarSelect?.(car)}
            >
              <div className="relative">
                <img
                  src={car.images[0]}
                  alt={car.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCarSelection(car);
                  }}
                  className={`absolute top-2 right-2 p-1 rounded-full ${
                    selectedCars.some(c => c.id === car.id)
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-600'
                  }`}
                >
                  {selectedCars.some(c => c.id === car.id) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{car.name}</h3>
                <p className="text-gray-600 mb-2">{car.brand} {car.model} ({car.year})</p>
                <p className="text-lg font-bold text-blue-600 mb-2">
                  {formatCurrency(car.price)}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="capitalize">{car.specifications.fuelType}</span>
                  <span className="capitalize">{car.specifications.transmission}</span>
                  <span className="capitalize">{car.specifications.bodyType}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {cars && cars.length === 0 && !loading && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">Không tìm thấy xe nào phù hợp với tiêu chí tìm kiếm</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 