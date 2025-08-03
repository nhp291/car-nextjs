export const createCarSchema = {
  parse: (data: any) => {
    const { body } = data;
    if (!body.name || !body.brand || !body.model) {
      throw new Error('Name, brand, and model are required');
    }
    if (!body.price || body.price <= 0) {
      throw new Error('Valid price is required');
    }
    return data;
  }
};

export const updateCarSchema = {
  parse: (data: any) => {
    const { params } = data;
    if (!params.id) {
      throw new Error('Car ID is required');
    }
    return data;
  }
};

export const getCarSchema = {
  parse: (data: any) => {
    const { params } = data;
    if (!params.id) {
      throw new Error('Car ID is required');
    }
    return data;
  }
};

export const getCarsSchema = {
  parse: (data: any) => {
    // Allow any query parameters for now
    return data;
  }
};

export const getCarBySlugSchema = {
  parse: (data: any) => {
    const { params } = data;
    if (!params.slug) {
      throw new Error('Car slug is required');
    }
    return data;
  }
};

// TODO: Replace with actual Zod schemas once dependencies are installed
/*
import { z } from 'zod';

export const createCarSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Car name is required'),
    brand: z.string().min(1, 'Brand is required'),
    model: z.string().min(1, 'Model is required'),
    year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
    price: z.number().positive('Price must be positive'),
    // ... other fields
  }),
});

// ... other schemas
*/