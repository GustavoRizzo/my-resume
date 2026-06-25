import type { Lang } from "./types";
import type { About } from "../types/About";
import type { Expertise } from "../types/Expertise";
import type { Experience } from "../types/Experience";
import type { HobbiesData } from "../types/Hobby";

import enContent from "../data/content/en.json";
import ptContent from "../data/content/pt.json";
import enHobbies from "../data/hobbies/en.json";
import ptHobbies from "../data/hobbies/pt.json";

// The full localized content bundle a page loader hands to its components.
export type SiteContent = {
  about: About;
  expertises: Expertise[];
  experiences: Experience[];
  hobbies: HobbiesData;
};

const CONTENT: Record<Lang, SiteContent> = {
  en: { ...(enContent as unknown as Omit<SiteContent, "hobbies">), hobbies: enHobbies as HobbiesData },
  pt: { ...(ptContent as unknown as Omit<SiteContent, "hobbies">), hobbies: ptHobbies as HobbiesData },
};

// Single entry point for localized content. Route loaders call this; components
// never import data JSON directly.
export function getContent(lang: Lang): SiteContent {
  return CONTENT[lang];
}
