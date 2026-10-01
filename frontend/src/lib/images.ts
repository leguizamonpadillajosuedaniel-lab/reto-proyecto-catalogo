const images: Record<string, string> = {
  'BROZZ-250': '/assets/motos/brozz-250.webp', 'FOX RS-250': '/assets/motos/fox-rs-250-1.webp', 'NXR-250': '/assets/motos/nxr-250.webp',
  'LIBERTY-200': '/assets/motos/liberty-200.webp', 'BIT-150': '/assets/motos/bit-150.webp', 'CGL-150': '/assets/motos/cgl-150.webp',
  'CGL-150E': '/assets/motos/cgl-150-e-1.webp', 'CB1-150': '/assets/motos/cb1-150.webp', 'BLITZ-135': '/assets/motos/blitz-135.webp', 'BIS-135': '/assets/motos/bis-135.webp',
};
export function motoImage(modelo: string, fallback?: string) { return images[modelo] || (fallback?.includes('.example') ? '/assets/motos/placeholder.webp' : fallback) || '/assets/motos/placeholder.webp'; }
