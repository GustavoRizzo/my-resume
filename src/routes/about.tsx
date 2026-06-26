import { useLoaderData } from "react-router";
import { contentLoader, pageMeta } from "./route-helpers";
import WhoAmI from "../components/WhoAmI/WhoAmI";

export const loader = contentLoader((content) => ({ about: content.about }));
export const meta = pageMeta("about", "/about");

export default function AboutRoute() {
  const { about } = useLoaderData<typeof loader>();
  return <WhoAmI {...about} />;
}
