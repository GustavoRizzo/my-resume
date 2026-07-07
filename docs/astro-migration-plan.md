# Plano de migração: my-resume → Astro

> Branch de trabalho: `poc/rebuild-astrojs`. Estratégia: **recriar do zero** —
> o código do app React é removido desta branch logo na Fase 0; a referência de
> paridade é a branch `main` (código via `git show main:<path>`, comportamento
> via produção). Só conteúdo é preservado: imagens de `public/` e os JSONs de
> currículo/hobbies/UI strings.

## 1. Decisões de arquitetura

| Tema | Decisão | Justificativa |
|---|---|---|
| Renderização | **SSG puro** (`output: 'static'`, padrão do Astro) | O site é 100% conteúdo; GitHub Pages continua como host. |
| Interatividade | **Ilhas React** (`@astrojs/react`) para os 3 componentes realmente interativos; resto vira `.astro` estático | Reaproveita o código React existente quase intacto na fase 1; converter ilhas para vanilla é otimização opcional posterior. |
| i18n | **Roteamento por pasta** `src/pages/[lang]/...` com `getStaticPaths()` gerando `en` e `pt` + helper `t()` próprio lendo os JSONs | Elimina i18next inteiro: com SSG por página/idioma não há troca de idioma em runtime — cada página já nasce no idioma certo. |
| Conteúdo | **Content collections** tipadas (`src/content/`) para `content/{en,pt}.json` e `hobbies/{en,pt}.json`, com schema Zod espelhando `src/types/` | Validação em build (build quebra se o JSON estiver errado) substitui os types manuais. |
| Imagens | `astro:assets` (`<Image />`) para perfil/logos; `public/` só para favicon/robots | Gera URLs absolutas com base correta (mata em definitivo a classe de bug dos 404 de imagem) + otimização automática. |
| Estilos | Manter SCSS; `_variables.scss` importado via `@use` | Astro suporta `sass` nativamente em `<style lang="scss">`. |
| Troca de idioma | `LanguageSelector` vira **links `<a>` estáticos** (`/my-resume/pt/career` ↔ `/en/career`) + snippet inline gravando `localStorage` | Remove o `navigate()` do React Router — exatamente onde está o bug atual do switch de idioma. Bug morre por design. |
| Deep links / 404 | **Desnecessário o hack spa-github-pages**: todo path vira arquivo HTML real (`en/career/index.html`) | `public/404.html` + `SPA_RESTORE` são substituídos por um `src/pages/404.astro` normal. |
| Testes | Vitest + **Container API do Astro** para `.astro`; Testing Library continua para as ilhas React | Os testes das ilhas portam quase sem mudança. |

## 2. Features que NÃO podem faltar (checklist de paridade)

- [x] Rotas bilíngues: `/{en,pt}/`, `/{en,pt}/about`, `/expertises`, `/career`, `/beyond-work` — todas pré-renderizadas.
- [x] `/` redireciona para idioma salvo em `localStorage` (`resume.lang`) ou detectado do navegador, fallback `en`.
- [x] Seletor de idioma preservando a sub-página atual (`/en/career` → `/pt/career`) e gravando a preferência.
- ~~Navbar~~ — descoberto na Fase 2 que o componente existe na `main` mas **não é usado por nenhuma página** (código morto); não será portado.
- [x] **WhoAmI**: foto de perfil + easter egg do triplo clique (troca de imagens com timeouts) + animação de console (`ConsoleTextAnimated`) sem causar scroll no mobile (fix do commit `531b936`).
- [x] **Expertises**: ícones SVG inline (web/presentation/engine) com fallback `url_img`.
- [x] **Career/Timeline**: logos das empresas, data formatada por locale (`en-US`/`pt-BR`), animação reveal-on-scroll com delay escalonado.
- [x] **Beyond Work**: cards de hobbies + modal (largura corrigida no mobile — commits `74bd2fc`/`ae608c3`), `body_html` sanitizado (DOMPurify).
- [x] SEO: `<title>`/description por página × idioma, `hreflang` alternates, canonical, `og:` tags (paridade com `src/i18n/seo.ts`).
- [x] `sitemap.xml` (usar `@astrojs/sitemap`) e `robots.txt`.
- [x] Página 404 estilizada.
- [x] Base path `/my-resume/` em TODAS as URLs (config `base` do Astro).
- [x] Deploy automático no GitHub Pages a cada push na `main` (lint → test → build → publish).
- [x] **Google Tag Manager** (`GTM-W6HR4FW5`, hoje em `root.tsx`): snippet no `<head>` do BaseLayout. Baixa prioridade, mas obrigatório antes do corte.
- [x] Todos os caminhos de imagem absolutos sob a base (regressão do bug corrigido em `assetUrl.ts`).

## 3. Passo a passo — fases pequenas e testáveis

Cada fase termina com o site **rodando e verificável** (`npm run dev` / `npm run build && npm run preview`). Commite ao fim de cada fase.

> Regras transversais: (a) tudo precisa funcionar no **GitHub Pages** (host
> estático, sob `/my-resume/`); (b) usar sempre a **última versão estável** de
> cada lib/framework; (c) **cada fase adiciona/porta testes unitários** do que
> foi construído — nenhuma fase fecha com cobertura menor que a equivalente no
> app React.

### Fase 0 — Scaffold e infra
1. Remover o app React da branch (`git rm` de `src/`, configs, scripts) e criar o projeto Astro limpo na raiz (template minimal, TypeScript strict).
2. Instalar integrações: `@astrojs/react`, `@astrojs/sitemap`, `sass`, `vitest`.
3. `astro.config.mjs`: `site: 'https://gustavorizzo.github.io'`, `base: '/my-resume'`.
4. Copiar `public/` (favicon, robots, imagens) e `src/styles/_variables.scss`.
- **Teste:** `npm run dev` abre página hello-world em `localhost:4321/my-resume/`; `npm run build` gera `dist/` sem erro.

