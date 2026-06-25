import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Bare "/" picks a language client-side and redirects to /en or /pt.
  index("routes/root-redirect.tsx"),

  // Everything else lives under a language prefix (/:lang/...). The layout
  // validates the language, provides i18n, and renders the nav + switch.
  route(":lang", "routes/lang-layout.tsx", [
    index("routes/lang-home.tsx"),
    route("about", "routes/about.tsx"),
    route("expertises", "routes/expertises.tsx"),
    route("career", "routes/career.tsx"),
    route("beyond-work", "routes/beyond-work.tsx"),
  ]),

  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
