import { z } from 'zod';
import { categorias } from '../types/moto';

export const motoSchema = z.object({
  modelo: z.string().min(1, 'El modelo es obligatorio').max(100), marca: z.literal('Power Motorcycle'), categoria: z.enum(categorias),
  cilindrada: z.coerce.number().int().nonnegative('Debe ser un valor positivo'), precio: z.coerce.number().nonnegative('Debe ser un valor positivo'),
  imagenLink: z.string().url('Ingresa una URL válida').max(500), stock: z.coerce.number().int().nonnegative('No puede ser negativo'), descripcion: z.string().min(1, 'La descripción es obligatoria').max(1000),
});
