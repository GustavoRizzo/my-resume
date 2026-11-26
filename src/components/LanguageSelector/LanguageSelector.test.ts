// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import LanguageSelector from "./LanguageSelector.astro";

describe("LanguageSelector.astro", () => {
  const render = async (lang: "en" | "pt", path: string) => {
    const container = await AstroContainer.create();
    return container.renderToString(LanguageSelector, {
      props: { lang },
      request: new Request(`https://example.test${path}`),
    });
  };

  const linkFor = (html: string, code: string) =>
    html.match(new RegExp(`<a[^>]*data-lang="${code}"[^>]*>`))?.[0] ?? "";

  it("marks only the current language with aria-current", async () => {
    const html = await render("pt", "/my-resume/pt/career");
    expect(linkFor(html, "pt")).toContain('aria-current="page"');
    expect(linkFor(html, "en")).not.toContain("aria-current");
  });

  it("points each link to the same sub-path in that language", async () => {
    const html = await render("en", "/my-resume/en/career");
    expect(linkFor(html, "pt")).toContain('href="/my-resume/pt/career"');
    expect(linkFor(html, "en")).toContain('href="/my-resume/en/career"');
  });

  it("gives every link an accessible name in its own language", async () => {
    const html = await render("en", "/my-resume/en");
    expect(linkFor(html, "pt")).toMatch(/aria-label="Português"/);
    expect(linkFor(html, "pt")).toMatch(/hreflang="pt"/);
    expect(linkFor(html, "en")).toMatch(/aria-label="English"/);
  });

  it("wraps the links in a labelled nav, one link per supported language", async () => {
    const html = await render("pt", "/my-resume/pt");
    expect(html).toMatch(/<nav[^>]*aria-label="Idioma"/);
    expect(html.match(/data-lang="/g)).toHaveLength(2);
  });
});
