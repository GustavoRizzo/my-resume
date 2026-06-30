import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { resolveLangParam, detectClientLang } from "./resolveLang";

describe("resolveLangParam", () => {
  it("returns the language for supported params", () => {
    expect(resolveLangParam("en")).toBe("en");
    expect(resolveLangParam("pt")).toBe("pt");
  });

  it("redirects legacy capitalized paths to the new lowercase home (default lang)", () => {
    try {
      resolveLangParam("About");
      throw new Error("expected a redirect to be thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(Response);
      const res = err as Response;
      expect(res.status).toBe(302);
      expect(res.headers.get("Location")).toBe("/en/about");
    }
  });

  it("maps every known legacy route", () => {
    const cases: Record<string, string> = {
      CareerTimeline: "/en/career",
      ListExpertises: "/en/expertises",
      BeyondWork: "/en/beyond-work",
    };
    for (const [input, location] of Object.entries(cases)) {
      try {
        resolveLangParam(input);
        throw new Error("expected redirect");
      } catch (err) {
        expect((err as Response).headers.get("Location")).toBe(location);
      }
    }
  });

  it("throws a 404 for unknown params", () => {
    for (const value of ["xyz", undefined]) {
      try {
        resolveLangParam(value as string | undefined);
        throw new Error("expected 404");
      } catch (err) {
        expect(err).toBeInstanceOf(Response);
        expect((err as Response).status).toBe(404);
      }
    }
  });
});

describe("detectClientLang", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => window.localStorage.clear());

  it("prefers a valid stored preference", () => {
    window.localStorage.setItem("resume.lang", "pt");
    expect(detectClientLang()).toBe("pt");
  });

  it("ignores an invalid stored preference and falls back to the navigator", () => {
    window.localStorage.setItem("resume.lang", "es");
    Object.defineProperty(window.navigator, "language", { value: "pt-BR", configurable: true });
    expect(detectClientLang()).toBe("pt");
  });

  it("falls back to English for non-Portuguese navigators", () => {
    Object.defineProperty(window.navigator, "language", { value: "fr-FR", configurable: true });
    expect(detectClientLang()).toBe("en");
  });
});
