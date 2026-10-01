import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { createMotoSchema, motoFiltersSchema, updateMotoSchema } from '../schemas/moto.schema.js';
import { validationDetails } from '../middlewares/validation.middleware.js';
import { createMotoController, listMotosController, updateMotoController } from '../controllers/motos.controller.js';

export const motoRoutes = new Hono();
const validate = (target: 'json' | 'query', schema: Parameters<typeof zValidator>[1]) => zValidator(target, schema as never, (result, c) => result.success ? undefined : c.json({ error: { codigo: 'VALIDATION_ERROR', mensaje: 'Los datos enviados no son válidos', detalles: validationDetails(result.error) } }, 400));
motoRoutes.get('/', validate('query', motoFiltersSchema), listMotosController);
motoRoutes.post('/', authMiddleware, validate('json', createMotoSchema), createMotoController);
motoRoutes.put('/:identificador', authMiddleware, validate('json', updateMotoSchema), updateMotoController);
