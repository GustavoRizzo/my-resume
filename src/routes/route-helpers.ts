import type { LoaderFunctionArgs } from "react-router";
import { resolveLangParam } from "../i18n/resolveLang";
import { getContent, type SiteContent } from "../i18n/content";
import { buildPageMeta, type PageKey } from "../i18n/seo";
import type { Lang } from "../i18n/types";

// Shared plumbing for the per-language page routes. Each route previously
// repeated the same resolveLangParam + getContent + buildPageMeta dance; these
// helpers keep that in one place so a route only declares which slice of the
// content it needs and which SEO page it is.

// Builds a route `meta` that validates the :lang param the same way the loader
// does (throwing the 404/redirect for bad values) before producing SEO tags,
// instead of the unchecked `params.lang as Lang` cast each route used to do.
export function pageMeta(page: PageKey, path: string) {
  return ({ params }: { params: { lang?: string } }) =>
    buildPageMeta(resolveLangParam(params.lang), page, path);
}

// Builds a route `loader` that resolves and validates the language once, then
// lets the route pick the slice of localized content it renders.
export function contentLoader<T>(select: (content: SiteContent, lang: Lang) => T) {
  return ({ params }: LoaderFunctionArgs): T => {
    const lang = resolveLangParam(params.lang);
    return select(getContent(lang), lang);
  };
}
