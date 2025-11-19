"use client";

import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";

type TemplateKey = "contact" | "brief" | "calculator";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const TEMPLATE_MAP: Record<TemplateKey, string | undefined> = {
  contact: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT,
  brief: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_BRIEF,
  calculator: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CALCULATOR,
};

let emailjsInitialized = false;

function ensureConfig(template: TemplateKey) {
  if (!SERVICE_ID || !PUBLIC_KEY) {
    throw new Error("Faltan variables de entorno de EmailJS (service o public key).");
  }

  const templateId = TEMPLATE_MAP[template];

  if (!templateId) {
    throw new Error(`Falta configurar el template de EmailJS para ${template}.`);
  }

  return { serviceId: SERVICE_ID, publicKey: PUBLIC_KEY, templateId };
}

function initEmailJS() {
  if (emailjsInitialized || typeof window === "undefined") {
    return;
  }

  if (PUBLIC_KEY) {
    try {
      emailjs.init(PUBLIC_KEY);
      emailjsInitialized = true;
    } catch (error) {
      console.error("Error inicializando EmailJS:", error);
    }
  }
}

export async function sendEmail(template: TemplateKey, variables: Record<string, unknown>) {
  // Inicializar EmailJS si no está inicializado
  initEmailJS();

  const { serviceId, publicKey, templateId } = ensureConfig(template);

  try {
    const result = await emailjs.send(serviceId, templateId, variables, {
      publicKey,
    });
    return result;
  } catch (error) {
    console.error("Error enviando email:", error);
    // Si falla, intentar inicializar de nuevo y reintentar una vez
    if (!emailjsInitialized && PUBLIC_KEY) {
      try {
        emailjs.init(PUBLIC_KEY);
        emailjsInitialized = true;
        return await emailjs.send(serviceId, templateId, variables, {
          publicKey,
        });
      } catch (retryError) {
        console.error("Error en reintento:", retryError);
        throw new Error("No se pudo enviar el email. Por favor, verifica tu conexión e inténtalo de nuevo.");
      }
    }
    throw error;
  }
}

export function isEmailJsReady(template: TemplateKey) {
  try {
    ensureConfig(template);
    return true;
  } catch {
    return false;
  }
}

// Hook para inicializar EmailJS en el cliente
export function useEmailJS() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      initEmailJS();
      setIsReady(isEmailJsReady("brief"));
    }
  }, []);

  return isReady;
}


