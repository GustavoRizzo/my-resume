import { describe, expect, it } from "vitest";
import { pageSeo } from "./seo";

describe("pageSeo", () => {
  it("builds canonical URL under the language prefix", () => {
    expect(pageSeo("pt", "career", "/career").url).toBe(
      "https://gustavorizzo.github.io/my-resume/pt/career",
    );
  });

  it("lists en, pt and x-default alternates for the same path", () => {
    const { alternates } = pageSeo("en", "home", "");
    expect(alternates.map((a) => a.hreflang)).toEqual(["en", "pt", "x-default"]);
    expect(alternates.at(-1)?.href).toContain("/en");
  });

  it("localizes title and description", () => {
    expect(pageSeo("en", "home", "").title).toContain("Software Developer");
    expect(pageSeo("pt", "home", "").title).toContain("Desenvolvedor de Software");
  });

  it("uses an absolute OG image URL", () => {
    expect(pageSeo("en", "home", "").ogImage).toMatch(/^https:\/\/gustavorizzo\.github\.io\//);
  });
});
