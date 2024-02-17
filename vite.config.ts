import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": "/src",
    },
  },
  server: {
    // TODO(skep): dev-only config, not for production!
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
