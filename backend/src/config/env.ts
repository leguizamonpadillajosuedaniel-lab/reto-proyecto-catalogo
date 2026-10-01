import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  FRONTEND_URL: z.string().url().default('http://localhost:4321'),
  CORS_ORIGINS: z.string().min(1, 'Define CORS_ORIGINS con los orígenes permitidos').optional(),
  DATABASE_URL: z.string().url().optional(),
  PGHOST: z.string().min(1).optional(),
  PGPORT: z.coerce.number().int().positive().default(5432),
  PGDATABASE: z.string().min(1).default('catalogoMotos'),
  PGUSER: z.string().min(1).default('postgres'),
  PGPASSWORD: z.string().default(''),
  PGSSLMODE: z.enum(['disable', 'prefer', 'require']).default('prefer'),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('1h'),
  COOKIE_NAME: z.string().default('auth_token'),
  BCRYPT_ROUNDS: z.coerce.number().int().min(4).max(15).default(8),
}).superRefine((values, context) => {
  if (!values.DATABASE_URL && !values.PGHOST) {
    context.addIssue({ code: 'custom', path: ['DATABASE_URL'], message: 'Define DATABASE_URL o PGHOST para conectar con PostgreSQL' });
  }
});

const parsedEnv = envSchema.parse(process.env);
const databaseUrl = parsedEnv.DATABASE_URL || `postgresql://${encodeURIComponent(parsedEnv.PGUSER)}:${encodeURIComponent(parsedEnv.PGPASSWORD)}@${parsedEnv.PGHOST}:${parsedEnv.PGPORT}/${parsedEnv.PGDATABASE}`;

export const env = { ...parsedEnv, DATABASE_URL: databaseUrl };
