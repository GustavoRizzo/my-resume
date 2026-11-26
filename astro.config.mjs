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
import cloudflareHeaders from "./integrations/cloudflare-headers.mjs";

// One build per host (see deploy-targets.mjs). Default = GitHub Pages, so
// `npm run dev`/`build` keep serving under /my-resume/ as before.
const targetName = process.env.DEPLOY_TARGET || DEFAULT_DEPLOY_TARGET;
const target = resolveTarget(targetName, DEFAULT_DEPLOY_TARGET);
const canonical = resolveTarget(process.env.CANONICAL_TARGET, DEFAULT_CANONICAL_TARGET);

export default defineConfig({
  site: target.site,
  base: target.base,
  // _headers (security + immutable cache for /_astro/*) only where the host
  // reads it — Cloudflare. GitHub Pages can't set response headers.
  integrations: [
    react(),
    sitemap({
      // Only the per-language home pages (the full résumé) go to search
      // engines; the per-section pages are noindex (INDEXABLE_PAGES in
      // src/i18n/seo.ts) and the "/" language redirect is noindex too.
      filter: (page) => /\/(en|pt)\/$/.test(page),
      // Adds <xhtml:link hreflang> so Google pairs /en/ and /pt/ as translations.
      i18n: { defaultLocale: "en", locales: { en: "en", pt: "pt" } },
    }),
    cloudflareHeaders({ enabled: targetName === "cloudflare" }),
  ],
  build: {
    // The site's CSS is small; inlining it removes the render-blocking
    // stylesheet requests that delayed the first paint (and the LCP photo).
    inlineStylesheets: "always",
  },
  vite: {
    define: {
      // Read by src/i18n/seo.ts for canonical/hreflang URLs.
      __CANONICAL_SITE__: JSON.stringify(siteUrl(canonical)),
    },
  },
});
