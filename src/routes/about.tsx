import { useLoaderData } from "react-router";
import { contentLoader, pageMeta } from "./route-helpers";
import WhoAmI from "../components/WhoAmI/WhoAmI";

export const loader = contentLoader((content) => ({ about: content.about }));
// Re-run on client navigation so a language switch re-resolves the content.
// Defined standalone (not `= loader`) so it survives route-module splitting.
export const clientLoader = contentLoader((content) => ({ about: content.about }));
export const meta = pageMeta("about", "/about");

export default function AboutRoute() {
  const { about } = useLoaderData<typeof loader>();
  return <WhoAmI {...about} />;
}
