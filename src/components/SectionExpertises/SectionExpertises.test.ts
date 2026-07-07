// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import SectionExpertises from "./SectionExpertises.astro";

const expertises = [
  {
    title: "Web Development",
    html_text: "<p>Building <b>sites</b></p><script>alert(1)</script>",
    url_img: "images/fallback.png",
    underline_class_css: "underline-web",
    icon: "web",
  },
  {
    title: "Data Analysis",
    html_text: "<p>Numbers</p>",
    url_img: "https://example.test/icon.png",
    underline_class_css: "underline-data",
    code_tag: "h3",
  },
];

const render = async () => {
  const container = await AstroContainer.create();
  return container.renderToString(SectionExpertises, { props: { lang: "en", expertises } });
};

describe("SectionExpertises.astro", () => {
  it("renders one article per expertise with staggered reveal delays", async () => {
    const html = await render();
    expect(html.match(/expertise-v3__item/g)?.length).toBeGreaterThanOrEqual(2);
    expect(html).toContain("--reveal-delay: 0ms");
    expect(html).toContain("--reveal-delay: 150ms");
  });

  it("sanitizes html_text at build time", async () => {
    const html = await render();
    expect(html).toContain("<b>sites</b>");
    expect(html).not.toContain("<script>alert(1)</script>");
  });

  it("uses inline SVG when an icon key exists, <img> fallback otherwise", async () => {
    const html = await render();
    expect(html).toContain("<svg");
    expect(html).toContain('src="https://example.test/icon.png"');
  });

  it("wraps the description in the configured code tag", async () => {
    const html = await render();
    expect(html).toContain("&lt;h3&gt;");
    expect(html).toContain("&lt;div&gt;");
  });
});
