// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

/**
 * Static output, same shape as fp-landing. `format: "file"` writes
 * `about.html` for `/about`; the Cloudflare assets layer serves it at `/about`.
 * Alchemy deploys `dist/` with `Cloudflare.Website.StaticSite` (alchemy.run.ts).
 */
export default defineConfig({
  output: "static",
  site: "https://citata.ai",
  trailingSlash: "never",
  build: {
    format: "file",
    inlineStylesheets: "always",
  },
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
