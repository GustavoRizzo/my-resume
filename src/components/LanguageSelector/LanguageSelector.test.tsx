import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MemoryRouter, useLocation } from "react-router";
import LanguageSelector from "./LanguageSelector";

function LocationProbe() {
  const { pathname } = useLocation();
  return <div data-testid="loc">{pathname}</div>;
}

function renderAt(path: string, lang: "en" | "pt") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageSelector lang={lang} />
      <LocationProbe />
    </MemoryRouter>
  );
}

describe("LanguageSelector", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => {
    cleanup();
    window.localStorage.clear();
  });

  it("checks the radio matching the active language", () => {
    renderAt("/en/about", "en");
    const [en, pt] = screen.getAllByRole("radio") as HTMLInputElement[];
    expect(en.checked).toBe(true);
    expect(pt.checked).toBe(false);
  });

  it("switches the URL prefix while keeping the sub-path", () => {
    renderAt("/en/about", "en");
    const [, pt] = screen.getAllByRole("radio");

    fireEvent.click(pt);

    expect(screen.getByTestId("loc").textContent).toBe("/pt/about");
    expect(window.localStorage.getItem("resume.lang")).toBe("pt");
  });

  it("switches from the language home (no sub-path)", () => {
    renderAt("/pt", "pt");
    const [en] = screen.getAllByRole("radio");

    fireEvent.click(en);

    expect(screen.getByTestId("loc").textContent).toBe("/en");
    expect(window.localStorage.getItem("resume.lang")).toBe("en");
  });
});
