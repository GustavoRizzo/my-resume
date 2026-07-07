import { describe, expect, it } from "vitest";
import { withBase } from "./withBase";

describe("withBase", () => {
  it("joins base and path with exactly one slash", () => {
    const url = withBase("en/");
    expect(url).toMatch(/^\/(.+\/)?en\/$/);
    expect(url).not.toContain("//");
  });

  it("normalizes a leading slash on the path", () => {
    expect(withBase("/favicon.svg")).toBe(withBase("favicon.svg"));
  });

  it("keeps the language segment separated from the base (regression: /my-resumept/)", () => {
    const url = withBase("pt/");
    expect(url.endsWith("/pt/")).toBe(true);
  });
});
