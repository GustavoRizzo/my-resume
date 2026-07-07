// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// GitHub Pages project site: everything is served under /my-resume/.
export default defineConfig({
  site: "https://gustavorizzo.github.io",
  base: "/my-resume",
  integrations: [react(), sitemap()],
});
