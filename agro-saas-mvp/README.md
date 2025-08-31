
# Agro SaaS MVP (Next.js + Prisma + SQLite + JWT + Tailwind)

Aplicación web lista para ejecutar que incluye:
- **Next.js (App Router) + TypeScript + Tailwind**
- **Prisma + SQLite** (migraciones y seed)
- **Auth propio con email/contraseña** (JWT en cookie HTTP-only)
- **CRUD de Parcelas y Registros de Labores**
- **Asistente IA** (endpoint `/api/chat` que usa OpenAI si configuras la clave; si no, devuelve respuesta simulada)
- **Exportación a PDF desde el frontal** (jsPDF)

> Pensada como base profesional para un SaaS agrícola (cuaderno de campo, informes, etc.).

## 🚀 Requisitos
- Node.js 18+
- pnpm (recomendado) o npm
- (Opcional) Clave OpenAI para respuestas reales del asistente

## ⚙️ Configuración

1) Copia variables de entorno:
```bash
cp .env.example .env
```
Edita `.env` si quieres cambiar puerto o añadir `OPENAI_API_KEY`.

2) Instala dependencias:
```bash
pnpm install  # o npm install
```

3) Migraciones y seed (crea un usuario admin y datos de ejemplo):
```bash
pnpm prisma:push && pnpm prisma:seed
```

4) Ejecuta en desarrollo:
```bash
pnpm dev
```
Abre http://localhost:3000

### 🔐 Credenciales iniciales (seed)
- Email: **admin@example.com**
- Password: **admin123**

> Cambia la contraseña desde el menú de usuario (arriba a la derecha) una vez dentro.

## 📦 Scripts útiles
- `pnpm dev` — modo desarrollo
- `pnpm build && pnpm start` — producción
- `pnpm prisma:push` — aplica esquema Prisma a SQLite
- `pnpm prisma:studio` — abre Prisma Studio
- `pnpm prisma:seed` — datos iniciales

## 🧠 Asistente IA
- Endpoint: `/api/chat`
- Si `OPENAI_API_KEY` está definido, usa OpenAI.
- Sin clave, responderá con un texto "simulado" útil para pruebas.

## 📝 Exportar PDF
En la página **Registros**, botón **Exportar PDF** genera un informe de ejemplo en el navegador (jsPDF).

## 🛠️ Estructura (resumen)
```
src/
  app/
    (auth)/login
    (dashboard)/dashboard
    api/...
  components/
  lib/
  types/
prisma/
  schema.prisma
```

## ⚖️ Licencia
MIT — úsalo, modifícalo, monetízalo sin restricciones.
