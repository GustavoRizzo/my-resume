import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { resolveLangParam } from "../i18n/resolveLang";
import { getContent } from "../i18n/content";
import { buildPageMeta } from "../i18n/seo";
import type { Lang } from "../i18n/types";
import type { About } from "../types/About";
import WhoAmI from "../components/WhoAmI/WhoAmI";

export function loader({ params }: LoaderFunctionArgs) {
  const lang = resolveLangParam(params.lang);
  return { about: getContent(lang).about };
}

export function meta({ params }: { params: { lang?: string } }) {
  return buildPageMeta(params.lang as Lang, "about", "/about");
}

export default function AboutRoute() {
  const { about } = useLoaderData() as { about: About };
  return <WhoAmI {...about} />;
}
