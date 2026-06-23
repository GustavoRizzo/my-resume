<div align="center">

# 👋 Gustavo Rizzo — Resume

My personal resume as a website: fast, responsive, and always up to date.

### 🔗 **[View the live resume →](https://gustavorizzo.github.io/my-resume/)**

</div>

---

## 📖 About the project

This repository holds the source code of my resume website — a responsive
single-page application (SPA), hosted for free on GitHub Pages and published
automatically on every update to the `main` branch.

All content (experiences, skills, about me) lives in
[`src/data/data.json`](src/data/data.json), kept separate from the presentation layer.

## 🛠️ Stack

| Layer        | Technologies                                            |
| ------------ | ------------------------------------------------------- |
| **Core**     | React 19 · TypeScript · React Router 7                  |
| **Build**    | Vite · React SWC plugin                                 |
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
npm run build      # type-check + production build
npm test           # run the test suite (Vitest)
npm run lint       # check the code with ESLint
npm run lint:fix   # automatically fix what's possible
```

## 📦 Deploy

Deployment is automatic: the [workflow](.github/workflows/deploy.yml) runs lint, tests,
and build on every push to `main`, publishing the result to GitHub Pages.
