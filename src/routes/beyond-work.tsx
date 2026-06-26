import { useLoaderData } from "react-router";
import { contentLoader, pageMeta } from "./route-helpers";
import SectionBeyondWork from "../components/SectionBeyondWork/SectionBeyondWork";

export const loader = contentLoader((content) => ({ hobbies: content.hobbies }));
// Re-run on client navigation so a language switch re-resolves the content.
// Defined standalone (not `= loader`) so it survives route-module splitting.
export const clientLoader = contentLoader((content) => ({ hobbies: content.hobbies }));
export const meta = pageMeta("beyondWork", "/beyond-work");

export default function BeyondWorkRoute() {
  const { hobbies } = useLoaderData<typeof loader>();
  return <SectionBeyondWork hobbies={hobbies} />;
}
