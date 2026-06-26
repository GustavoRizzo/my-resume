import { useLoaderData } from "react-router";
import { contentLoader, pageMeta } from "./route-helpers";
import { LOCALE_BY_LANG } from "../i18n/types";
import WhoAmI from "../components/WhoAmI/WhoAmI";
import SectionExpertisesV3 from "../components/SectionExpertisesV3/SectionExpertisesV3";
import CareerSection from "../components/CareerSection/CareerSection";
import SectionBeyondWork from "../components/SectionBeyondWork/SectionBeyondWork";

export const loader = contentLoader((content, lang) => ({ lang, content }));
export const meta = pageMeta("home", "");

// One-page résumé: every section stacked, the site's main entry per language.
export default function LangHome() {
  const { lang, content } = useLoaderData<typeof loader>();

  return (
    <main style={{ padding: "0 1rem" }}>
      <WhoAmI {...content.about} />
      <SectionExpertisesV3 expertises={content.expertises} />
      <CareerSection experiences={content.experiences} locale={LOCALE_BY_LANG[lang]} />
      <SectionBeyondWork hobbies={content.hobbies} />
    </main>
  );
}