### Fase 1 — Conteúdo tipado
1. Criar `src/content.config.ts` com collections `resume` e `hobbies`, schemas Zod portados de `src/types/{About,Experience,Expertise}.ts`.
2. Mover os 4 JSONs (`content/{en,pt}`, `hobbies/{en,pt}`) para `src/content/`.
3. Helper `src/i18n/index.ts`: `SUPPORTED_LANGS`, `DEFAULT_LANG`, `t()` lendo `src/locales/{en,pt}/ui.json`, `getResume(lang)`.
- **Teste:** unit test do helper; quebrar um campo do JSON de propósito e confirmar que `astro build` falha com erro de schema.

### Fase 2 — Layout, rotas e navegação
1. `src/layouts/BaseLayout.astro`: document shell (portar de `root.tsx`), fontes, SCSS global.
2. `src/pages/[lang]/index.astro` + `about.astro` + `expertises.astro` + `career.astro` + `beyond-work.astro`, todas com `getStaticPaths()` → `['en','pt']`, por enquanto com conteúdo placeholder.
3. `src/pages/index.astro`: página raiz com script inline de detecção (`localStorage` → `navigator.language` → `en`) e `<meta refresh>` de fallback — portar de `root-redirect.tsx`.
4. **Navbar** e **LanguageSelector** como `.astro` puros: links `<a href>` calculados no servidor a partir de `Astro.url.pathname`; o selector grava `localStorage` num `<script>` mínimo.
- **Teste:** navegar por todas as 10 rotas no dev server; trocar idioma em `/en/career` cai em `/pt/career`; `build` gera 10 `index.html` + raiz. **Marco: o bug do switch de idioma está oficialmente enterrado.**

### Fase 3 — WhoAmI (primeira ilha React)
1. Copiar `WhoAmI/`, `ConsoleTextAnimated/` com seus SCSS e testes.
2. Trocar imagens para import via `astro:assets`/import estático (remove `assetUrl`).
3. Montar na home: `<WhoAmI client:load {...about} />`.
- **Teste:** testes Vitest existentes passam; easter egg funciona no navegador; animação de console sem scroll horizontal no viewport mobile (DevTools).

### Fase 4 — Expertises (estático)
1. Reescrever `SectionExpertisesV3` + `ExpertiseIcon` como `.astro` (zero interatividade — SVG inline via `Astro.glob`/import `?raw`).
- **Teste:** comparação visual com produção; `View Source` mostra os SVGs no HTML (sem JS).

### Fase 5 — Career/Timeline (estático + script de scroll)
1. Reescrever `ExperiencesTimeline` como `.astro`; datas formatadas em build (`toLocaleString` roda no servidor).
2. Portar `useRevealOnScroll` para um `<script>` com `IntersectionObserver` (~15 linhas, sem React).
- **Teste:** animação de reveal dispara ao rolar; delays escalonados preservados; datas em PT e EN corretas.

### Fase 6 — Beyond Work (segunda ilha)
1. Cards renderizados estáticos em `.astro`; `HobbyModal` como ilha React `client:visible`.
2. Sanitizar `body_html` **em build** (DOMPurify no frontmatter) — o HTML já chega limpo ao cliente.
- **Teste:** modal abre/fecha, largura ok em 360px; testes do componente passam.

### Fase 7 — SEO, sitemap e 404
1. Componente `<Seo />` no BaseLayout portando `src/i18n/seo.ts` (title/description por página, `hreflang`, canonical, og:).
2. `@astrojs/sitemap` no config; conferir `robots.txt` apontando pro sitemap.
2b. Snippet do **Google Tag Manager** (`GTM-W6HR4FW5`) no `<head>` do BaseLayout (portar de `root.tsx`).
3. `src/pages/404.astro`; **remover** `public/404.html` e qualquer resquício de `SPA_RESTORE`.
- **Teste:** `build && preview`; conferir `<head>` de cada página × idioma; `curl` numa rota funda (`/my-resume/pt/career/`) direto no preview retorna 200 com HTML completo.

### Fase 8 — CI/CD
1. Reescrever `.github/workflows/deploy.yml`: lint → `vitest run` → `withastro/action` → deploy Pages. `scripts/postbuild.mjs` morre (o `base` do Astro já resolve o layout de saída).
- **Teste:** push da branch com workflow apontado para um environment de preview (ou rodar os steps localmente com `act`); artefato `dist/` tem a mesma árvore de URLs do site atual.

### Fase 9 — Paridade final e corte
1. Passar o checklist da seção 2 item a item contra produção (duas janelas lado a lado).
2. Lighthouse antes/depois (registrar: espera-se queda grande de JS transferido).
3. Atualizar `CLAUDE.md` e `README.md` para o novo stack.
4. Merge na `main` → deploy.
- **Rollback:** se algo grave aparecer pós-deploy, `git revert` do merge republica o site React no push seguinte.

## 4. Riscos e observações

- **Bug atual do LanguageSelector** (erro ao clicar, URL direta funciona): não vale investigar a fundo se a migração for adiante — a Fase 2 o elimina por arquitetura. Se a migração atrasar, aí sim debugar no app React.
- **DOMPurify em build**: usar `isomorphic-dompurify` como hoje; rodará em Node durante o build.
- **Fontes/`.otf` locais** (AdobeClean): conferir licença/caminhos ao portar o global SCSS.
- **URLs finais idênticas às atuais** (mesmos paths sob `/my-resume/`), então zero impacto de SEO/links externos.
