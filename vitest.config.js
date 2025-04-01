// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": "/src",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    // If needed, add a setup file for custom global mocks
    setupFiles: "./src/setupTests.ts",
  },
});
