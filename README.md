<div align="center">

# 👋 Gustavo Rizzo — Resume

My personal resume as a website: fast, responsive, and always up to date.

### 🔗 **[View the live resume →](https://gustavorizzo.github.io/my-resume/)**

</div>

---

## 📖 About the project

This repository holds the source code of my resume website — a bilingual
(English / Portuguese) site built with **Astro** and fully **pre-rendered to
static HTML**, published automatically to **GitHub Pages and Cloudflare** on
every update to the `main` branch. The first screen ships no framework at all
(the profile-photo easter egg and console animation are a few lines of vanilla
TypeScript); only the hobby modal is a React island, loaded when it scrolls
into view.

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
| **Core**     | Astro 7 (SSG) · TypeScript · React 19 island            |
| **Build**    | Astro/Vite · content collections (Zod) · `astro check`   |
| **i18n**     | Route-based (`/en`, `/pt`) · zero-dependency `t()` helper |
| **Styling**  | SCSS (Sass) · self-hosted fonts (Fontsource)            |
| **Testing**  | Vitest · Testing Library · jsdom                        |
| **Quality**  | ESLint · typescript-eslint                              |
| **Security** | DOMPurify (HTML sanitization)                           |
| **Deploy**   | GitHub Actions → GitHub Pages + Cloudflare Workers      |

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

The site is published to **two independent hosts**, and either can be switched
off at any time without affecting the other:

| Host | URL | Base path |
| --- | --- | --- |
| GitHub Pages | `https://gustavorizzo.github.io/my-resume/` | `/my-resume` |
| Cloudflare Workers (static assets) | `https://resume.bygus.dev/` | `/` |

`curriculo.bygus.dev` is a Cloudflare redirect rule pointing to the Portuguese
version (`resume.bygus.dev/pt/`).

On every push to `main`, the [workflow](.github/workflows/deploy.yml) runs lint
and tests once, then two **parallel** jobs that each build `dist/` for their
own host (`DEPLOY_TARGET`, see [`deploy-targets.mjs`](deploy-targets.mjs)) and
publish it. A failure in one never blocks the other. Both copies declare the
same canonical host (`CANONICAL_TARGET`, Cloudflare by default) so search
engines index only one of them.

```bash
npm run build:gh-pages      # dist/ for GitHub Pages
npm run build:cloudflare    # dist/ for resume.bygus.dev
npm run deploy:cloudflare   # wrangler deploy (needs Cloudflare credentials)
```

Repository settings that control the deploy (Settings → Secrets and variables → Actions):

| Name | Kind | Purpose |
| --- | --- | --- |
| `DEPLOY_GH_PAGES` | variable | `false` turns the GitHub Pages job off (on by default) |
| `DEPLOY_CLOUDFLARE` | variable | `true` turns the Cloudflare job on |
| `CANONICAL_TARGET` | variable | `cloudflare` (default) or `gh-pages` |
| `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` | secrets | credentials for `wrangler deploy` |

The Cloudflare API token needs, on the **account**: **Workers Scripts › Edit**
(marked *Legacy* in the dashboard, but still required: the newer *Workers ›
Editor* alone is denied the static-assets upload); and on the **`bygus.dev`
zone**: **Zone › Read** + **Workers Routes › Edit** (to attach the custom domain). To deploy from your machine, copy
[`.env.example`](.env.example) to `.env` and fill it in.

Every language × page is pre-rendered to a real static HTML file, so deep links
and refreshes just work on both hosts — no SPA redirect tricks needed.

> **Gotcha:** Astro's `import.meta.env.BASE_URL` has **no trailing slash**
> (`/my-resume`). Any URL built from it must go through
> [`src/utils/withBase.ts`](src/utils/withBase.ts) — never concatenate by hand.
