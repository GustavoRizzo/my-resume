import type { APIRoute } from "astro";
import { withBase } from "../utils/withBase";

// Generated per build so each host advertises ITS OWN sitemap (the site is
// deployed to two hosts — see deploy-targets.mjs). Note: crawlers only read
// robots.txt at a domain's root, so it is effective on the Cloudflare custom
// domain but ignored under GitHub Pages' /my-resume/ subpath.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(withBase("sitemap-index.xml"), site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
