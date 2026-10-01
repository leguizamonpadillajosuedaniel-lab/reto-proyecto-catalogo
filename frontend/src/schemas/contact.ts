import { z } from 'zod';

export const contactSchema = z.object({
  nombre: z.string().trim().min(2, 'Ingresa tu nombre'),
  telefono: z.string().trim().regex(/^\d{8}$/, 'Ingresa un teléfono de 8 dígitos'),
  modelo: z.string().optional(),
  mensaje: z.string().trim().max(500, 'Máximo 500 caracteres').optional(),
});
