import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { loginSchema } from '../schemas/auth.schema.js';
import { loginController, logoutController } from '../controllers/auth.controller.js';
import { validationDetails } from '../middlewares/validation.middleware.js';

export const authRoutes = new Hono();
authRoutes.post('/login', zValidator('json', loginSchema, (result, c) => result.success ? undefined : c.json({ error: { codigo: 'VALIDATION_ERROR', mensaje: 'Los datos enviados no son válidos', detalles: validationDetails(result.error) } }, 400)), loginController);
authRoutes.post('/logout', logoutController);
