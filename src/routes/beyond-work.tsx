import { useLoaderData } from "react-router";
import { contentLoader, pageMeta } from "./route-helpers";
import SectionBeyondWork from "../components/SectionBeyondWork/SectionBeyondWork";

export const loader = contentLoader((content) => ({ hobbies: content.hobbies }));
export const meta = pageMeta("beyondWork", "/beyond-work");

export default function BeyondWorkRoute() {
  const { hobbies } = useLoaderData<typeof loader>();
  return <SectionBeyondWork hobbies={hobbies} />;
}
