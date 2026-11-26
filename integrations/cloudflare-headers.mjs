// @ts-check
// Writes dist/_headers for the Cloudflare build only. Workers static assets
// read that file to attach HTTP headers; GitHub Pages can't set headers at
// all, so the gh-pages build doesn't get one (it would just be a stray file).
import { writeFile } from "node:fs/promises";
import { URL } from "node:url";

/**
 * Contents of the `_headers` file for a site served under `base`.
 * No Content-Security-Policy on purpose: GTM/GA load arbitrary tag scripts,
 * so a CSP that doesn't break analytics wouldn't protect much — revisit if
 * GTM ever goes away.
 * @param {string} base Astro `base` ("/" or "/sub")
 */
export function buildHeaders(base) {
  const root = base.replace(/\/+$/, "");
  return `${root}/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Cross-Origin-Opener-Policy: same-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

# Vite/Astro output is content-hashed: a changed file gets a new name.
${root}/_astro/*
  Cache-Control: public, max-age=31536000, immutable
`;
}

/**
 * @param {{ enabled: boolean }} options
 * @returns {import("astro").AstroIntegration}
 */
export default function cloudflareHeaders({ enabled }) {
  let base = "/";
  return {
    name: "cloudflare-headers",
    hooks: {
      "astro:config:done": ({ config }) => {
        base = config.base;
      },
      "astro:build:done": async ({ dir, logger }) => {
        if (!enabled) return;
        await writeFile(new URL("_headers", dir), buildHeaders(base));
        logger.info("wrote _headers (Cloudflare build)");
      },
    },
  };
}
