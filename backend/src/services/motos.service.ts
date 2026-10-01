import * as repository from '../repositories/moto.repository.js';
import type { Moto } from '../types/moto.types.js';

export const listMotos = (filters: Record<string, unknown>) => repository.findMotos(filters);
export const createMoto = (moto: Omit<Moto, 'identificador'>) => repository.createMoto(moto);

export async function updateMoto(id: number, values: Partial<Moto>) {
  if (!(await repository.existsMoto(id))) return undefined;
  return repository.updateMoto(id, values);
}
