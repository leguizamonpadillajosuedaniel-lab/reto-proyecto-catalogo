import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { authRoutes } from './routes/auth.routes.js';
import { motoRoutes } from './routes/motos.routes.js';
import { healthRoutes } from './routes/health.routes.js';
import { errorMiddleware, notFoundMiddleware } from './middlewares/error.middleware.js';
import { env } from './config/env.js';

export const app = new Hono();
const allowedOrigins = new Set([
  env.FRONTEND_URL,
  ...(env.CORS_ORIGINS ?? '').split(',').map((origin) => origin.trim()).filter(Boolean),
]);

app.use('*', cors({
  origin: (origin) => origin && allowedOrigins.has(origin) ? origin : undefined,
  credentials: true,
}));
app.get('/', (c) => c.json({ mensaje: 'API de catálogo de motos funcionando' }));
app.route('/api/auth', authRoutes);
app.route('/api/motos', motoRoutes);
app.route('/api/health', healthRoutes);
app.notFound(notFoundMiddleware);
app.onError(errorMiddleware);

export default app;
