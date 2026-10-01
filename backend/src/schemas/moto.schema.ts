import { z } from 'zod';
import { categorias } from '../types/moto.types.js';

const motoFields = {
  modelo: z.string().min(1).max(100),
  marca: z.literal('Power Motorcycle'),
  categoria: z.enum(categorias),
  cilindrada: z.number().int().nonnegative(),
  precio: z.number().nonnegative(),
  imagenLink: z.string().url().max(500),
  stock: z.number().int().nonnegative().default(0),
  descripcion: z.string().min(1).max(1000),
};

export const createMotoSchema = z.object(motoFields);
export const updateMotoSchema = z.object(motoFields).partial().refine((data) => Object.keys(data).length > 0, 'Debe enviar al menos un campo');
export const motoFiltersSchema = z.object({
  modelo: z.string().optional(),
  marca: z.literal('Power Motorcycle').optional(),
  categoria: z.enum(categorias).optional(),
  cilindrada: z.coerce.number().int().nonnegative().optional(),
  precioMin: z.coerce.number().nonnegative().optional(),
  precioMax: z.coerce.number().nonnegative().optional(),
  stockDisponible: z.enum(['true', 'false']).transform((v) => v === 'true').optional(),
});
