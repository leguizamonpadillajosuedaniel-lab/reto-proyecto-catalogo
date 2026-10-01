export type ApiError = { error?: { codigo?: string; mensaje?: string; detalles?: Array<{ campo: string; mensaje: string }> } };
export type MotoResponse<T> = { data: T; total?: number; filtros?: Record<string, unknown> };
