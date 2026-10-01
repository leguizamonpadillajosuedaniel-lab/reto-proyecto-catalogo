# Frontend del catálogo de motos

Frontend estático construido con Astro y Tailwind CSS, preparado para desplegarse en Vercel.

## Configuración

Copia `.env.example` como `.env` y define:

```env
PUBLIC_API_URL=http://localhost:3000
```

En producción, utiliza la URL pública del backend. Las variables `PUBLIC_*` no deben contener secretos.

## Scripts

- `npm run dev`: desarrollo local.
- `npm run build`: genera el sitio estático en `dist/`.
- `npm run preview`: previsualiza la compilación.
- `npm run check`: verifica tipos y componentes Astro.

## Vercel

Vercel utilizará `npm run build` y publicará `dist/`. No se utiliza SSR ni adaptador de Node.js. Configura `PUBLIC_API_URL` en las variables de entorno del proyecto.

El cliente API usa `credentials: include` para enviar la cookie JWT del backend. El backend debe permitir el dominio de Vercel mediante `FRONTEND_URL`.
