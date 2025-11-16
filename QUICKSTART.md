# 🚀 Quick Start Guide

Este proyecto ya está configurado y listo para usar. Sigue estos pasos para comenzar:

## 1️⃣ Instalación Rápida

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar base de datos
# Edita .env.local con tu DATABASE_URL

# 3. Inicializar base de datos
npm run db:push

# 4. Ejecutar seed (opcional)
npm run db:seed

# 5. Iniciar servidor de desarrollo
npm run dev
```

## 2️⃣ Configuración de Base de Datos

### Opción A: Neon (Cloud PostgreSQL)

1. Crea cuenta en [neon.tech](https://neon.tech)
2. Crea un nuevo proyecto
3. Copia la connection string
4. Pégala en `.env.local` como `DATABASE_URL`

### Opción B: Railway

1. Crea cuenta en [railway.app](https://railway.app)
2. Crea un nuevo proyecto con PostgreSQL
3. Copia la connection string
4. Pégala en `.env.local` como `DATABASE_URL`

### Opción C: Local PostgreSQL

```env
DATABASE_URL="postgresql://user:password@localhost:5432/arroba_new_web"
```

## 3️⃣ Variables de Entorno

Crea `.env.local`:

```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Opcional: Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN="arrobapunto.com"
```

## 4️⃣ Funcionalidades Implementadas

### ✅ Home Page Premium
- Hero animado con Framer Motion
- Trust bar con logos de clientes
- "Cómo trabajamos" (3 pasos)
- Brief Express CTA
- Plugins & Labs showcase
- Testimonials

### ✅ Herramientas

#### Compresor/Convertidor de Imágenes
- Ruta: `/es/tools/image`
- Compatible: JPG, PNG, WEBP
- Procesamiento client-side
- Preview antes/después
- Slider de calidad
- Descarga individual

#### Acortador de URLs
- Ruta: `/es/tools/shorten`
- Generación de slugs personalizados
- Rate limiting (10/hora por IP)
- Estadísticas de clics
- Redirección automática

### ✅ Brief Express
- Ruta: `/es/play`
- 5 preguntas rápidas
- Cálculo de estimación automática
- Guardado de leads en DB
- Integración con formulario

### ✅ i18n
- Español (default)
- Inglés
- Toggle en navbar
- Rutas: `/es/*` y `/en/*`

### ✅ SEO
- Sitemap automático
- Robots.txt
- Schema.org (Organization, LocalBusiness)
- OpenGraph dinámico
- hreflang alternates

## 5️⃣ Estructura de Páginas

```
/es/              → Home
/es/work          → Portfolio
/es/services      → Servicios y precios
/es/plugins       → Productos propios
/es/studio        → Sobre nosotros
/es/blog          → Blog
/es/contact       → Contacto
/es/play          → Brief Express
/es/tools         → Hub de herramientas
/es/tools/image   → Compresor de imágenes
/es/tools/shorten → Acortador de URLs
```

## 6️⃣ APIs Disponibles

```
POST /api/tools/shorten  → Crear URL corta
GET  /{slug}            → Redirección
POST /api/leads         → Guardar lead
```

## 7️⃣ Scripts Importantes

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build para producción |
| `npm run lint` | Verificar errores ESLint |
| `npm run typecheck` | Verificar tipos TS |
| `npm run test` | Ejecutar tests |
| `npm run db:push` | Push schema a DB |
| `npm run db:seed` | Seed datos de prueba |

## 8️⃣ Próximos Pasos

### Páginas para completar:
1. **Work** - Añadir casos reales con imágenes
2. **Blog** - Implementar MDX con syntax highlighting
3. **Contact** - Conectar formulario a email service
4. **Services** - Añadir más detalles y precios específicos

### Features para añadir:
1. Dark mode toggle visible
2. Buscador en blog
3. Filtros en portfolio
4. Admin panel para gestionar content
5. Exportar PDF del brief
6. Analytics (Plausible/Umami)

## 9️⃣ Deployment

### Vercel (Recomendado)

1. Push a GitHub
2. Conectar repo en [vercel.com](https://vercel.com)
3. Configurar variables de entorno
4. Deploy automático

### Variables de Entorno en Producción:
```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_APP_URL=https://arrobapunto.com
```

## 🎨 Customización

### Cambiar Colores
Edita `app/globals.css` → `:root` variables

### Cambiar Fuentes
Edita `app/layout.tsx` → `Inter` y `Manrope`

### Añadir Páginas
Crea en `app/[locale]/tu-pagina/page.tsx`

### Añadir Componentes
Crea en `components/ui/` o `components/tu-categoria/`

## 🐛 Solución de Problemas

### Error: DATABASE_URL no configurada
→ Crea `.env.local` con `DATABASE_URL`

### Error: Module not found
→ Ejecuta `npm install`

### Error: Prisma client not generated
→ Ejecuta `npm run postinstall`

### Puerto 3000 ocupado
→ Usa `PORT=3001 npm run dev`

## 📞 Soporte

Si tienes dudas:
- Revisa el README.md completo
- Consulta documentación de [Next.js](https://nextjs.org)
- Revisa [Prisma docs](https://www.prisma.io/docs)

---

¡Listo para empezar! 🎉









