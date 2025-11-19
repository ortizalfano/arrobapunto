import "@testing-library/jest-dom";
import { expect, afterEach, vi } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: vi.fn(),
      replace: vi.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

afterEach(() => {
  vi.clearAllMocks();
});














