import { Hono } from 'hono';
import { pool } from '../database/postgres.js';

export const healthRoutes = new Hono();

healthRoutes.get('/database', async (c) => {
  try {
    await pool.query('SELECT 1');
    return c.json({ estado: 'ok', database: 'connected' });
  } catch (error) {
    console.error('Comprobación de PostgreSQL fallida:', error);
    return c.json({ estado: 'error', database: 'unavailable' }, 503);
  }
});
