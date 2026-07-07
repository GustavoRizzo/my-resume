// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import CareerTimeline from "./CareerTimeline.astro";

const experiences = [
  {
    title: "Dev",
    subtitle: "Acme Inc",
    text: "Did things.",
    company_logo: "logo-acme.jpg",
    company_url: "https://acme.test",
    initial_date: "2024-06-15",
  },
  {
    title: "Intern",
    subtitle: "No-site Co",
    text: "Learned things.",
    company_logo: "logo-nosite.jpg",
    initial_date: "2020-01-10",
  },
];

const render = async (lang: "en" | "pt") => {
  const container = await AstroContainer.create();
  return container.renderToString(CareerTimeline, { props: { lang, experiences } });
};

describe("CareerTimeline.astro", () => {
  it("formats dates per language at build time", async () => {
    expect(await render("en")).toContain("JUN 2024");
    expect(await render("pt")).toMatch(/JUN\.? 2024/);
  });

  it("links the logo and subtitle only when company_url exists", async () => {
    const html = await render("en");
    expect(html).toContain('href="https://acme.test"');
    expect(html.match(/class="company-logo"/g)).toHaveLength(2);
    expect(html.match(/sub-title-link/g)?.length).toBeGreaterThanOrEqual(1);
  });

  it("anchors logo URLs to the site base", async () => {
    const html = await render("en");
    expect(html).toContain("url(/logo-acme.jpg)");
    expect(html).not.toContain("url(logo-acme.jpg)");
  });

  it("staggers reveal delays by 200ms per item", async () => {
    const html = await render("en");
    expect(html).toContain("--reveal-delay: 0ms");
    expect(html).toContain("--reveal-delay: 200ms");
  });
});
