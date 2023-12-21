// --------------------- XXX: FILE UNUSED ------------------------------
import type { Config } from "jest";
// not sure if this is possible
import createJestConfig from "react-scripts/scripts/utils/createJestConfig";
import path from "path";
import paths from "react-scripts/config/paths";

let config: Config = createJestConfig(
  (relativePath) => path.resolve(__dirname, "..", relativePath),
  path.resolve(paths.appSrc, ".."),
  false,
);
// FIXME: this is what we need, but CRA does not allow it?
config.transformIgnorePatterns = [
  "<rootDir>/node_modules/(?!(d3-selection|d3-zoom|d3-dispatch|d3-drag|d3-interpolate|d3-color|d3-transition|d3-timer|d3-ease|d3-array|d3-force-3d|d3-quadtree|d3-scale|d3-format|d3-time|internmap))",
  //'<rootDir>/node_modules/(?!(d3-.*|internmap))',
  "^.+\\.module\\.(css|sass|scss)$",
];

export default config;
// --------------------- XXX: FILE UNUSED ------------------------------
