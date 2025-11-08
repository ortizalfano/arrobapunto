import { describe, it, expect } from "vitest";

describe("Accessibility", () => {
  it("should have semantic HTML structure", () => {
    // Check for main landmarks
    expect(document.querySelector("main")).toBeTruthy();
    expect(document.querySelector("nav")).toBeTruthy();
    expect(document.querySelector("footer")).toBeTruthy();
  });

  it("should have proper heading hierarchy", () => {
    const h1 = document.querySelector("h1");
    expect(h1).toBeTruthy();
    expect(h1?.textContent).toBeTruthy();
  });

  it("should have accessible buttons", () => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      expect(button.getAttribute("aria-label") || button.textContent).toBeTruthy();
    });
  });

  it("should have accessible links", () => {
    const links = document.querySelectorAll("a[href]");
    links.forEach((link) => {
      expect(link.getAttribute("aria-label") || link.textContent).toBeTruthy();
    });
  });

  it("should have alt text on images", () => {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      const alt = img.getAttribute("alt");
      expect(alt).toBeTruthy();
    });
  });
});







