# Backend del catálogo de motos

API REST construida con TypeScript, Node.js, Hono y PostgreSQL.

## Inicio local

```bash
npm install
copy .env.example .env
npm run dev
```

La API estará disponible en `http://localhost:3000`.

Antes de iniciar, configura `DATABASE_URL` y un `JWT_SECRET` de al menos 32 caracteres en `.env`. Como alternativa, puedes definir `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD` y `PGSSLMODE`; `DATABASE_URL` tiene prioridad si ambas configuraciones existen.

En producción, `FRONTEND_URL` debe contener el origen exacto del frontend desplegado. Como frontend y backend pueden estar en dominios distintos, la cookie de autenticación se configura con `SameSite=None` y `Secure` en producción.

Si PostgreSQL no está disponible, la API responde `503 DATABASE_UNAVAILABLE`. Revisa que `DATABASE_URL` apunte a un servidor PostgreSQL válido y accesible.

## Comandos

- `npm run dev`: desarrollo con recarga automática.
- `npm run build`: compilación TypeScript.
- `npm start`: ejecución de la compilación.
- `npm test`: pruebas Vitest.

## Rutas

- `GET /`: estado de la API.
- `POST /api/auth/login`: inicia sesión y crea una cookie HttpOnly.
- `POST /api/auth/logout`: elimina la cookie de sesión.
- `GET /api/motos`: lista y filtra motos.
- `POST /api/motos`: registra una moto autenticado.
- `PUT /api/motos/:identificador`: actualiza una moto autenticado.

Las consultas a PostgreSQL utilizan parámetros `$1`, `$2`, etc.; no se deben colocar valores directamente en SQL.
