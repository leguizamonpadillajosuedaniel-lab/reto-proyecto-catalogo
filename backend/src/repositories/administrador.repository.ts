import { pool } from '../database/postgres.js';

export type AdministratorRow = { Identificador: number; Usuario: string; Contrasena: string };

export async function findByUsuario(usuario: string): Promise<AdministratorRow | undefined> {
  const result = await pool.query<AdministratorRow>('SELECT identificador AS "Identificador", usuario AS "Usuario", contrasena AS "Contrasena" FROM administrador WHERE usuario = $1 LIMIT 1', [usuario]);
  return result.rows[0];
}
