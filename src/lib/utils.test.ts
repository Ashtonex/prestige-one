import { describe, it, expect } from "vitest";
import { formatMZN, formatDate, cn } from "./utils";

describe("Utility functions", () => {
  it("formats MZN currency correctly", () => {
    const formatted = formatMZN(45000);
    expect(formatted).toContain("45");
    expect(formatted).toContain("000");
  });

  it("formats dates into British/Mozambican formal standard", () => {
    const formatted = formatDate("2026-05-14T00:00:00.000Z");
    expect(formatted).toContain("May");
    expect(formatted).toContain("2026");
  });

  it("merges class names cleanly with cn()", () => {
    expect(cn("px-4 py-2", "px-6")).toBe("py-2 px-6");
  });
});
