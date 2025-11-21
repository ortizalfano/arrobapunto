# 📧 Configuración del Template de EmailJS para Brief Express

## 📋 Campos que se Envían

El Brief Express envía estos campos al template de EmailJS:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `name` | string | Nombre completo del cliente |
| `email` | string | Email del cliente |
| `phone` | string (opcional) | Teléfono del cliente |
| `sector` | string | Sector: `tech`, `retail`, `services`, `nonprofit`, `other` |
| `priority` | string | Tipo: `brand`, `web`, `performance` |
| `timeline` | string | Timeline: `urgent`, `1-3months`, `3-6months`, `flexible` |
| `objective` | string | Descripción del proyecto |
| `estimate` | string | Estimación calculada (ej: "1950") |
| `locale` | string | Idioma: `es` o `en` |

## 🚀 Pasos para Configurar el Template

### Paso 1: Acceder a Email Templates
1. Inicia sesión en [EmailJS](https://www.emailjs.com/)
2. Ve a **Email Templates** en el menú lateral
3. Haz clic en **Create New Template**

### Paso 2: Configurar el Template

#### Asunto del Email (Subject)
```
Nuevo Brief Express - {{name}}
```

#### Cuerpo del Email (Content)

Copia y pega este template HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #90F3E6 0%, #E8DCC7 100%);
      color: #0B0F14;
      padding: 20px;
      border-radius: 8px 8px 0 0;
      margin: -30px -30px 20px -30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }
    .section {
      margin: 20px 0;
      padding: 15px;
      background-color: #f9f9f9;
      border-radius: 6px;
      border-left: 4px solid #90F3E6;
    }
    .section-title {
      font-weight: bold;
      color: #0B0F14;
      margin-bottom: 10px;
      font-size: 16px;
    }
    .field {
      margin: 8px 0;
    }
    .field-label {
      font-weight: 600;
      color: #666;
      display: inline-block;
      min-width: 120px;
    }
    .field-value {
      color: #0B0F14;
    }
    .estimate {
      background: linear-gradient(135deg, #90F3E6 0%, #E8DCC7 100%);
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      margin: 20px 0;
    }
    .estimate-amount {
      font-size: 36px;
      font-weight: bold;
      color: #0B0F14;
      margin: 10px 0;
    }
    .objective {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #E8DCC7;
      margin: 15px 0;
      white-space: pre-wrap;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✨ Nuevo Brief Express</h1>
    </div>

    <div class="section">
      <div class="section-title">👤 Información de Contacto</div>
      <div class="field">
        <span class="field-label">Nombre:</span>
        <span class="field-value">{{name}}</span>
      </div>
      <div class="field">
        <span class="field-label">Email:</span>
        <span class="field-value">{{email}}</span>
      </div>
      {{#phone}}
      <div class="field">
        <span class="field-label">Teléfono:</span>
        <span class="field-value">{{phone}}</span>
      </div>
      {{/phone}}
    </div>

    <div class="section">
      <div class="section-title">📊 Detalles del Proyecto</div>
      <div class="field">
        <span class="field-label">Sector:</span>
        <span class="field-value">
          {{#if_eq sector "tech"}}Tech / SaaS{{/if_eq}}
          {{#if_eq sector "retail"}}Retail / E-commerce{{/if_eq}}
          {{#if_eq sector "services"}}Servicios{{/if_eq}}
          {{#if_eq sector "nonprofit"}}Non-profit{{/if_eq}}
          {{#if_eq sector "other"}}Otro{{/if_eq}}
        </span>
      </div>
      <div class="field">
        <span class="field-label">Tipo de proyecto:</span>
        <span class="field-value">
          {{#if_eq priority "brand"}}Una página web moderna{{/if_eq}}
          {{#if_eq priority "web"}}Una tienda online{{/if_eq}}
          {{#if_eq priority "performance"}}Algo personalizado{{/if_eq}}
        </span>
      </div>
      <div class="field">
        <span class="field-label">Timeline:</span>
        <span class="field-value">
          {{#if_eq timeline "urgent"}}Urgente (< 1 mes){{/if_eq}}
          {{#if_eq timeline "1-3months"}}1-3 meses{{/if_eq}}
          {{#if_eq timeline "3-6months"}}3-6 meses{{/if_eq}}
          {{#if_eq timeline "flexible"}}Flexible{{/if_eq}}
        </span>
      </div>
    </div>

    <div class="estimate">
      <div style="font-size: 14px; color: #666; margin-bottom: 5px;">💰 Estimación Calculada</div>
      <div class="estimate-amount">${{estimate}}</div>
      <div style="font-size: 12px; color: #666;">Estimación orientativa</div>
    </div>

    <div class="section">
      <div class="section-title">📝 Descripción del Proyecto</div>
      <div class="objective">{{objective}}</div>
    </div>

    <div class="footer">
      <p>📧 Enviado desde <strong>arrobapunto.com</strong></p>
      <p>Brief Express - Calculadora de estimación</p>
      <p style="margin-top: 10px; color: #999;">Este email fue generado automáticamente desde el formulario Brief Express.</p>
    </div>
  </div>
</body>
</html>
```

### Paso 3: Versión Simple (Texto Plano)

Si prefieres un template más simple sin HTML:

```
═══════════════════════════════════════
✨ NUEVO BRIEF EXPRESS
═══════════════════════════════════════

👤 INFORMACIÓN DE CONTACTO
──────────────────────────
Nombre: {{name}}
Email: {{email}}
{{#phone}}Teléfono: {{phone}}{{/phone}}

📊 DETALLES DEL PROYECTO
────────────────────────
Sector: {{sector}}
Tipo de proyecto: {{priority}}
Timeline: {{timeline}}

💰 ESTIMACIÓN CALCULADA
────────────────────────
${{estimate}}
(Estimación orientativa)

📝 DESCRIPCIÓN DEL PROYECTO
────────────────────────────
{{objective}}

────────────────────────────
📧 Enviado desde arrobapunto.com
Brief Express - Calculadora de estimación
```

### Paso 4: Configurar el Destinatario

1. En la sección **To Email**, ingresa el email donde quieres recibir los briefs:
   ```
   hola@arrobapunto.com
   ```
   (o el email que prefieras)

2. **From Name**: `Brief Express`
3. **From Email**: Puede ser el mismo que configuraste en tu Email Service

### Paso 5: Guardar y Obtener el Template ID

1. Haz clic en **Save**
2. Copia el **Template ID** (ej: `template_abc123`)
3. Este ID lo necesitarás para la variable `NEXT_PUBLIC_EMAILJS_TEMPLATE_BRIEF` en Vercel

## 🔧 Mapeo de Valores

Para que los valores se muestren correctamente en español, EmailJS necesita helpers. Si tu plan no incluye helpers, usa esta versión simplificada:

### Template Simplificado (Sin Helpers)

```html
<div class="section">
  <div class="section-title">📊 Detalles del Proyecto</div>
  <div class="field">
    <span class="field-label">Sector:</span>
    <span class="field-value">{{sector}}</span>
  </div>
  <div class="field">
    <span class="field-label">Tipo:</span>
    <span class="field-value">{{priority}}</span>
  </div>
  <div class="field">
    <span class="field-label">Timeline:</span>
    <span class="field-value">{{timeline}}</span>
  </div>
</div>
```

Los valores se mostrarán como: `tech`, `brand`, `urgent`, etc. (puedes traducirlos manualmente o usar helpers si tienes plan Pro).

## ✅ Verificación

1. Guarda el template
2. Copia el Template ID
3. Agrégalo a Vercel como `NEXT_PUBLIC_EMAILJS_TEMPLATE_BRIEF`
4. Haz redeploy
5. Prueba el Brief Express
6. Verifica que recibes el email correctamente

## 🎨 Personalización

Puedes personalizar:
- Colores (cambia los códigos hex en el CSS)
- Estructura del email
- Agregar tu logo
- Cambiar el formato de la estimación

## 📝 Notas Importantes

- Los campos `{{phone}}` y otros opcionales usan sintaxis Handlebars `{{#phone}}...{{/phone}}`
- Si no tienes plan Pro, los helpers `{{#if_eq}}` no funcionarán - usa la versión simplificada
- El campo `estimate` viene como string (ej: "1950"), puedes formatearlo en el template si quieres




