import { z } from 'zod';

export const CarValidator = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  price: z.number().positive(),
});

export type CarInput = z.infer<typeof CarValidator>;
