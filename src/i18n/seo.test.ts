import { describe, expect, it } from "vitest";
import { pageSeo } from "./seo";

describe("pageSeo", () => {
  it("builds canonical URL on the canonical host, under the language prefix", () => {
    expect(pageSeo("pt", "career", "/career").url).toBe(`${__CANONICAL_SITE__}/pt/career`);
  });

  it("points hreflang alternates at the canonical host too", () => {
    const { alternates } = pageSeo("en", "home", "");
    expect(alternates.every((a) => a.href.startsWith(`${__CANONICAL_SITE__}/`))).toBe(true);
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

  it("serves the OG image from this build's own host, so each copy stands alone", () => {
    const own = new URL(import.meta.env.SITE).origin;
    expect(pageSeo("en", "home", "").ogImage).toMatch(new RegExp(`^${own.replace(/\./g, "\\.")}/`));
  });
});
