import { z } from "zod";

export const linkSchema = z.object({
  url: z.string().url("Invalid URL"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens").optional(),
});

export const briefSchema = z.object({
  sector: z.enum(["tech", "retail", "services", "nonprofit", "other"]),
  objective: z.string().min(10, "Please provide more details"),
  timeline: z.enum(["urgent", "1-3months", "3-6months", "flexible"]),
  priority: z.enum(["brand", "web", "performance"]),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
});

export type BriefFormData = z.infer<typeof briefSchema>;
export type LinkFormData = z.infer<typeof linkSchema>;















