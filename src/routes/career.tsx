import { useLoaderData } from "react-router";
import { contentLoader, pageMeta } from "./route-helpers";
import { LOCALE_BY_LANG } from "../i18n/types";
import CareerSection from "../components/CareerSection/CareerSection";

export const loader = contentLoader((content, lang) => ({
  lang,
  experiences: content.experiences,
}));
export const meta = pageMeta("career", "/career");

export default function CareerRoute() {
  const { lang, experiences } = useLoaderData<typeof loader>();
  return <CareerSection experiences={experiences} locale={LOCALE_BY_LANG[lang]} />;
}
