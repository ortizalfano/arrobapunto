import { prisma } from "./prisma";

export async function checkRateLimit(
  ipAddress: string,
  limit: number = 10,
  windowMinutes: number = 60
): Promise<{ allowed: boolean; remaining: number }> {
  const cutoff = new Date(Date.now() - windowMinutes * 60 * 1000);

  const count = await prisma.link.count({
    where: {
      ipAddress,
      createdAt: {
        gte: cutoff,
      },
    },
  });

  return {
    allowed: count < limit,
    remaining: Math.max(0, limit - count),
  };
}







