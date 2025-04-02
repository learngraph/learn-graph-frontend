import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@src": "/src",
    },
  },
  server: {
    proxy: {
      "/graphql": {
        target: "http://backend:8080/query",
        rewrite: (path) => path.replace(/^\/graphql/, ""),
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
