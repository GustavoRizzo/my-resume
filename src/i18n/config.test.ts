import { describe, it, expect } from "vitest";
import { getI18n } from "./config";

describe("getI18n", () => {
  it("translates UI strings in the requested language", () => {
    expect(getI18n("en").t("sections.myExpertise")).toBe("My Expertise");
    expect(getI18n("pt").t("sections.myExpertise")).toBe("Minhas Especialidades");
  });

  it("interpolates values", () => {
    expect(getI18n("en").t("a11y.openDetails", { title: "Open Source" })).toBe(
      "Open details about Open Source"
    );
  });

  it("memoizes one instance per language", () => {
    expect(getI18n("en")).toBe(getI18n("en"));
    expect(getI18n("en")).not.toBe(getI18n("pt"));
  });
});
