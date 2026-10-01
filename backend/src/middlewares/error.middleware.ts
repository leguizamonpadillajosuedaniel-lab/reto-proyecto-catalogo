import type { ErrorHandler, NotFoundHandler } from 'hono';

export const errorMiddleware: ErrorHandler = (error, c) => {
  console.error(error);
  const databaseError = error as NodeJS.ErrnoException & { code?: string };
  if (['ENOTFOUND', 'EAI_AGAIN', 'ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT', 'ENETUNREACH', 'EHOSTUNREACH'].includes(databaseError.code || '')) {
    return c.json({ error: { codigo: 'DATABASE_UNAVAILABLE', mensaje: 'La base de datos no está disponible. Verifica DATABASE_URL.' } }, 503);
  }
  return c.json({ error: { codigo: 'INTERNAL_ERROR', mensaje: 'Ocurrió un error interno' } }, 500);
};

export const notFoundMiddleware: NotFoundHandler = (c) => c.json({ error: { codigo: 'NOT_FOUND', mensaje: 'Ruta no encontrada' } }, 404);
