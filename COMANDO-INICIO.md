# 🚀 Comando para Iniciar el Proyecto

## Inicio Rápido

Ejecuta este comando en la terminal:

```bash
npm run dev
```

El servidor estará disponible en:

- **URL Local:** http://localhost:3000
- **URL de Red:** http://192.168.1.25:3000

## Estado Actual

✅ Base de datos SQLite configurada (`dev.db`)  
✅ Variables de entorno configuradas (`.env.local`)  
✅ Migraciones de Prisma aplicadas  
✅ Servidor Next.js listo para iniciar  

## Acceso al Dashboard

Una vez iniciado, puedes acceder al dashboard de métricas en:

```
http://localhost:3000/dashboard?key=dev-key-123
```

## Páginas Disponibles

- `/` - Home principal
- `/work` - Portfolio
- `/services` - Servicios  
- `/tools` - Herramientas
- `/tools/image` - Compresor de imágenes
- `/tools/shorten` - Acortador de URLs
- `/play` - Brief Express
- `/contact` - Contacto
- `/studio` - Sobre nosotros
- `/blog` - Blog

## Nota Importante

Para producción, cambia la configuración de Prisma de SQLite a PostgreSQL en `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Cambiar de sqlite a postgresql
  url      = env("DATABASE_URL")
}
```

Y configura la DATABASE_URL correcta en producción.







