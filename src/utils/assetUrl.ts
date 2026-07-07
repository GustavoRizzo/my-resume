/**
 * Resolves a content image path against the Vite BASE_URL (`/my-resume/` on
 * GitHub Pages). Content JSON stores paths relative to the public/ root;
 * without this prefix they resolve against the current page URL, which breaks
 * on nested routes like `/my-resume/en/`. Absolute URLs pass through untouched.
 */
export function assetUrl(path: string): string {
  if (/^(https?:)?\/\//.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}
