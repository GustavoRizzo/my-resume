import { createInstance, type i18n as I18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANG, type Lang } from "./types";
import enUi from "../locales/en/ui.json";
import ptUi from "../locales/pt/ui.json";

// UI strings (labels, titles, aria-labels) live here as i18next resources.
// Long-form content (about/experiences/expertises/hobbies) is NOT here — it is
// loaded per-language via route loaders (see src/data/content).
const RESOURCES = {
  en: { ui: enUi },
  pt: { ui: ptUi },
} as const;

// One fixed instance per language. Avoids mutating a shared singleton with
// changeLanguage(), which is unsafe during static prerendering. Resources are
// inline, so init is synchronous (initImmediate: false).
const instances: Partial<Record<Lang, I18nInstance>> = {};

export function getI18n(lang: Lang): I18nInstance {
  const existing = instances[lang];
  if (existing) return existing;

  const instance = createInstance();
  instance.use(initReactI18next).init({
    resources: RESOURCES,
    lng: lang,
    fallbackLng: DEFAULT_LANG,
    defaultNS: "ui",
    interpolation: { escapeValue: false },
    // Synchronous init — resources are inline, so no async load is needed.
    // Required for correct rendering during static prerendering.
    initAsync: false,
  });
  instances[lang] = instance;
  return instance;
}
