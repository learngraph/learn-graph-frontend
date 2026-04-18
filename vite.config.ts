import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": "/src",
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
