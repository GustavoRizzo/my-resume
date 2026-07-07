<div align="center">

# 👋 Gustavo Rizzo — Resume

My personal resume as a website: fast, responsive, and always up to date.

### 🔗 **[View the live resume →](https://gustavorizzo.github.io/my-resume/)**

</div>

---

## 📖 About the project

This repository holds the source code of my resume website — a bilingual
(English / Portuguese) site built with **Astro** and fully **pre-rendered to
static HTML**, hosted for free on GitHub Pages and published automatically on
every update to the `main` branch. The few interactive pieces (profile-photo
easter egg, hobby modal) hydrate as small React islands.

Each language gets its own URL prefix (`/en/…`, `/pt/…`), and every page is
pre-rendered at build time so crawlers and no-JS visitors get fully-rendered,
per-language content with proper `<title>`, descriptions and `hreflang` tags.

All content (experiences, skills, about me) lives under
[`src/content/`](src/content/) as typed content collections (the build fails if
the content drifts from the schema), one entry per language, kept separate from
the presentation layer. Short UI strings live in [`src/locales/`](src/locales/).

## 🛠️ Stack

| Layer        | Technologies                                            |
| ------------ | ------------------------------------------------------- |
| **Core**     | Astro 7 (SSG) · TypeScript · React 19 islands            |
| **Build**    | Astro/Vite · content collections (Zod) · `astro check`   |
| **i18n**     | Route-based (`/en`, `/pt`) · zero-dependency `t()` helper |
| **Styling**  | SCSS (Sass)                                             |
| **Testing**  | Vitest · Testing Library · jsdom                        |
| **Quality**  | ESLint · typescript-eslint                              |
| **Security** | DOMPurify (HTML sanitization)                           |
| **Deploy**   | GitHub Actions → GitHub Pages                           |

## 🚀 Running locally

Prerequisite: **Node.js 24+**.

```shell
npm install      # install dependencies
npm run dev      # start the development server
```

## 🧪 Useful scripts

```shell
npm run build      # astro check (types) + static build to dist/
npm run preview    # serve the built site locally
npm test           # run the test suite (Vitest)
npm run lint       # check the code with ESLint
npm run lint:fix   # automatically fix what's possible
```

## 📦 Deploy

Deployment is automatic: the [workflow](.github/workflows/deploy.yml) runs lint, tests,
and build on every push to `main`, publishing `dist/` to GitHub Pages.

The build pre-renders every language × page to a real static HTML file under
the `/my-resume/` sub-path, so deep links and refreshes just work — no SPA
redirect tricks needed.

> **Gotcha:** Astro's `import.meta.env.BASE_URL` has **no trailing slash**
> (`/my-resume`). Any URL built from it must go through
> [`src/utils/withBase.ts`](src/utils/withBase.ts) — never concatenate by hand.
