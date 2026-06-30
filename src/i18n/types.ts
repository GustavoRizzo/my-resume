// Single source of truth for the languages the site supports. Everything that
// needs the language list (route prerender, URL prefix matching, the selector)
// derives from here — don't hardcode "en"/"pt" elsewhere.
export const SUPPORTED_LANGS = ["en", "pt"] as const;

export type Lang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (SUPPORTED_LANGS as readonly string[]).includes(value);
}

// Matches a leading "/<lang>" URL segment (e.g. "/en", "/pt"), used to strip or
// swap the language prefix while keeping the rest of the path.
export const LANG_PREFIX_RE = new RegExp(`^/(${SUPPORTED_LANGS.join("|")})(?=/|$)`);

// BCP-47 locale used for date/number formatting per language.
export const LOCALE_BY_LANG: Record<Lang, string> = {
  en: "en-US",
  pt: "pt-BR",
};
