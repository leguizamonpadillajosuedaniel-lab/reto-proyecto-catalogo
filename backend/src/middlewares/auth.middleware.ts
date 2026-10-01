import type { Context, Next } from 'hono';
import { getCookie } from 'hono/cookie';
import { env } from '../config/env.js';
import { verifyToken } from '../services/auth.service.js';

export async function authMiddleware(c: Context, next: Next) {
  const token = getCookie(c, env.COOKIE_NAME);
  if (!token) return c.json({ error: { codigo: 'UNAUTHORIZED', mensaje: 'Se requiere autenticación' } }, 401);
  try {
    c.set('user', verifyToken(token));
    await next();
  } catch {
    return c.json({ error: { codigo: 'UNAUTHORIZED', mensaje: 'La sesión no es válida o ha expirado' } }, 401);
  }
}
