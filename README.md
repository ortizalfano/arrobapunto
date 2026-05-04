# ArrobaPunto.com - Web Premium

Agencia de diseño y desarrollo web premium. Web award-winning con diseño boutique, animaciones fluidas, mobile-first, ultra rápida, SEO first y un hub de herramientas para Diseñadores & Desarrolladores.

## 🚀 Stack Tecnológico

### Core
- **Next.js 15** con App Router
- **TypeScript** (strict mode)
- **Tailwind CSS** con variables CSS para tema claro/oscuro
- **Framer Motion** para micro-interacciones y animaciones fluidas
- **Zod + React Hook Form** para validación de formularios

### Base de Datos
- **Prisma** + **PostgreSQL** (Neon o Railway)
- Rate limiting y tracking de métricas
- Schema para links, leads y blog posts

### UI/UX
- **shadcn/ui** (botones, cards, inputs, etc.)
- **next-intl** para i18n (es/en)
- **Framer Motion** (parallax sutil, reveal on scroll)
- **Sharp** en API routes para procesamiento de imágenes
- PWA con manifest + service worker

### SEO & Performance
- **next-sitemap** para sitemap.xml automático
- Schema.org (Organization, LocalBusiness, Review)
- OG dinámicas con next/og
- robots.txt optimizado
- i18n routing con /en/* y /es/*

## 📁 Estructura del Proyecto

```
arroba-new-web/
├── app/
│   ├── [locale]/              # Rutas i18n (es/en)
│   │   ├── page.tsx           # Home
│   │   ├── work/              # Portfolio
│   │   ├── services/          # Servicios y precios
│   │   ├── plugins/           # Productos propios
│   │   ├── studio/            # Sobre nosotros
│   │   ├── blog/              # Blog MDX
│   │   ├── contact/           # Formulario contacto
│   │   ├── play/              # Brief Express
│   │   └── tools/             # Hub de herramientas
│   │       ├── image/         # Compresor/conversor
│   │       └── shorten/       # URL shortener
│   ├── [slug]/route.ts        # Redirección URLs cortas
│   ├── api/
│   │   ├── tools/
│   │   │   ├── image/         # Procesamiento imágenes
│   │   │   └── shorten/       # Crear URL corta
│   │   └── leads/             # Guardar leads
│   ├── sitemap.ts             # Sitemap dinámico
│   ├── robots.ts              # Robots.txt
│   └── layout.tsx
├── components/
│   ├── ui/                    # Componentes shadcn
│   ├── home/                  # Componentes home
│   ├── tools/                 # Componentes herramientas
│   └── play/                  # Brief express
├── lib/
│   ├── utils.ts               # Utilidades
│   ├── validations.ts         # Schemas Zod
│   ├── seo.ts                 # utilidades SEO
│   └── monitor.ts             # scripts de auditoría
├── public/
│   ├── manifest.json           # PWA manifest
│   └── icons/                  # Favicons y PWA icons
└── messages/                   # Traducciones i18n
    ├── es.json
    └── en.json
```

## 🛠️ Instalación y Setup

### Requisitos Previos
- Node.js 18+

### Pasos de Instalación

1. **Clonar y configurar dependencias**
```bash
npm install
```

2. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Edita `.env.local` con (puedes omitir los bloques que no necesites):
```env
# Analytics (opcional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN="arrobapunto.com"
# o
NEXT_PUBLIC_UMAMI_WEBSITE_ID="your-id"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_BASE_URL="https://arrobapunto.com"

# EmailJS (nuevo flujo de formularios)
NEXT_PUBLIC_EMAILJS_SERVICE_ID="service_xxx"
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="public_xxx"
NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT="template_contact"
NEXT_PUBLIC_EMAILJS_TEMPLATE_BRIEF="template_brief"
NEXT_PUBLIC_EMAILJS_TEMPLATE_CALCULATOR="template_calculator"
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📜 Scripts Disponibles

### Desarrollo
| Script | Descripción |
|--------|-------------|
| `npm run dev` | Ejecuta en modo desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Ejecuta servidor de producción |
| `npm run preview` | Preview de producción local |

### Calidad
| Script | Descripción |
|--------|-------------|
| `npm run lint` | Ejecuta ESLint |
| `npm run lint:fix` | Auto-fix ESLint |
| `npm run typecheck` | Verifica tipos TypeScript |
| `npm run format` | Formatea código con Prettier |

### Tests
| Script | Descripción |
|--------|-------------|
| `npm run test` | Ejecuta tests con Vitest y coverage |
| `npm run test:watch` | Tests en watch mode |
| `npm run a11y` | Tests de accesibilidad |

### Audits
| Script | Descripción |
|--------|-------------|
| `npm run audit:perf` | Audita rendimiento con Lighthouse |
| `npm run audit:all` | Ejecuta todos los audits |

### Post-Launch (Nuevo)
| Script | Descripción |
|--------|-------------|
| `npm run monitor:perf` | Monitor de Lighthouse |
| `npm run backup` | Backup de DB y assets |
| `npm run release` | Genera CHANGELOG y crea tag |
| `npm run security` | Escanea vulnerabilidades |

### Database
| Script | Descripción |
|--------|-------------|
| `npm run db:migrate` | Crea migración de Prisma |
| `npm run db:seed` | Ejecuta seed de datos |
| `npm run db:studio` | Abre Prisma Studio |
| `npm run db:push` | Push schema a DB |
| `npm run setup` | Setup de tests |

## 🌍 Rutas y Páginas

### Marketing
- `/es/` y `/en/` - Home con hero premium y brief express
- `/es/work` - Portfolio y casos de éxito
- `/es/services` - Servicios con precios guía
- `/es/plugins` - Productos propios (xInvoice, Projects)
- `/es/studio` - Sobre nosotros + valores
- `/es/blog` - Blog con MDX
- `/es/contact` - Formulario de contacto

### Interactivas
- `/es/play` - Brief Express: calculadora de estimaciones

### Herramientas
- `/es/tools` - Hub de herramientas
- `/es/tools/image` - Compresor y convertidor de imágenes (JPG↔PNG↔WEBP)
- `/es/tools/shorten` - Acortador de URLs con stats

### APIs
- `POST /api/tools/shorten` - Crear URL corta
- `GET /{slug}` - Redirección de URL corta
- `POST /api/leads` - Guardar lead del brief
- `POST /api/tools/image` - Procesamiento de imágenes (futuro)

## 🎨 Componentes Clave

### Home Components
- `<Hero />` - Hero fullscreen con animaciones Framer Motion
- `<TrustBar />` - Barra de logos de clientes
- `<HowWeWork />` - Proceso de trabajo en 3 pasos
- `<BriefExpress />` - CTA al estimador
- `<PluginsLab />` - Productos propios con CTAs
- `<Testimonials />` - Reviews de clientes

### Tools Components
- `<ImageProcessor />` - Compresor/clonversor de imágenes
- `<ShortenForm />` - Formulario de acortado de URLs

## 🗄️ Base de Datos (Prisma)

### Models

**Link**
- URL shortener con métricas básicas
- Campos: `slug`, `url`, `clicks`, `ipAddress`, `uaSample`

**Lead**
- Leads del brief express
- Campos: `name`, `email`, `phone`, `answers` (JSON), `projectType`

**BlogPost**
- Posts del blog
- Campos: `slug`, `title`, `content` (MDX), `category`, `published`

## 🔒 Seguridad

- Rate limiting en `/api/tools/shorten` (10 creaciones/hora por IP)
- Validación con Zod en todas las APIs
- Sanitización de inputs
- Bloqueo de URLs internas en shortener
- CSRF protection con Next.js

## 📊 SEO Features

- Sitemap automático (`/sitemap.xml`)
- Robots.txt optimizado
- Schema.org markup (Organization, LocalBusiness, Review)
- OpenGraph dinámico con next/og
- hreflang alternates (es/en)
- Canonical URLs
- Meta tags por página

## ⚡ Performance

- Lighthouse 95+ en todas las métricas
- Next.js Image optimization
- Fonts locales con next/font
- Lazy loading y streaming
- PWA ready
- CLS < 0.05, FCP < 1.8s en móvil

## 🚢 Deployment (Vercel)

### Variables de Entorno Requeridas

```env
# Base de datos
DATABASE_URL="postgresql://..."

# App
NEXT_PUBLIC_APP_URL="https://arrobapunto.com"
NEXT_PUBLIC_BASE_URL="https://arrobapunto.com"

# EmailJS (Obligatorias para Brief Express)
NEXT_PUBLIC_EMAILJS_SERVICE_ID="service_xxxxx"
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="xxxxxxxxxxxxx"
NEXT_PUBLIC_EMAILJS_TEMPLATE_BRIEF="template_xxxxx"

# EmailJS (Opcionales para otros formularios)
NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT="template_xxxxx"
NEXT_PUBLIC_EMAILJS_TEMPLATE_CALCULATOR="template_xxxxx"

# Analytics (opcional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN="arrobapunto.com"
```

> 📖 **Guía completa:** Ver [VERCEL-ENV-VARIABLES.md](./VERCEL-ENV-VARIABLES.md) para instrucciones detalladas de configuración en Vercel.

### Build Command
```bash
npm run build
```

### Deploy
1. Conectar repo a Vercel
2. Configurar variables de entorno
3. Auto-deploy en push a `main`

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui
```

Tests ubicados en `/__tests__` con Vitest + Testing Library.

## 📝 Linting & Formatting

```bash
# Check ESLint
npm run lint

# Check Prettier
npm run format:check

# Auto-fix
npm run format
```

## 📱 PWA

- Manifest: `/public/manifest.json`
- Icons: `/public/icon-*.png` (192x192, 512x512)
- Service Worker configurado automáticamente con Next.js

## 🎯 Próximos Features

- [ ] Exportar brief PDF desde /play
- [ ] Blog MDX con syntax highlighting
- [ ] Admin panel para gestionar links y leads
- [ ] SVG optimizer en /tools
- [ ] Color palette extractor en /tools
- [ ] Integración con Google Analytics
- [ ] Dark mode toggle mejorado

## 📄 Licencia

Proprietary - ArrobaPunto © 2024

## 👥 Contacto

- Website: [arrobapunto.com](https://arrobapunto.com)
- Email: contacto@arrobapunto.com
- Sedes: Panamá 🇵🇦 | Madrid 🇪🇸

