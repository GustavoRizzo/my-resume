import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { I18nextProvider } from "react-i18next";
import { getI18n } from "../../i18n/config";
import { getContent } from "../../i18n/content";
import SectionExpertisesV3 from "./SectionExpertisesV3";

afterEach(cleanup);

function renderFor(lang: "en" | "pt") {
  return render(
    <I18nextProvider i18n={getI18n(lang)}>
      <SectionExpertisesV3 expertises={getContent(lang).expertises} />
    </I18nextProvider>
  );
}

describe("SectionExpertisesV3", () => {
  it("renders the translated section title and the expertise items in English", () => {
    renderFor("en");
    expect(screen.getByText("My Expertise")).toBeInTheDocument();
    expect(screen.getByLabelText("Software Developer")).toBeInTheDocument();
    expect(screen.getByLabelText("Data Analyst")).toBeInTheDocument();
  });

  it("renders the Portuguese title and translated expertise items", () => {
    renderFor("pt");
    expect(screen.getByText("Especialidades")).toBeInTheDocument();
    expect(screen.getByLabelText("Desenvolvedor de Software")).toBeInTheDocument();
  });
});
