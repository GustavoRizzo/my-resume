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
    code_tag: 'dl class="toolbox"',
  },
];

const render = async (level?: 1 | 2) => {
  const container = await AstroContainer.create();
  return container.renderToString(SectionExpertises, { props: { lang: "en", expertises, level } });
};

describe("SectionExpertises.astro", () => {
  it("renders one article per expertise with staggered reveal delays", async () => {
    const html = await render();
    expect(html.match(/expertise-v3__item/g)?.length).toBeGreaterThanOrEqual(2);
    expect(html).toContain("--reveal-delay: 0ms");
    expect(html).toContain("--reveal-delay: 150ms");
  });

  it("titles each card one level below the section title (h1 > h2 by default)", async () => {
    const html = await render();
    expect(html).toMatch(/<h1 class="section-title"/);
    expect(html.match(/<h2 class="expertise-v3__name"/g)).toHaveLength(2);
    expect(html).not.toContain("<h5");
  });

  it("shifts both levels down when nested in the home (h2 > h3)", async () => {
    const html = await render(2);
    expect(html).toMatch(/<h2 class="section-title"/);
    expect(html.match(/<h3 class="expertise-v3__name"/g)).toHaveLength(2);
    expect(html).not.toContain("<h1");
  });

  it("hides the decorative icon and <tag> frame from screen readers", async () => {
    const html = await render();
    expect(html.match(/class="expertise-v3__icon" aria-hidden="true"/g)).toHaveLength(2);
    expect(html.match(/class="expertise-v3__tag" aria-hidden="true"/g)).toHaveLength(4);
    expect(html).not.toContain('role="img"');
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

  it("wraps the description in the configured code tag (div by default)", async () => {
    const html = await render();
    expect(html).toContain('<span class="tok-tag">div</span>');
    expect(html.match(/<span class="tok-tag">dl<\/span>/g)).toHaveLength(2); // open + close
  });

  it("syntax-highlights the code tag's attributes", async () => {
    const html = await render();
    expect(html).toContain('<span class="tok-attr">class</span>');
    expect(html).toContain('<span class="tok-string">"toolbox"</span>');
  });

  it("names each editor tab after the expertise, as an .html file", async () => {
    const html = await render();
    expect(html).toMatch(/expertise-v3__tab"[^]*?web-development\.html/);
    expect(html).toMatch(/expertise-v3__tab"[^]*?data-analysis\.html/);
  });
});
