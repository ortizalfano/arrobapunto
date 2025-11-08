import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendBriefEmail, getTransporter } from "@/lib/mailer";

// Mock nodemailer
const mockSendMail = vi.fn();
vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: mockSendMail,
    })),
  },
}));

describe("Mailer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SMTP_HOST = "smtp.example.com";
    process.env.SMTP_PORT = "587";
    process.env.SMTP_USER = "user";
    process.env.SMTP_PASS = "pass";
    process.env.BRIEF_INBOX = "contacto@example.com";
  });

  it("should send email if SMTP is configured", async () => {
    mockSendMail.mockResolvedValue({});

    await sendBriefEmail({
      name: "Test User",
      email: "test@example.com",
      answers: {
        sector: "tech",
        objective: "Build a website",
        timeline: "3-6months",
        priority: "web",
      },
      estimate: 5000,
    });

    expect(mockSendMail).toHaveBeenCalled();
  });

  it("should not send email if SMTP is not configured", async () => {
    delete process.env.SMTP_HOST;

    await sendBriefEmail({
      name: "Test User",
      email: "test@example.com",
      answers: {},
    });

    expect(mockSendMail).not.toHaveBeenCalled();
  });
});







