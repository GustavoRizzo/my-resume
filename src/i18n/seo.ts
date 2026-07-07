import perfil from "../assets/perfil.png";
import { SUPPORTED_LANGS, type Lang } from "./index";

// Canonical site origin (GitHub Pages project page).
const ORIGIN = "https://gustavorizzo.github.io";
const SITE = `${ORIGIN}/my-resume`;
// perfil.src already carries the /my-resume/ base and content hash.
const OG_IMAGE = `${ORIGIN}${perfil.src}`;
export const AUTHOR = "Gustavo Rizzo S. M. de Albuquerque";

export type PageKey = "home" | "about" | "expertises" | "career" | "beyondWork";

// Per-language, per-page <title>/description (same copy as the React site).
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
      description:
        "As especialidades de Gustavo Rizzo: desenvolvimento de software, análise de dados e gestão de projetos.",
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

export function pageSeo(lang: Lang, page: PageKey, path: string) {
  const { title, description } = SEO[lang][page];
  return {
    title,
    description,
    url: `${SITE}/${lang}${path}`,
    ogImage: OG_IMAGE,
    alternates: [
      ...SUPPORTED_LANGS.map((l) => ({ hreflang: l as string, href: `${SITE}/${l}${path}` })),
      { hreflang: "x-default", href: `${SITE}/en${path}` },
    ],
  };
}
