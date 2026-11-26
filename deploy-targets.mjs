// @ts-check
// The site is published to TWO independent hosts, and either may be dropped
// at any time — so each one gets its own build with its own site/base, and
// nothing in the code may hard-code an origin or base path.
//
//   DEPLOY_TARGET     which host this build is FOR (sets Astro `site`/`base`).
//   CANONICAL_TARGET  which host search engines should treat as the original
//                     (canonical/hreflang in every copy). If you abandon the
//                     canonical host, switch this to the surviving one.

/** @typedef {{ site: string; base: string }} DeployTarget */

/** @type {Record<string, DeployTarget>} */
export const TARGETS = {
  // GitHub Pages project page — served under /my-resume/.
  "gh-pages": { site: "https://gustavorizzo.github.io", base: "/my-resume" },
  // Cloudflare Workers static assets on the custom domain — served at the root.
  cloudflare: { site: "https://resume.bygus.dev", base: "/" },
};

export const DEFAULT_DEPLOY_TARGET = "gh-pages";
export const DEFAULT_CANONICAL_TARGET = "cloudflare";

/**
 * Looks a target up by name, failing the build on a typo instead of silently
 * shipping the wrong base path. An unset/empty value falls back to `fallback`.
 * @param {string | undefined} name
 * @param {string} fallback
 * @returns {DeployTarget}
 */
export function resolveTarget(name, fallback) {
  const key = name || fallback;
  const target = TARGETS[key];
  if (!target) {
    throw new Error(`Unknown deploy target "${key}". Expected one of: ${Object.keys(TARGETS).join(", ")}.`);
  }
  return target;
}

/**
 * Absolute URL of a target's site root, without a trailing slash:
 * "https://gustavorizzo.github.io/my-resume", "https://resume.bygus.dev".
 * @param {DeployTarget} target
 */
export function siteUrl({ site, base }) {
  return `${site}${base}`.replace(/\/+$/, "");
}
