// @vitest-environment node
import { describe, expect, it } from "vitest";
import { TARGETS, resolveTarget, siteUrl } from "../../deploy-targets.mjs";

describe("deploy targets", () => {
  it("serves GitHub Pages under /my-resume and Cloudflare at the domain root", () => {
    expect(siteUrl(TARGETS["gh-pages"])).toBe("https://gustavorizzo.github.io/my-resume");
    expect(siteUrl(TARGETS.cloudflare)).toBe("https://resume.bygus.dev");
  });

  it("falls back when the variable is unset or empty", () => {
    expect(resolveTarget(undefined, "cloudflare")).toBe(TARGETS.cloudflare);
    expect(resolveTarget("", "gh-pages")).toBe(TARGETS["gh-pages"]);
  });

  it("fails loudly on a typo instead of shipping the wrong base", () => {
    expect(() => resolveTarget("cloudfare", "gh-pages")).toThrow(/Unknown deploy target "cloudfare"/);
  });
});
