import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { resolveLangParam } from "../i18n/resolveLang";
import { getContent } from "../i18n/content";
import { buildPageMeta } from "../i18n/seo";
import type { Lang } from "../i18n/types";
import type { HobbiesData } from "../types/Hobby";
import SectionBeyondWork from "../components/SectionBeyondWork/SectionBeyondWork";

export function loader({ params }: LoaderFunctionArgs) {
  const lang = resolveLangParam(params.lang);
  return { hobbies: getContent(lang).hobbies };
}

export function meta({ params }: { params: { lang?: string } }) {
  return buildPageMeta(params.lang as Lang, "beyondWork", "/beyond-work");
}

export default function BeyondWorkRoute() {
  const { hobbies } = useLoaderData() as { hobbies: HobbiesData };
  return <SectionBeyondWork hobbies={hobbies} />;
}
