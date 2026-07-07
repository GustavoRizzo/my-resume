import en from "../locales/en/ui.json";
import pt from "../locales/pt/ui.json";

// Single source of truth for the languages the site supports. Everything that
// needs the language list (getStaticPaths, the selector, locales) derives from
// here — don't hardcode "en"/"pt" elsewhere.
export const SUPPORTED_LANGS = ["en", "pt"] as const;

export type Lang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (SUPPORTED_LANGS as readonly string[]).includes(value);
}

// BCP-47 locale used for date/number formatting per language.
export const LOCALE_BY_LANG: Record<Lang, string> = {
  en: "en-US",
  pt: "pt-BR",
};

const UI: Record<Lang, unknown> = { en, pt };

/**
 * Looks up a UI string by dot-path (e.g. `t("en", "nav.about")`), with
 * `{{var}}` interpolation. Throws on missing keys so a typo fails the build
 * (every call runs at prerender time) instead of rendering a blank label.
 */
export function t(lang: Lang, key: string, vars?: Record<string, string>): string {
  let node: unknown = UI[lang];
  for (const part of key.split(".")) {
    if (typeof node !== "object" || node === null || !(part in node)) {
      throw new Error(`Missing UI string "${key}" for lang "${lang}"`);
    }
    node = (node as Record<string, unknown>)[part];
  }
  if (typeof node !== "string") {
    throw new Error(`UI key "${key}" for lang "${lang}" is not a string`);
  }
  return node.replace(/\{\{(\w+)\}\}/g, (_, name: string) => vars?.[name] ?? `{{${name}}}`);
}

/** Swaps the language prefix of a site path, keeping the rest (and the base). */
export function switchLangPath(pathname: string, next: Lang): string {
  const re = new RegExp(`/(${SUPPORTED_LANGS.join("|")})(?=/|$)`);
  return re.test(pathname) ? pathname.replace(re, `/${next}`) : pathname;
}
