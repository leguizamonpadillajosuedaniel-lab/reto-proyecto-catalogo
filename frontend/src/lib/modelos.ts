export const modelos = [
  'BROZZ-250', 'FOX RS-250', 'NXR-250', 'LIBERTY-200', 'BIT-150',
  'CGL-150', 'CGL-150E', 'CB1-150', 'BLITZ-135', 'BIS-135',
] as const;

export function modeloSlug(modelo: string) {
  return modelo.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function modeloDesdeSlug(slug: string) {
  return modelos.find((modelo) => modeloSlug(modelo) === slug);
}

export function categoriaLabel(categoria: string) {
  if (categoria === 'Scoter') return 'Scooter';
  if (categoria === 'Automaticas') return 'Automáticas';
  if (categoria === 'utilitarias') return 'Utilitarias';
  return categoria;
}
