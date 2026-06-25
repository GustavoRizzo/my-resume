import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { resolveLangParam } from "../i18n/resolveLang";
import { getContent, type SiteContent } from "../i18n/content";
import { LOCALE_BY_LANG, type Lang } from "../i18n/types";
import { buildPageMeta } from "../i18n/seo";
import WhoAmI from "../components/WhoAmI/WhoAmI";
import SectionExpertisesV3 from "../components/SectionExpertisesV3/SectionExpertisesV3";
import CareerSection from "../components/CareerSection/CareerSection";
import SectionBeyondWork from "../components/SectionBeyondWork/SectionBeyondWork";

export function loader({ params }: LoaderFunctionArgs) {
  const lang = resolveLangParam(params.lang);
  return { lang, content: getContent(lang) };
}

export function meta({ params }: { params: { lang?: string } }) {
  return buildPageMeta(params.lang as Lang, "home", "");
}

// One-page résumé: every section stacked, the site's main entry per language.
export default function LangHome() {
  const { lang, content } = useLoaderData() as { lang: Lang; content: SiteContent };

  return (
    <main style={{ padding: "0 1rem" }}>
      <WhoAmI {...content.about} />
      <SectionExpertisesV3 expertises={content.expertises} />
      <CareerSection experiences={content.experiences} locale={LOCALE_BY_LANG[lang]} />
      <SectionBeyondWork hobbies={content.hobbies} />
    </main>
  );
}
