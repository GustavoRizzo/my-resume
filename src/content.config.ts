import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

// Schemas mirror the shapes the React app declared in src/types/ (see main
// branch). The build fails if a content JSON drifts from these.

const consolePhrase = z.object({
  phrase: z.string(),
  color: z.string().optional(),
});

const about = z.object({
  perfil_img: z.string(),
  name: z.string(),
  url_linkedin: z.url(),
  url_github: z.url(),
  console_phrases: z.array(consolePhrase),
});

const expertise = z.object({
  title: z.string(),
  html_text: z.string(),
  url_img: z.string(),
  underline_class_css: z.string(),
  code_tag: z.string().optional(),
  icon: z.string().optional(),
  initial_date: z.string().optional(),
});

const experience = z.object({
  title: z.string(),
  subtitle: z.string(),
  text: z.string(),
  company_logo: z.string(),
  company_url: z.url().optional(),
  initial_date: z.string(),
});

// One entry per language ("en" / "pt"), whole résumé in each.
const resume = defineCollection({
  loader: file("src/content/resume.json"),
  schema: z.object({
    about,
    expertises: z.array(expertise),
    experiences: z.array(experience),
  }),
});

const hobbyTopic = z.object({
  id: z.string(),
  emoji: z.string(),
  title: z.string(),
  summary: z.string(),
  body_html: z.string(),
  // Paths under public/, resolved with withBase() at render time.
  images: z
    .array(z.object({ src: z.string(), alt: z.string() }))
    .default([]),
  links: z.array(
    z.object({
      label: z.string(),
      url: z.url(),
      note: z.string().optional(),
    }),
  ),
});

// One entry per language, same as resume.
const hobbies = defineCollection({
  loader: file("src/content/hobbies.json"),
  schema: z.object({
    section: z.object({ title: z.string(), subtitle: z.string() }),
    topics: z.array(hobbyTopic),
  }),
});

export const collections = { resume, hobbies };
