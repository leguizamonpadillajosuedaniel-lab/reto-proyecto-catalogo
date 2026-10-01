import pg from 'pg';
import { env } from '../config/env.js';

const { Pool } = pg;

const databaseUrl = new URL(env.DATABASE_URL);
const requiresSsl = env.NODE_ENV === 'production'
  || env.PGSSLMODE === 'require'
  || databaseUrl.searchParams.get('sslmode') === 'require'
  || databaseUrl.hostname.endsWith('.supabase.co');

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: requiresSsl ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
});

pool.on('error', (error) => console.error('Error inesperado del pool PostgreSQL:', error));
