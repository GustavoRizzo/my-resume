import { describe, it, expect } from "vitest";
import { getContent } from "./content";

describe("getContent", () => {
  it("returns a fully-formed bundle for each language", () => {
    for (const lang of ["en", "pt"] as const) {
      const content = getContent(lang);
      expect(content.about.name).toBeTruthy();
      expect(content.expertises.length).toBeGreaterThan(0);
      expect(content.experiences.length).toBeGreaterThan(0);
      expect(content.hobbies.topics.length).toBeGreaterThan(0);
    }
  });

  it("serves distinct, translated content per language", () => {
    const en = getContent("en");
    const pt = getContent("pt");
    expect(en.expertises[0].title).toBe("Software Developer");
    expect(pt.expertises[0].title).toBe("Desenvolvedor de Software");
    expect(en.hobbies.section.title).toBe("Beyond Work");
    expect(pt.hobbies.section.title).toBe("Além do Trabalho");
  });

  it("keeps language-agnostic data identical across languages", () => {
    const en = getContent("en");
    const pt = getContent("pt");
    expect(pt.about.name).toBe(en.about.name);
    expect(pt.about.url_github).toBe(en.about.url_github);
    expect(pt.expertises.length).toBe(en.expertises.length);
  });
});
