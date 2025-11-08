import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

export async function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    console.warn("SMTP not configured, emails will not be sent");
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port: parseInt(port),
    secure: port === "465",
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}

export async function sendBriefEmail(leadData: {
  name: string;
  email: string;
  answers: any;
  estimate?: number;
}) {
  try {
    const trans = await getTransporter();
    if (!trans) {
      console.warn("Email not sent - SMTP not configured");
      return;
    }

    const inbox = process.env.BRIEF_INBOX;
    const smtpUser = process.env.SMTP_USER;

    if (!inbox) {
      console.warn("BRIEF_INBOX not configured");
      return;
    }

    await trans.sendMail({
      from: smtpUser,
      to: inbox,
      subject: `Nuevo Brief Express - ${leadData.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Nuevo Brief Express</h2>
          
          <h3>Datos del cliente:</h3>
          <p><strong>Nombre:</strong> ${leadData.name}</p>
          <p><strong>Email:</strong> ${leadData.email}</p>
          
          <h3>Respuestas:</h3>
          <ul>
            <li><strong>Sector:</strong> ${leadData.answers.sector || "N/A"}</li>
            <li><strong>Objetivo:</strong> ${leadData.answers.objective || "N/A"}</li>
            <li><strong>Timeline:</strong> ${leadData.answers.timeline || "N/A"}</li>
            <li><strong>Prioridad:</strong> ${leadData.answers.priority || "N/A"}</li>
          </ul>
          
          ${leadData.estimate ? `<p><strong>Estimación:</strong> €${leadData.estimate}</p>` : ""}
        </div>
      `,
    });

    console.log(`Brief email sent to ${inbox}`);
  } catch (error) {
    console.error("Error sending email:", error);
    // No lanzar error, solo loggear
  }
}

