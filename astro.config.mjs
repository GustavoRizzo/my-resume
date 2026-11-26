// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import {
  DEFAULT_CANONICAL_TARGET,
  DEFAULT_DEPLOY_TARGET,
  resolveTarget,
  siteUrl,
} from "./deploy-targets.mjs";

// One build per host (see deploy-targets.mjs). Default = GitHub Pages, so
// `npm run dev`/`build` keep serving under /my-resume/ as before.
const target = resolveTarget(process.env.DEPLOY_TARGET, DEFAULT_DEPLOY_TARGET);
const canonical = resolveTarget(process.env.CANONICAL_TARGET, DEFAULT_CANONICAL_TARGET);

export default defineConfig({
  site: target.site,
  base: target.base,
  integrations: [react(), sitemap()],
  vite: {
    define: {
      // Read by src/i18n/seo.ts for canonical/hreflang URLs.
      __CANONICAL_SITE__: JSON.stringify(siteUrl(canonical)),
    },
  },
});
