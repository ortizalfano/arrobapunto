import { describe, it, expect } from "vitest";
import { slugify, formatCurrency, cn } from "@/lib/utils";

describe("Utils", () => {
  describe("slugify", () => {
    it("should convert string to slug", () => {
      expect(slugify("Hello World")).toBe("hello-world");
      expect(slugify("Tech & Startups")).toBe("tech-startups");
      expect(slugify("Año 2024")).toBe("ao-2024");
    });

    it("should handle special characters", () => {
      expect(slugify("Hello, World!")).toBe("hello-world");
      expect(slugify("Test@#$%")).toBe("test");
    });
  });

  describe("formatCurrency", () => {
    it("should format currency in EUR by default", () => {
      expect(formatCurrency(1000, "es")).toBe("€1.000");
      expect(formatCurrency(50000)).toBe("€50.000");
    });

    it("should format currency in USD for en locale", () => {
      expect(formatCurrency(1000, "en")).toBe("$1,000");
    });
  });

  describe("cn", () => {
    it("should merge class names", () => {
      expect(cn("foo", "bar")).toBe("foo bar");
      expect(cn("foo", undefined, "bar")).toBe("foo bar");
    });

    it("should handle conditional classes", () => {
      expect(cn("foo", true && "bar", false && "baz")).toBe("foo bar");
    });
  });
});














