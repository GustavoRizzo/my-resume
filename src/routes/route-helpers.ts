import { resolveLangParam } from "../i18n/resolveLang";
import { getContent, type SiteContent } from "../i18n/content";
import { buildPageMeta, type PageKey } from "../i18n/seo";
import type { Lang } from "../i18n/types";

// Shared plumbing for the per-language page routes. Each route previously
// repeated the same resolveLangParam + getContent + buildPageMeta dance; these
// helpers keep that in one place so a route only declares which slice of the
// content it needs and which SEO page it is.

// Only the :lang route param is read; type the args loosely so the same factory
// output can be used as both `loader` (build-time prerender) and `clientLoader`
// (client-side navigation).
type RouteArgs = { params: { lang?: string } };

// Builds a route `meta` that validates the :lang param the same way the loader
// does (throwing the 404/redirect for bad values) before producing SEO tags,
// instead of the unchecked `params.lang as Lang` cast each route used to do.
export function pageMeta(page: PageKey, path: string) {
  return ({ params }: RouteArgs) =>
    buildPageMeta(resolveLangParam(params.lang), page, path);
}

// Builds a content resolver used as BOTH `loader` and `clientLoader`. The
// server `loader` feeds the build-time prerender (SEO / no-JS); the
// `clientLoader` re-runs on every client navigation so switching language
// re-resolves the content for the new :lang — without it, the SPA serves the
// previous language's prerendered `.data` and dynamic content goes stale.
export function contentLoader<T>(select: (content: SiteContent, lang: Lang) => T) {
  return ({ params }: RouteArgs): T => {
    const lang = resolveLangParam(params.lang);
    return select(getContent(lang), lang);
  };
}
