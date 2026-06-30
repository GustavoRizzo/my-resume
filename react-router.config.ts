import type { Config } from "@react-router/dev/config";
import { SUPPORTED_LANGS } from "./src/i18n/types";

// Page sub-paths under each language prefix ("" is the language home).
const PAGES = ["", "/about", "/expertises", "/career", "/beyond-work"] as const;

export default {
  // Keep the app inside src/ instead of the framework default app/.
  appDirectory: "src",
  // GitHub Pages serves the project under /my-resume/.
  basename: "/my-resume/",
  // No server: build static HTML and deploy to GitHub Pages.
  ssr: false,
  // Opt in early to the React Router v8 behaviours (silences the dev-server
  // future-flag warnings and keeps the upgrade to v8 a no-op).
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
  // Pre-render the redirect root plus every language × page to static HTML,
  // so crawlers get fully-rendered, per-language content without running JS.
  async prerender() {
    const paths = ["/"];
    for (const lang of SUPPORTED_LANGS) {
      for (const page of PAGES) paths.push(`/${lang}${page}`);
    }
    return paths;
  },
} satisfies Config;
