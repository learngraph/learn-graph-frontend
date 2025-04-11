import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import Sitemap from "vite-plugin-sitemap";

/* Update sitemap.xml:
```sh
grep -o '"/[^"]*"' src/LearngraphOrgRoutes.tsx| sed -e 's,.*"/\([^"]*\)".*,\t"/\1"\,,g'|grep -v :
```
*/
const sites = [
  "/university",
  "/nations",
  "/industry",
  "/ecosystem",
  "/k-12",
  "/contact",
  "/contact-us",
  "/impact",
  "/wirkung",
  "/über-uns",
  "/about",
  "/imprint",
  "/impressum",
  "/terms-of-use",
  "/privacy-policy",
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), Sitemap({ dynamicRoutes: sites })],
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
