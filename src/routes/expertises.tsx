import { useLoaderData } from "react-router";
import { contentLoader, pageMeta } from "./route-helpers";
import SectionExpertisesV3 from "../components/SectionExpertisesV3/SectionExpertisesV3";

export const loader = contentLoader((content) => ({ expertises: content.expertises }));
// Re-run on client navigation so a language switch re-resolves the content.
// Defined standalone (not `= loader`) so it survives route-module splitting.
export const clientLoader = contentLoader((content) => ({ expertises: content.expertises }));
export const meta = pageMeta("expertises", "/expertises");

export default function ExpertisesRoute() {
  const { expertises } = useLoaderData<typeof loader>();
  return <SectionExpertisesV3 expertises={expertises} />;
}
