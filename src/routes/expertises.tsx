import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { resolveLangParam } from "../i18n/resolveLang";
import { getContent } from "../i18n/content";
import { buildPageMeta } from "../i18n/seo";
import type { Lang } from "../i18n/types";
import type { Expertise } from "../types/Expertise";
import SectionExpertisesV3 from "../components/SectionExpertisesV3/SectionExpertisesV3";

export function loader({ params }: LoaderFunctionArgs) {
  const lang = resolveLangParam(params.lang);
  return { expertises: getContent(lang).expertises };
}

export function meta({ params }: { params: { lang?: string } }) {
  return buildPageMeta(params.lang as Lang, "expertises", "/expertises");
}

export default function ExpertisesRoute() {
  const { expertises } = useLoaderData() as { expertises: Expertise[] };
  return <SectionExpertisesV3 expertises={expertises} />;
}
