import { redirect } from "react-router";
import { DEFAULT_LANG, isLang, type Lang } from "./types";

// Old capitalized single-segment routes → new lowercase page sub-paths.
// Lets existing/shared links keep working after the i18n migration.
const LEGACY_PATHS: Record<string, string> = {
  about: "/about",
  careertimeline: "/career",
  listexpertises: "/expertises",
  beyondwork: "/beyond-work",
};

// Validate the :lang route param in one place. Returns the language when valid;
// redirects legacy paths to their new home; otherwise throws a 404 response.
export function resolveLangParam(param: string | undefined): Lang {
  if (isLang(param)) return param;

  const legacy = param ? LEGACY_PATHS[param.toLowerCase()] : undefined;
  if (legacy) throw redirect(`/${DEFAULT_LANG}${legacy}`);

  throw new Response("Not Found", { status: 404 });
}

// Pick the initial language for the bare "/" entry (client-side only).
export function detectClientLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;
  const stored = window.localStorage.getItem("resume.lang");
  if (isLang(stored)) return stored;
  const nav = window.navigator.language?.toLowerCase() ?? "";
  return nav.startsWith("pt") ? "pt" : DEFAULT_LANG;
}
