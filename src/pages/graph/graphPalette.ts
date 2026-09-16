export const DEFAULT_GRAPH_HUE = 121.78;
export const BLUE_GRAPH_HUE = 200.99;

interface LinearRgb {
  r: number;
  g: number;
  b: number;
}

export interface GraphPalette {
  accentRgb: string;
  ambientRgb: string;
  backgroundRgb: string;
  ambientAlpha: string;
}

const lightnessStops = [
  [0, 0.66],
  [20, 0.68],
  [40, 0.72],
  [60, 0.76],
  [80, 0.84],
  [95, 0.9],
  [108, 0.96],
  [120, 0.937],
  [150, 0.87],
  [180, 0.89],
  [210, 0.87],
  [240, 0.8],
  [270, 0.77],
  [285, 0.72],
  [300, 0.7],
  [330, 0.7],
  [350, 0.67],
  [360, 0.66],
] as const;

export function normalizeHue(value: number) {
  return ((value % 360) + 360) % 360;
}

export function parseHue(value: string | null) {
  if (value === null || value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? normalizeHue(parsed) : undefined;
}

function lightnessForHue(hue: number) {
  const normalized = normalizeHue(hue);
  const upperIndex = lightnessStops.findIndex(([stop]) => stop >= normalized);
  const upper = lightnessStops[Math.max(upperIndex, 1)];
  const lower = lightnessStops[Math.max(upperIndex - 1, 0)];
  const progress = (normalized - lower[0]) / (upper[0] - lower[0]);
  return lower[1] + (upper[1] - lower[1]) * progress;
}

function oklchToLinearRgb(
  lightness: number,
  chroma: number,
  hue: number,
): LinearRgb {
  const radians = (normalizeHue(hue) * Math.PI) / 180;
  const a = chroma * Math.cos(radians);
  const b = chroma * Math.sin(radians);
  const lRoot = lightness + 0.3963377774 * a + 0.2158037573 * b;
  const mRoot = lightness - 0.1055613458 * a - 0.0638541728 * b;
  const sRoot = lightness - 0.0894841775 * a - 1.291485548 * b;
  const l = lRoot ** 3;
  const m = mRoot ** 3;
  const s = sRoot ** 3;

  return {
    r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  };
}

function isInGamut({ r, g, b }: LinearRgb) {
  return [r, g, b].every((channel) => channel >= 0 && channel <= 1);
}

function maximumChroma(lightness: number, hue: number, ceiling = 0.35) {
  let low = 0;
  let high = ceiling;

  for (let iteration = 0; iteration < 18; iteration += 1) {
    const candidate = (low + high) / 2;
    if (isInGamut(oklchToLinearRgb(lightness, candidate, hue))) {
      low = candidate;
    } else {
      high = candidate;
    }
  }

  return low;
}

function linearChannelToSrgb(channel: number) {
  const bounded = Math.min(1, Math.max(0, channel));
  return bounded <= 0.0031308
    ? bounded * 12.92
    : 1.055 * bounded ** (1 / 2.4) - 0.055;
}

function rgbChannels(lightness: number, chroma: number, hue: number) {
  const linear = oklchToLinearRgb(lightness, chroma, hue);
  return [linear.r, linear.g, linear.b]
    .map((channel) => Math.round(linearChannelToSrgb(channel) * 255))
    .join(" ");
}

function vividRgb(hue: number) {
  const normalized = normalizeHue(hue);
  const lightness = lightnessForHue(normalized);
  const gamutUse = normalized <= 120 || normalized >= 285 ? 0.995 : 0.97;
  const chroma = maximumChroma(lightness, normalized) * gamutUse;
  return rgbChannels(lightness, chroma, normalized);
}

export function graphPaletteForHue(hue: number): GraphPalette {
  const normalized = normalizeHue(hue);
  const ambientChroma = Math.min(0.075, maximumChroma(0.4, normalized) * 0.72);
  const backgroundChroma = Math.min(
    0.018,
    maximumChroma(0.14, normalized) * 0.68,
  );

  return {
    accentRgb: vividRgb(normalized),
    ambientRgb: rgbChannels(0.4, ambientChroma, normalized),
    backgroundRgb: rgbChannels(0.14, backgroundChroma, normalized),
    ambientAlpha: "0.11",
  };
}

export const greenGraphPalette: GraphPalette = {
  accentRgb: "212 255 57",
  ambientRgb: "212 255 57",
  backgroundRgb: "11 11 11",
  ambientAlpha: "0.055",
};

export const blueGraphPalette: GraphPalette = {
  accentRgb: "103 246 255",
  ambientRgb: "42 78 108",
  backgroundRgb: "8 10 17",
  ambientAlpha: "0.14",
};
