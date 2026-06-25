import { SUPPORTED_LANGS, type Lang } from "./types";

// Canonical site origin (GitHub Pages project page).
const SITE = "https://gustavorizzo.github.io/my-resume";
const OG_IMAGE = `${SITE}/perfil.png`;
const AUTHOR = "Gustavo Rizzo S. M. de Albuquerque";

export type PageKey = "home" | "about" | "expertises" | "career" | "beyondWork";

// Per-language, per-page <title>/description. Kept here (not in i18next) because
// meta() runs outside React and has no access to the t() hook.
const SEO: Record<Lang, Record<PageKey, { title: string; description: string }>> = {
  en: {
    home: {
      title: "Gustavo Rizzo — Software Developer",
      description:
        "Resume of Gustavo Rizzo — Software Developer, Data Analyst and Project Manager. Backend, frontend, data and cloud experience.",
    },
    about: {
      title: "About — Gustavo Rizzo",
      description: "Who is Gustavo Rizzo — Software Developer, Data Analyst and Project Manager.",
    },
    expertises: {
      title: "Expertise — Gustavo Rizzo",
      description: "Gustavo Rizzo's expertise: software development, data analysis and project management.",
    },
    career: {
      title: "Career — Gustavo Rizzo",
      description: "Gustavo Rizzo's career timeline across software, data and the financial market.",
    },
    beyondWork: {
      title: "Beyond Work — Gustavo Rizzo",
      description: "What Gustavo Rizzo gets up to away from the keyboard — hobbies and side projects.",
    },
  },
  pt: {
    home: {
      title: "Gustavo Rizzo — Desenvolvedor de Software",
      description:
        "Currículo de Gustavo Rizzo — Desenvolvedor de Software, Analista de Dados e Gerente de Projetos. Experiência em backend, frontend, dados e cloud.",
    },
    about: {
      title: "Sobre — Gustavo Rizzo",
      description: "Quem é Gustavo Rizzo — Desenvolvedor de Software, Analista de Dados e Gerente de Projetos.",
    },
    expertises: {
      title: "Especialidades — Gustavo Rizzo",
      description: "As especialidades de Gustavo Rizzo: desenvolvimento de software, análise de dados e gestão de projetos.",
    },
    career: {
      title: "Carreira — Gustavo Rizzo",
      description: "A trajetória de carreira de Gustavo Rizzo em software, dados e mercado financeiro.",
    },
    beyondWork: {
      title: "Além do Trabalho — Gustavo Rizzo",
      description: "O que Gustavo Rizzo faz longe do teclado — hobbies e projetos paralelos.",
    },
  },
};

// Build the full meta descriptor list for a route: title, description, Open
// Graph, Twitter, canonical and hreflang alternates (en/pt/x-default).
export function buildPageMeta(lang: Lang, page: PageKey, path: string) {
  const { title, description } = SEO[lang][page];
  const url = `${SITE}/${lang}${path}`;

  return [
    { title },
    { name: "description", content: description },
    { name: "author", content: AUTHOR },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: OG_IMAGE },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: OG_IMAGE },
    { tagName: "link", rel: "canonical", href: url },
    ...SUPPORTED_LANGS.map((l) => ({
      tagName: "link",
      rel: "alternate",
      hrefLang: l,
      href: `${SITE}/${l}${path}`,
    })),
    { tagName: "link", rel: "alternate", hrefLang: "x-default", href: `${SITE}/en${path}` },
  ];
}
