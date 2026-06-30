import { describe, it, expect } from "vitest";
import { buildPageMeta } from "./seo";

type LinkDescriptor = { tagName: "link"; rel: string; hrefLang?: string; href: string };
type TitleDescriptor = { title: string };

describe("buildPageMeta", () => {
  it("sets a language-specific title", () => {
    const en = buildPageMeta("en", "home", "") as TitleDescriptor[];
    const pt = buildPageMeta("pt", "home", "") as TitleDescriptor[];
    expect(en.find((m) => "title" in m)?.title).toBe("Gustavo Rizzo — Software Developer");
    expect(pt.find((m) => "title" in m)?.title).toBe("Gustavo Rizzo — Desenvolvedor de Software");
  });

  it("builds a canonical URL from the language and path", () => {
    const meta = buildPageMeta("pt", "about", "/about") as LinkDescriptor[];
    const canonical = meta.find((m) => m.rel === "canonical");
    expect(canonical?.href).toBe("https://gustavorizzo.github.io/my-resume/pt/about");
  });

  it("emits hreflang alternates for both languages plus x-default", () => {
    const meta = buildPageMeta("en", "expertises", "/expertises") as LinkDescriptor[];
    const alternates = meta.filter((m) => m.rel === "alternate");
    const byHrefLang = Object.fromEntries(alternates.map((a) => [a.hrefLang, a.href]));
    expect(byHrefLang.en).toBe("https://gustavorizzo.github.io/my-resume/en/expertises");
    expect(byHrefLang.pt).toBe("https://gustavorizzo.github.io/my-resume/pt/expertises");
    expect(byHrefLang["x-default"]).toBe("https://gustavorizzo.github.io/my-resume/en/expertises");
  });

  it("exposes Open Graph and Twitter image tags", () => {
    const meta = buildPageMeta("en", "home", "") as Array<{ property?: string; name?: string }>;
    expect(meta.some((m) => m.property === "og:image")).toBe(true);
    expect(meta.some((m) => m.name === "twitter:card")).toBe(true);
  });
});
