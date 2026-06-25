import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { resolveLangParam } from "../i18n/resolveLang";
import { getContent } from "../i18n/content";
import { buildPageMeta } from "../i18n/seo";
import { LOCALE_BY_LANG, type Lang } from "../i18n/types";
import type { Experience } from "../types/Experience";
import CareerSection from "../components/CareerSection/CareerSection";

export function loader({ params }: LoaderFunctionArgs) {
  const lang = resolveLangParam(params.lang);
  return { lang, experiences: getContent(lang).experiences };
}

export function meta({ params }: { params: { lang?: string } }) {
  return buildPageMeta(params.lang as Lang, "career", "/career");
}

export default function CareerRoute() {
  const { lang, experiences } = useLoaderData() as { lang: Lang; experiences: Experience[] };
  return <CareerSection experiences={experiences} locale={LOCALE_BY_LANG[lang]} />;
}
