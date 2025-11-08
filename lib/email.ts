"use client";

import emailjs from "@emailjs/browser";

type TemplateKey = "contact" | "brief" | "calculator";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const TEMPLATE_MAP: Record<TemplateKey, string | undefined> = {
  contact: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT,
  brief: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_BRIEF,
  calculator: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CALCULATOR,
};

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

export async function sendEmail(template: TemplateKey, variables: Record<string, any>) {
  const { serviceId, publicKey, templateId } = ensureConfig(template);

  return emailjs.send(serviceId, templateId, variables, {
    publicKey,
  });
}

export function isEmailJsReady(template: TemplateKey) {
  try {
    ensureConfig(template);
    return true;
  } catch {
    return false;
  }
}


