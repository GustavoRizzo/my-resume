import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

function renderWithRoute(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
}

describe("App routes", () => {
  it("renders Home route", () => {
    renderWithRoute("/");

    expect(screen.getByText("Career Timeline")).toBeInTheDocument();
    expect(
      screen.getByText("Gustavo Rizzo S. M. de Albuquerque")
    ).toBeInTheDocument();
  });

  it("renders About route", () => {
    renderWithRoute("/About");

    expect(
      screen.getByText("Gustavo Rizzo S. M. de Albuquerque")
    ).toBeInTheDocument();
  });

  it("renders ListExpertises route", () => {
    renderWithRoute("/ListExpertises");

    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  it("renders CareerTimeline route", () => {
    renderWithRoute("/CareerTimeline");

    expect(screen.getByText("Career Timeline")).toBeInTheDocument();
  });

  it("renders fallback for unknown route", () => {
    renderWithRoute("/not-found");

    expect(screen.getByText("There's nothing here!")).toBeInTheDocument();
  });
});
