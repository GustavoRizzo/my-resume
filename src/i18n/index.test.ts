import { describe, expect, it } from "vitest";
import { DEFAULT_LANG, isLang, LOCALE_BY_LANG, SUPPORTED_LANGS, switchLangPath, t } from "./index";
import enUi from "../locales/en/ui.json";
import ptUi from "../locales/pt/ui.json";

describe("language registry", () => {
  it("supports en and pt with en as default", () => {
    expect(SUPPORTED_LANGS).toEqual(["en", "pt"]);
    expect(DEFAULT_LANG).toBe("en");
  });

  it("isLang accepts supported languages only", () => {
    expect(isLang("en")).toBe(true);
    expect(isLang("pt")).toBe(true);
    expect(isLang("es")).toBe(false);
    expect(isLang(undefined)).toBe(false);
  });

  it("maps every language to a BCP-47 locale", () => {
    for (const lang of SUPPORTED_LANGS) {
      expect(LOCALE_BY_LANG[lang]).toMatch(/^[a-z]{2}-[A-Z]{2}$/);
    }
  });
});

describe("t()", () => {
  it("resolves dot-path keys per language", () => {
    expect(t("en", "nav.about")).toBe("About");
    expect(t("pt", "nav.about")).not.toBe(t("en", "nav.about"));
  });

  it("interpolates {{vars}}", () => {
    expect(t("en", "a11y.openDetails", { title: "Chess" })).toContain("Chess");
  });

  it("throws on missing keys (build-time safety)", () => {
    expect(() => t("en", "nav.doesNotExist")).toThrow(/Missing UI string/);
  });

  it("has the same key set in every language", () => {
    const keys = (obj: unknown, prefix = ""): string[] =>
      Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
        typeof v === "string" ? [`${prefix}${k}`] : keys(v, `${prefix}${k}.`),
      );
    expect(keys(ptUi).sort()).toEqual(keys(enUi).sort());
  });
});

describe("switchLangPath()", () => {
  it("swaps the language segment keeping base and sub-path", () => {
    expect(switchLangPath("/my-resume/en/career", "pt")).toBe("/my-resume/pt/career");
    expect(switchLangPath("/my-resume/pt", "en")).toBe("/my-resume/en");
  });

  it("does not touch look-alike segments", () => {
    expect(switchLangPath("/my-resume/entries", "pt")).toBe("/my-resume/entries");
  });
});
