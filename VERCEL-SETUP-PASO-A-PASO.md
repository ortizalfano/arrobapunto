# 🚀 Configurar Variables de EmailJS en Vercel - Paso a Paso

## 📋 Variables que Necesitas

Antes de empezar, asegúrate de tener estos 3 valores de EmailJS:
1. **Service ID** (ej: `service_abc123`)
2. **Public Key** (ej: `xxxxxxxxxxxxx`)
3. **Template ID** (ej: `template_xyz789`)

## 🎯 Pasos en Vercel

### Paso 1: Acceder a tu Proyecto
1. Ve a [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Inicia sesión con tu cuenta
3. Busca y haz clic en tu proyecto **arroba-new-web** (o el nombre que tenga)

### Paso 2: Ir a Settings
1. En la parte superior del proyecto, verás varias pestañas: **Overview**, **Deployments**, **Analytics**, **Settings**
2. Haz clic en **Settings**

### Paso 3: Ir a Environment Variables
1. En el menú lateral izquierdo de Settings, busca la sección **Configuration**
2. Haz clic en **Environment Variables**

### Paso 4: Agregar la Primera Variable (Service ID)
1. Verás un botón **Add New** o **+ Add** - haz clic
2. En el campo **Key** (o Name), escribe exactamente:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID
   ```
3. En el campo **Value**, pega tu Service ID de EmailJS:
   ```
   service_abc123
   ```
   (reemplaza con tu valor real)

4. En **Environment**, selecciona:
   - ✅ **Production** (obligatorio)
   - ✅ **Preview** (opcional, para branches)
   - ✅ **Development** (opcional, para local)

5. Haz clic en **Save**

### Paso 5: Agregar la Segunda Variable (Public Key)
1. Haz clic en **Add New** nuevamente
2. **Key**: 
   ```
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
   ```
3. **Value**: Pega tu Public Key de EmailJS
4. **Environment**: Selecciona Production (y otros si quieres)
5. Haz clic en **Save**

### Paso 6: Agregar la Tercera Variable (Template ID)
1. Haz clic en **Add New** nuevamente
2. **Key**: 
   ```
   NEXT_PUBLIC_EMAILJS_TEMPLATE_BRIEF
   ```
3. **Value**: Pega tu Template ID de EmailJS
4. **Environment**: Selecciona Production (y otros si quieres)
5. Haz clic en **Save**

### Paso 7: Verificar que Están Agregadas
Deberías ver una tabla con tus 3 variables:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID        [Production] [Preview] [Development]
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY        [Production] [Preview] [Development]
NEXT_PUBLIC_EMAILJS_TEMPLATE_BRIEF    [Production] [Preview] [Development]
```

## 🔄 Redesplegar el Proyecto

**IMPORTANTE:** Después de agregar las variables, debes redesplegar para que surtan efecto.

### Opción 1: Redeploy Manual
1. Ve a la pestaña **Deployments**
2. Encuentra el último deployment (el más reciente)
3. Haz clic en los **3 puntos (⋯)** a la derecha del deployment
4. Selecciona **Redeploy**
5. Confirma haciendo clic en **Redeploy** en el popup

### Opción 2: Push a Main (Auto-deploy)
Si tienes auto-deploy configurado:
1. Haz un pequeño cambio en tu código (o un commit vacío)
2. Haz push a la rama `main`
3. Vercel automáticamente hará un nuevo deployment con las nuevas variables

### Opción 3: Redeploy desde Git
1. Ve a **Deployments**
2. Haz clic en **Create Deployment**
3. Selecciona la rama `main` (o la que uses)
4. Haz clic en **Deploy**

## ✅ Verificar que Funciona

1. Espera a que termine el redeploy (verás "Ready" en verde)
2. Ve a tu sitio en producción: `https://arrobapunto.com/play`
3. Completa el Brief Express
4. Verifica que recibes el email en la dirección configurada en EmailJS

## 🐛 Troubleshooting

### Las variables no aparecen en el código
- ✅ Asegúrate de que empiecen con `NEXT_PUBLIC_`
- ✅ Verifica que estén en el environment **Production**
- ✅ **Haz redeploy** después de agregarlas

### El email no se envía
1. Abre la consola del navegador (F12 → Console)
2. Busca errores relacionados con EmailJS
3. Verifica que los valores sean correctos (sin espacios extra)
4. Verifica que el Template ID corresponda al template correcto

### Error: "Faltan variables de entorno"
- Verifica que las 3 variables estén agregadas
- Verifica que los nombres sean exactos (case-sensitive)
- Haz redeploy después de agregarlas

## 📸 Ubicación Visual en Vercel

```
Vercel Dashboard
└── Tu Proyecto (arroba-new-web)
    └── Settings (pestaña superior)
        └── Environment Variables (menú lateral izquierdo)
            └── Add New (botón)
```

## 🔒 Seguridad

- ✅ Las variables `NEXT_PUBLIC_*` son públicas (se exponen al cliente)
- ✅ Esto es seguro para EmailJS porque usa Public Key
- ✅ No expongas Private Keys ni secrets sensibles
- ✅ El rate limiting de EmailJS protege contra spam

## 📝 Resumen Rápido

1. **Vercel Dashboard** → Tu Proyecto → **Settings**
2. **Environment Variables** (menú lateral)
3. **Add New** → Agregar cada variable:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_BRIEF`
4. Seleccionar **Production** en Environment
5. **Save** cada una
6. **Redeploy** el proyecto
7. **Probar** el Brief Express

¡Listo! 🎉



