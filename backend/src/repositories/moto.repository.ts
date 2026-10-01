import { pool } from '../database/postgres.js';
import type { Moto } from '../types/moto.types.js';

const columns = 'identificador AS identificador, modelo AS modelo, marca AS marca, categoria AS categoria, cilindrada AS cilindrada, precio::float8 AS precio, imagenlink AS "imagenLink", stock AS stock, descripcion AS descripcion';
const returning = `RETURNING ${columns}`;

export async function createMoto(moto: Omit<Moto, 'identificador'>): Promise<Moto> {
  const result = await pool.query<Moto>(`INSERT INTO moto (modelo, marca, categoria, cilindrada, precio, imagenlink, stock, descripcion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ${returning}`, [moto.modelo, moto.marca, moto.categoria, moto.cilindrada, moto.precio, moto.imagenLink, moto.stock, moto.descripcion]);
  return result.rows[0];
}

export async function findMotos(filters: Record<string, unknown>): Promise<Moto[]> {
  const values: unknown[] = [];
  const where: string[] = [];
  const add = (condition: string, value: unknown) => { values.push(value); where.push(condition.replace('?', `$${values.length}`)); };
  if (filters.modelo) add('modelo ILIKE ?', `%${filters.modelo}%`);
  if (filters.marca) add('marca = ?', filters.marca);
  if (filters.categoria) add('categoria = ?', filters.categoria);
  if (filters.cilindrada !== undefined) add('cilindrada = ?', filters.cilindrada);
  if (filters.precioMin !== undefined) add('precio >= ?', filters.precioMin);
  if (filters.precioMax !== undefined) add('precio <= ?', filters.precioMax);
  if (filters.stockDisponible === true) where.push('stock > 0');
  if (filters.stockDisponible === false) where.push('stock = 0');
  const result = await pool.query<Moto>(`SELECT ${columns} FROM moto${where.length ? ` WHERE ${where.join(' AND ')}` : ''} ORDER BY identificador`, values);
  return result.rows;
}

export async function updateMoto(id: number, values: Partial<Moto>): Promise<Moto | undefined> {
  const mapping: Record<string, string> = { modelo: 'modelo', marca: 'marca', categoria: 'categoria', cilindrada: 'cilindrada', precio: 'precio', imagenLink: 'imagenlink', stock: 'stock', descripcion: 'descripcion' };
  const params: unknown[] = [];
  const fields = Object.entries(values).flatMap(([key, value]) => { const column = mapping[key]; if (!column) return []; params.push(value); return [`${column} = $${params.length}`]; });
  if (!fields.length) return undefined;
  params.push(id);
  const result = await pool.query<Moto>(`UPDATE moto SET ${fields.join(', ')} WHERE identificador = $${params.length} ${returning}`, params);
  return result.rows[0];
}

export async function existsMoto(id: number): Promise<boolean> {
  const result = await pool.query('SELECT 1 FROM moto WHERE identificador = $1 LIMIT 1', [id]);
  return (result.rowCount ?? 0) > 0;
}
