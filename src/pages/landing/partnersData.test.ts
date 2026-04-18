import { describe, expect, it } from "vitest";
import { partners } from "./partnersData";

describe("partnersData", () => {
  it("exports partner logos used by the marketing home", () => {
    expect(partners.length).toBe(5);
    expect(partners.every((p) => p.logoUrl.startsWith("/partner/"))).toBe(true);
  });
});
