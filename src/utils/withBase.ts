// Astro's BASE_URL is "/my-resume" — WITHOUT a trailing slash (unlike plain
// Vite). Every URL built by concatenation must go through here so we never
// ship a "/my-resumept/"-style path again.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Prefixes a public/route path with the site base: withBase("en/") → "/my-resume/en/". */
export function withBase(path: string): string {
  return `${BASE}/${path.replace(/^\//, "")}`;
}
