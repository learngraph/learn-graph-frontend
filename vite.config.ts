import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


// TODO: currently not used, but we should have a sitemap!
/* Update sitemap.xml:
```sh
grep -o '"/[^"]*"' src/LearngraphOrgRoutes.tsx| sed -e 's,.*"/\([^"]*\)".*,\t"/\1"\,,g'|grep -v :
```
*/
// TODO: this list is outdated!
const _sites = [
  "/university",
  "/nations",
  "/enterprise",
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
