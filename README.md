<div align="center">

# 👋 Gustavo Rizzo — Resume

My personal resume as a website: fast, responsive, and always up to date.

### 🔗 **[View the live resume →](https://gustavorizzo.github.io/my-resume/)**

</div>

---

## 📖 About the project

This repository holds the source code of my resume website — a bilingual
(English / Portuguese) site built with the React Router 7 framework and
**pre-rendered to static HTML**, hosted for free on GitHub Pages and published
automatically on every update to the `main` branch.

Each language gets its own URL prefix (`/en/…`, `/pt/…`), and every page is
pre-rendered at build time so crawlers and no-JS visitors get fully-rendered,
per-language content with proper `<title>`, descriptions and `hreflang` tags.

All content (experiences, skills, about me) lives under
[`src/data/`](src/data/), one file per language, kept separate from the
presentation layer. Short UI strings live in [`src/locales/`](src/locales/).

## 🛠️ Stack

| Layer        | Technologies                                            |
| ------------ | ------------------------------------------------------- |
| **Core**     | React 19 · TypeScript · React Router 7 (framework mode) |
| **Build**    | Vite · React SWC plugin · static pre-render (SSG)       |
| **i18n**     | i18next · react-i18next (en / pt)                       |
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
npm run build      # type-check + React Router build + static pre-render
npm run preview    # serve the built site locally
npm test           # run the test suite (Vitest)
npm run lint       # check the code with ESLint
npm run lint:fix   # automatically fix what's possible
```

## 📦 Deploy

Deployment is automatic: the [workflow](.github/workflows/deploy.yml) runs lint, tests,
and build on every push to `main`, publishing `build/client/` to GitHub Pages.

The build pre-renders every language × page to static HTML. Because the site is
served from the project sub-path `/my-resume/`, a [post-build step](scripts/postbuild.mjs)
flattens the output, and [`public/404.html`](public/404.html) restores deep links
on refresh (the [spa-github-pages](https://github.com/rafgraph/spa-github-pages) technique).
