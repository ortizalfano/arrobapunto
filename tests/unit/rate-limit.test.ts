import { describe, it, expect, beforeEach } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

// Mock Prisma
vi.mock("@/lib/prisma", () => ({
  prisma: {
    link: {
      count: vi.fn(),
    },
  },
}));

describe("Rate Limiting", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should allow requests under limit", async () => {
    const { prisma } = await import("@/lib/prisma");
    prisma.link.count = vi.fn().mockResolvedValue(5);

    const result = await checkRateLimit("192.168.1.1", 10, 60);
    expect(result.allowed).toBe(true);
  });

  it("should block requests over limit", async () => {
    const { prisma } = await import("@/lib/prisma");
    prisma.link.count = vi.fn().mockResolvedValue(15);

    const result = await checkRateLimit("192.168.1.1", 10, 60);
    expect(result.allowed).toBe(false);
  });
});







