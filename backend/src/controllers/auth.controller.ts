import { deleteCookie, setCookie } from 'hono/cookie';
import type { Context } from 'hono';
import { env } from '../config/env.js';
import { login } from '../services/auth.service.js';
import type { z } from 'zod';
import type { loginSchema } from '../schemas/auth.schema.js';

export async function loginController(c: Context) {
  const { usuario, contrasena } = c.req.valid('json' as never) as z.infer<typeof loginSchema>;
  const result = await login(usuario, contrasena);
  if (!result) return c.json({ error: { codigo: 'INVALID_CREDENTIALS', mensaje: 'Credenciales incorrectas' } }, 401);
  setCookie(c, env.COOKIE_NAME, result.token, { httpOnly: true, secure: env.NODE_ENV === 'production', sameSite: env.NODE_ENV === 'production' ? 'None' : 'Lax', maxAge: 3600, path: '/' });
  return c.json({ mensaje: 'Inicio de sesión exitoso', usuario: result.user.usuario });
}

export function logoutController(c: Context) {
  deleteCookie(c, env.COOKIE_NAME, { path: '/' });
  return c.json({ mensaje: 'Sesión cerrada correctamente' });
}
