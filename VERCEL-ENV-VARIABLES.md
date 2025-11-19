# 🔧 Variables de Entorno en Vercel

## 📋 Variables Requeridas para EmailJS

Para que el Brief Express funcione correctamente, necesitas configurar estas variables en el dashboard de Vercel:

### Variables de EmailJS (Obligatorias para Brief Express)

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_BRIEF=template_xxxxx
```

### Variables Opcionales (para otros formularios)

```
NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT=template_xxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_CALCULATOR=template_xxxxx
```

## 🚀 Cómo Configurarlas en Vercel

> 📖 **Guía visual paso a paso:** Ver [VERCEL-SETUP-PASO-A-PASO.md](./VERCEL-SETUP-PASO-A-PASO.md) para instrucciones detalladas con capturas.

### Paso 1: Acceder a la Configuración
1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto `arroba-new-web`
3. Ve a **Settings** → **Environment Variables**

### Paso 2: Agregar Variables
1. Haz clic en **Add New**
2. Ingresa el **Name** (ej: `NEXT_PUBLIC_EMAILJS_SERVICE_ID`)
3. Ingresa el **Value** (tu valor de EmailJS)
4. Selecciona los **Environments** donde aplicará:
   - ✅ Production (obligatorio)
   - ✅ Preview (opcional)
   - ✅ Development (opcional)
5. Haz clic en **Save**

### Paso 3: Repetir para Todas las Variables
Agrega las 3 variables obligatorias (una por una):
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` = `service_xxxxx`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` = `xxxxxxxxxxxxx`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_BRIEF` = `template_xxxxx`

### Paso 4: Redesplegar (IMPORTANTE)
Después de agregar las variables:
1. Ve a **Deployments**
2. Haz clic en los 3 puntos (⋯) del último deployment
3. Selecciona **Redeploy**
4. O simplemente haz un nuevo push a `main`
5. Espera a que termine el deployment

## 📧 Cómo Obtener los Valores de EmailJS

### 1. Crear Cuenta en EmailJS
- Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
- Crea una cuenta gratuita (hasta 200 emails/mes gratis)

### 2. Crear un Email Service
1. Ve a **Email Services**
2. Haz clic en **Add New Service**
3. Elige tu proveedor (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar
5. **Copia el Service ID** (ej: `service_abc123`)

### 3. Obtener Public Key
1. Ve a **Account** → **General**
2. En **API Keys**, copia tu **Public Key**

### 4. Crear Template para Brief
1. Ve a **Email Templates**
2. Haz clic en **Create New Template**
3. Configura el template con estos campos:
   - `name` - Nombre del cliente
   - `email` - Email del cliente
   - `phone` - Teléfono (opcional)
   - `sector` - Sector del negocio
   - `priority` - Tipo de proyecto
   - `timeline` - Timeline del proyecto
   - `objective` - Descripción del proyecto
   - `estimate` - Estimación calculada
   - `locale` - Idioma

4. **Template Completo:**
   > 📖 **Guía detallada:** Ver [EMAILJS-TEMPLATE-SETUP.md](./EMAILJS-TEMPLATE-SETUP.md) para el template HTML completo y personalizado.

5. **Template Simple (Texto):**
```
Subject: Nuevo Brief Express - {{name}}

Hola,

Has recibido un nuevo brief express:

Nombre: {{name}}
Email: {{email}}
{{#phone}}Teléfono: {{phone}}{{/phone}}

Sector: {{sector}}
Tipo de proyecto: {{priority}}
Timeline: {{timeline}}

Descripción:
{{objective}}

Estimación: ${{estimate}}

---
Enviado desde arrobapunto.com
```

6. **Copia el Template ID** (ej: `template_xyz789`)

## ✅ Verificar que Funciona

Después de configurar:
1. Ve a tu sitio en producción
2. Completa el Brief Express
3. Verifica que recibes el email
4. Si no funciona, revisa la consola del navegador (F12) para ver errores

## 🔒 Seguridad

- ✅ Las variables `NEXT_PUBLIC_*` son públicas (se exponen al cliente)
- ✅ EmailJS usa Public Key (seguro para frontend)
- ✅ No expongas Private Keys ni secrets
- ✅ El rate limiting de EmailJS protege contra spam

## 📝 Variables Adicionales Recomendadas

Si aún no las tienes configuradas:

```
# Base de datos
DATABASE_URL=postgresql://...

# App
NEXT_PUBLIC_APP_URL=https://arrobapunto.com
NEXT_PUBLIC_BASE_URL=https://arrobapunto.com

# Analytics (opcional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=arrobapunto.com
```

## 🆘 Troubleshooting

### El email no se envía
1. Verifica que las variables estén en Vercel (no solo en `.env.local`)
2. Verifica que hayas hecho redeploy después de agregar variables
3. Revisa la consola del navegador para errores
4. Verifica que el template ID sea correcto en EmailJS

### Error: "Faltan variables de entorno"
- Asegúrate de que las variables empiecen con `NEXT_PUBLIC_`
- Verifica que estén en el environment correcto (Production)
- Haz redeploy después de agregarlas

### El brief funciona pero no llega el email
- Verifica la configuración del Email Service en EmailJS
- Revisa el spam folder
- Verifica que el template tenga todos los campos correctos

