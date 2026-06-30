import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import type { ReactNode } from "react";

import "./index.css";
import "./App.css";
import { DEFAULT_LANG, isLang } from "./i18n/types";

// Restores the original URL after the GitHub Pages 404.html redirect, so deep
// links / refreshes work on static hosting (spa-github-pages technique).
const SPA_RESTORE = `(function (l) {
  if (l.search[1] === '/') {
    var decoded = l.search.slice(1).split('&').map(function (s) {
      return s.replace(/~and~/g, '&');
    }).join('?');
    window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
  }
})(window.location);`;

const GTM = `(function (w, d, s, l, i) {
  w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0], j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-W6HR4FW5');`;

function langFromPath(pathname: string): string {
  const seg = pathname.split("/").filter(Boolean)[0];
  return isLang(seg) ? seg : DEFAULT_LANG;
}

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <html lang={langFromPath(pathname)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href={`${import.meta.env.BASE_URL}favicon.svg`} />
        <script dangerouslySetInnerHTML={{ __html: SPA_RESTORE }} />
        <script dangerouslySetInnerHTML={{ __html: GTM }} />
        {/* Scroll-reveal sections start hidden and reveal via JS. Without JS,
            force them visible so the prerendered content stays readable. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>.expertise-v3__item{opacity:1!important;transform:none!important}" +
              "ul.rb li{opacity:1!important;transform:none!important}</style>",
          }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="root">{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
