import { useTranslation } from "react-i18next";
import ExperiencesTimeline from "../ExperiencesTimeline/ExperiencesTimeline";
import type { Experience } from "../../types/Experience";

interface CareerSectionProps {
  experiences: Experience[];
  locale: string;
}

// Section title + timeline, shared between the one-page home and the standalone
// /career route so both render identically.
export default function CareerSection({ experiences, locale }: CareerSectionProps) {
  const { t } = useTranslation();
  return (
    <section style={{ display: "grid", justifyItems: "center", alignContent: "center" }}>
      <h1 className="section-title">{t("sections.careerTimeline")}</h1>
      <ExperiencesTimeline experiences={experiences} locale={locale} />
    </section>
  );
}
