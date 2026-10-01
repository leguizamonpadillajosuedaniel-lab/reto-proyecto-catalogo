import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { findByUsuario } from '../repositories/administrador.repository.js';
import type { AuthUser } from '../types/auth.types.js';

export async function login(usuario: string, contrasena: string): Promise<{ user: AuthUser; token: string } | undefined> {
  const administrator = await findByUsuario(usuario);
  if (!administrator || !(await bcrypt.compare(contrasena, administrator.Contrasena))) return undefined;
  const user: AuthUser = { identificador: administrator.Identificador, usuario: administrator.Usuario };
  const token = jwt.sign({ sub: String(user.identificador), usuario: user.usuario }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
  return { user, token };
}

export function verifyToken(token: string): AuthUser {
  const payload = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload & { usuario?: string };
  if (!payload.sub || !payload.usuario) throw new Error('Token inválido');
  return { identificador: Number(payload.sub), usuario: payload.usuario };
}
