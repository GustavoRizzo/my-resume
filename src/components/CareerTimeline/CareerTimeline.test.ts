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

const render = async (lang: "en" | "pt", level?: 1 | 2) => {
  const container = await AstroContainer.create();
  return container.renderToString(CareerTimeline, { props: { lang, experiences, level } });
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

  it("gives the logo link an accessible name (it has no text of its own)", async () => {
    const html = await render("en");
    expect(html).toMatch(/<a class="company-logo"[^>]*aria-label="Acme Inc"/);
  });

  it("anchors logo URLs to the site base", async () => {
    const html = await render("en");
    expect(html).toContain("url(/logo-acme.jpg)");
    expect(html).not.toContain("url(logo-acme.jpg)");
  });

  it("titles each role one level below the section title", async () => {
    const page = await render("en");
    expect(page).toMatch(/<h1 class="section-title"/);
    expect(page.match(/<h2 class="title"/g)).toHaveLength(2);

    const home = await render("en", 2);
    expect(home).toMatch(/<h2 class="section-title"/);
    expect(home.match(/<h3 class="title"/g)).toHaveLength(2);
  });

  it("marks the start date up as a machine-readable <time>", async () => {
    const html = await render("en");
    expect(html).toMatch(/<time class="date-pill" datetime="2024-06-15"[^>]*>JUN 2024<\/time>/);
  });

  it("staggers reveal delays by 200ms per item", async () => {
    const html = await render("en");
    expect(html).toContain("--reveal-delay: 0ms");
    expect(html).toContain("--reveal-delay: 200ms");
  });
});
