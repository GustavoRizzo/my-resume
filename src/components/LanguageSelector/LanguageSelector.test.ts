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

  it("marks the current language as checked", async () => {
    const html = await render("pt", "/my-resume/pt/career");
    expect(html).toMatch(/value="pt"[^>]*checked/);
    expect(html).not.toMatch(/value="en"[^>]*checked/);
  });

  it("points each option to the same sub-path in the other language", async () => {
    const html = await render("en", "/my-resume/en/career");
    expect(html).toContain('data-href="/my-resume/pt/career"');
    expect(html).toContain('data-href="/my-resume/en/career"');
  });

  it("renders one option per supported language", async () => {
    const html = await render("en", "/my-resume/en");
    expect(html.match(/type="radio"/g)).toHaveLength(2);
  });
});
