// Single source of truth for the languages the site supports.
// Keep in sync with the LANGS list in react-router.config.ts.
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
