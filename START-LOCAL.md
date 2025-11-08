# 🚀 Iniciar Proyecto Local - ArrobaPunto.com

## ✅ Estado de Configuración

✅ Base de datos SQLite creada (`prisma/dev.db`)  
✅ Variables de entorno configuradas (`.env.local`)  
✅ Migraciones aplicadas  
✅ Todas las dependencias instaladas  
✅ Proyecto listo para ejecutar  

---

## 🎯 Comando para Iniciar

```bash
npm run dev
```

### ¿Qué hace este comando?

1. Inicia el servidor de desarrollo de Next.js
2. Compila el proyecto
3. Hace disponible la aplicación en `http://localhost:3000`

### Tiempo estimado

La primera vez puede tardar ~30-60 segundos en compilar  
Compilaciones posteriores: ~5-10 segundos  

---

## 📍 URLs Disponibles

Una vez iniciado el servidor, podrás acceder a:

### Páginas Principales
- 🌐 **Home:** http://localhost:3000/es/
- 🌐 **Home (EN):** http://localhost:3000/en/
- 💼 **Trabajos:** http://localhost:3000/es/work
- 🛠️ **Servicios:** http://localhost:3000/es/services
- 🎨 **Herramientas:** http://localhost:3000/es/tools
- 🖼️ **Compresor Imágenes:** http://localhost:3000/es/tools/image
- 🔗 **Acortador URLs:** http://localhost:3000/es/tools/shorten
- 📝 **Brief Express:** http://localhost:3000/es/play
- 📞 **Contacto:** http://localhost:3000/es/contact
- 🏢 **Estudio:** http://localhost:3000/es/studio

### Dashboard Interno
- 📊 **Métricas:** http://localhost:3000/dashboard?key=dev-key-123

---

## 🎨 Características Visibles

### Home
- ✅ Hero premium con animaciones Aurea Noir
- ✅ Trust bar con logos de clientes
- ✅ "Cómo trabajamos" (3 pasos)
- ✅ Brief Express CTA
- ✅ Plugins & Labs showcase
- ✅ Testimonios
- ✅ Theme toggle (modo oscuro/claro)

### Herramientas
- ✅ `/tools/image` - Compresor y conversor de imágenes
  - Drag & drop
  - Preview antes/después
  - Slider de calidad
  - Descarga individual o batch
  
- ✅ `/tools/shorten` - Acortador de URLs
  - Validación de slugs
  - Generación automática
  - Rate limiting

### Brief Express
- ✅ `/play` - Calculadora de estimación
- ✅ Formulario con 5 preguntas
- ✅ Cálculo automático de estimación
- ✅ Guardado en DB (SQLite local)

---

## 🛠️ Comandos Útiles

```bash
# Servidor de desarrollo
npm run dev

# Verificar tipos
npm run typecheck

# Linting
npm run lint

# Tests
npm run test

# Preview de producción
npm run build && npm start
```

---

## 🎨 Tema Aurea Noir

El proyecto usa el tema **Aurea Noir** con:
- 📱 Modo oscuro por defecto
- ✨ Micro-interacciones fluidas
- 🎭 Gradientes aurora-edge
- 🌟 Sombras soft/deep/glow
- 🎨 Paleta de colores premium

**Theme toggle** disponible en el navbar

---

## 🗄️ Base de Datos Local

- **Archivo:** `prisma/dev.db` (SQLite)
- **Client:** Prisma Client generado
- **Models:** Link, Lead, BlogPost

Para ver datos:
```bash
npm run db:studio
```

Se abrirá Prisma Studio en `http://localhost:5555`

---

## ⚠️ Notas Importantes

### Para Producción

Cuando deployees a producción, necesitarás:

1. **Cambiar datasource en Prisma:**
```prisma
datasource db {
  provider = "postgresql"  // No sqlite
  url      = env("DATABASE_URL")
}
```

2. **Configurar PostgreSQL:**
   - Neon (https://neon.tech)
   - Railway (https://railway.app)
   - O tu propia instancia

3. **Variables de entorno en Vercel:**
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_BASE_URL="https://arrobapunto.com"
DASHBOARD_KEY="tu-clave-segura"
```

---

## 🐛 Troubleshooting

### El servidor no inicia

```bash
# Limpiar cache y recompilar
rm -rf .next
npm run dev
```

### Error de Prisma

```bash
# Regenerar cliente
npx prisma generate

# Re-aplicar schema
npm run db:push
```

### Puerto ocupado

```bash
# Usar otro puerto
PORT=3001 npm run dev
```

---

## 🎉 ¡Todo Listo!

Ejecuta `npm run dev` y visita http://localhost:3000

Que disfrutes explorando el proyecto! 🚀







