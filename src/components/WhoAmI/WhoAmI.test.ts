// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import WhoAmI from "./WhoAmI.astro";

const props = {
  name: "Test Name",
  url_linkedin: "https://linkedin.test",
  url_github: "https://github.test",
  console_phrases: [{ phrase: "hello", color: "#fff" }],
};

const render = async () => {
  const container = await AstroContainer.create();
  return container.renderToString(WhoAmI, { props });
};

const photoTag = (html: string) => html.match(/<img[^>]*class="about_img_perfil"[^>]*>/)?.[0] ?? "";

describe("WhoAmI.astro", () => {
  it("renders the photo as the eager, high-priority LCP image", async () => {
    const img = photoTag(await render());
    expect(img).toContain('alt="Test Name"');
    expect(img).toContain('loading="eager"');
    expect(img).toContain('fetchpriority="high"');
    expect(img).not.toContain('loading="lazy"');
  });

  it("serves the photo as a responsive srcset with sizes and dimensions", async () => {
    const img = photoTag(await render());
    expect(img).toMatch(/srcset="[^"]*400w[^"]*800w/);
    expect(img).toContain('sizes="(max-width: 444px) 90vw, 400px"');
    expect(img).toMatch(/width="\d+"/);
    expect(img).toMatch(/height="\d+"/);
  });

  it("passes the easter-egg frames and console phrases to the script as data", async () => {
    const html = await render();
    expect(html).toMatch(/data-easter-egg-frames="\[[^"]*perfil_easter_egg_2[^"]*perfil_easter_egg_3/);
    expect(html).toContain("data-console-phrases=");
    expect(html).toContain("hello");
  });

  it("does not ship the easter-egg frames as <img> (no eager download)", async () => {
    const html = await render();
    expect(html).not.toMatch(/<img[^>]*perfil_easter_egg/);
  });

  it("renders the name and labelled contact links with sized icons", async () => {
    const html = await render();
    expect(html).toContain('<h1 class="hero-title">Test Name</h1>');
    expect(html).toContain('href="https://linkedin.test" aria-label="LinkedIn"');
    expect(html).toContain('href="https://github.test" aria-label="GitHub"');
    expect(html.match(/width="30" height="30"/g)).toHaveLength(2);
  });
});
