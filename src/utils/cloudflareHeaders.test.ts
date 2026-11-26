import { buildHeaders } from "../../integrations/cloudflare-headers.mjs";

describe("buildHeaders (Cloudflare _headers)", () => {
  it("applies security headers to every path under the base", () => {
    const file = buildHeaders("/");
    expect(file).toMatch(/^\/\*\n/);
    expect(file).toContain("Strict-Transport-Security: max-age=31536000");
    expect(file).toContain("X-Content-Type-Options: nosniff");
    expect(file).toContain("X-Frame-Options: DENY");
    expect(file).toContain("Cross-Origin-Opener-Policy: same-origin");
  });

  it("caches the content-hashed /_astro/ assets forever", () => {
    expect(buildHeaders("/")).toMatch(/\n\/_astro\/\*\n {2}Cache-Control: public, max-age=31536000, immutable/);
  });

  it("follows a non-root base without doubling slashes", () => {
    const file = buildHeaders("/sub/");
    expect(file).toMatch(/^\/sub\/\*\n/);
    expect(file).toContain("\n/sub/_astro/*\n");
    expect(file).not.toContain("//");
  });
});
