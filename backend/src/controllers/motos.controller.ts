import type { Context } from 'hono';
import * as service from '../services/motos.service.js';

export async function listMotosController(c: Context) {
  const filters = c.req.valid('query' as never) as Record<string, unknown>;
  const data = await service.listMotos(filters);
  return c.json({ data, total: data.length, filtros: filters });
}

export async function createMotoController(c: Context) {
  const moto = c.req.valid('json' as never);
  const data = await service.createMoto(moto);
  return c.json({ data }, 201);
}

export async function updateMotoController(c: Context) {
  const id = Number(c.req.param('identificador'));
  const data = await service.updateMoto(id, c.req.valid('json' as never));
  if (!data) return c.json({ error: { codigo: 'NOT_FOUND', mensaje: 'La moto no existe' } }, 404);
  return c.json({ data });
}
