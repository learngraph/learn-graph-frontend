import { describe, expect, it } from "vitest";
import { graphPaletteForHue, normalizeHue, parseHue } from "./graphPalette";

describe("graph colour spectrum", () => {
  it("normalizes URL hue values", () => {
    expect(normalizeHue(360)).toBe(0);
    expect(normalizeHue(-30)).toBe(330);
    expect(parseHue("200.5")).toBe(200.5);
    expect(parseHue("not-a-colour")).toBeUndefined();
  });

  it("keeps the complete spectrum inside displayable RGB", () => {
    for (let hue = 0; hue < 360; hue += 5) {
      const palette = graphPaletteForHue(hue);
      [palette.accentRgb, palette.ambientRgb, palette.backgroundRgb].forEach(
        (rgb) => {
          const channels = rgb.split(" ").map(Number);
          expect(channels).toHaveLength(3);
          channels.forEach((channel) => {
            expect(channel).toBeGreaterThanOrEqual(0);
            expect(channel).toBeLessThanOrEqual(255);
          });
        },
      );
    }
  });
});
