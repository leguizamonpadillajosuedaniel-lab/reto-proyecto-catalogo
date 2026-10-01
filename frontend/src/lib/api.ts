import type { ApiError, MotoResponse } from '../types/api';
import type { Moto, MotoInput } from '../types/moto';

const baseUrl = import.meta.env.PUBLIC_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
  });
  const body = (await response.json().catch(() => ({}))) as T & ApiError;
  if (!response.ok) throw new Error(body.error?.mensaje || 'No fue posible completar la solicitud');
  return body as T;
}

export const api = {
  login: (usuario: string, contrasena: string) => request<{ mensaje: string; usuario: string }>('/api/auth/login', { method: 'POST', body: JSON.stringify({ usuario, contrasena }) }),
  logout: () => request<{ mensaje: string }>('/api/auth/logout', { method: 'POST' }),
  listMotos: (query = '') => request<MotoResponse<Moto[]>>(`/api/motos${query ? `?${query}` : ''}`),
  createMoto: (moto: MotoInput) => request<MotoResponse<Moto>>('/api/motos', { method: 'POST', body: JSON.stringify(moto) }),
  updateMoto: (id: number, moto: Partial<MotoInput>) => request<MotoResponse<Moto>>(`/api/motos/${id}`, { method: 'PUT', body: JSON.stringify(moto) }),
};
