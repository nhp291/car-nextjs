import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Car, CarFilters, CarCategory } from '../../domains/cars/types';

interface CarState {
  // State
  cars: Car[];
  featuredCars: Car[];
  newCars: Car[];
  selectedCar: Car | null;
  filters: CarFilters;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  favorites: string[];
  
  // Actions
  setCars: (cars: Car[]) => void;
  setFeaturedCars: (cars: Car[]) => void;
  setNewCars: (cars: Car[]) => void;
  setSelectedCar: (car: Car | null) => void;
  setFilters: (filters: CarFilters) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addToFavorites: (carId: string) => void;
  removeFromFavorites: (carId: string) => void;
  clearFilters: () => void;
  resetState: () => void;
  
  // Computed
  getFilteredCars: () => Car[];
  getCarsByCategory: (category: CarCategory) => Car[];
  getCarsByBrand: (brand: string) => Car[];
  isFavorite: (carId: string) => boolean;
  getFavoriteCars: () => Car[];
}

const initialState = {
  cars: [],
  featuredCars: [],
  newCars: [],
  selectedCar: null,
  filters: {},
  searchQuery: '',
  isLoading: false,
  error: null,
  favorites: [],
};

export const useCarStore = create<CarState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Actions
        setCars: (cars) => set({ cars }),
        setFeaturedCars: (cars) => set({ featuredCars: cars }),
        setNewCars: (cars) => set({ newCars: cars }),
        setSelectedCar: (car) => set({ selectedCar: car }),
        setFilters: (filters) => set({ filters }),
        setSearchQuery: (query) => set({ searchQuery: query }),
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),
        
        addToFavorites: (carId) => set((state) => ({
          favorites: state.favorites.includes(carId) 
            ? state.favorites 
            : [...state.favorites, carId]
        })),
        
        removeFromFavorites: (carId) => set((state) => ({
          favorites: state.favorites.filter(id => id !== carId)
        })),
        
        clearFilters: () => set({ filters: {}, searchQuery: '' }),
        
        resetState: () => set(initialState),

        // Computed
        getFilteredCars: () => {
          const { cars, filters, searchQuery } = get();
          let filtered = [...cars];

          // Apply category filter
          if (filters.category) {
            filtered = filtered.filter(car => car.category === filters.category);
          }

          // Apply brand filter
          if (filters.brand) {
            filtered = filtered.filter(car => 
              car.brand.toLowerCase().includes(filters.brand!.toLowerCase())
            );
          }

          // Apply price range filter
          if (filters.priceRange) {
            const [min, max] = filters.priceRange;
            filtered = filtered.filter(car => car.price >= min && car.price <= max);
          }

          // Apply search query
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(car =>
              car.name.toLowerCase().includes(query) ||
              car.brand.toLowerCase().includes(query) ||
              car.model.toLowerCase().includes(query) ||
              car.description.toLowerCase().includes(query)
            );
          }

          return filtered;
        },

        getCarsByCategory: (category) => {
          const { cars } = get();
          return cars.filter(car => car.category === category);
        },

        getCarsByBrand: (brand) => {
          const { cars } = get();
          return cars.filter(car => 
            car.brand.toLowerCase().includes(brand.toLowerCase())
          );
        },

        isFavorite: (carId) => {
          const { favorites } = get();
          return favorites.includes(carId);
        },

        getFavoriteCars: () => {
          const { cars, favorites } = get();
          return cars.filter(car => favorites.includes(car.id));
        },
      }),
      {
        name: 'car-store',
        partialize: (state) => ({ 
          favorites: state.favorites,
          filters: state.filters 
        }),
      }
    ),
    {
      name: 'car-store',
    }
  )
);



