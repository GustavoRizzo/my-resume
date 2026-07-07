import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import allHobbies from "../../content/hobbies.json";
import type { HobbiesData } from "../../types/Hobby";
import SectionBeyondWork from "./SectionBeyondWork";

afterEach(cleanup);

const hobbies = allHobbies.en as HobbiesData;
const labels = {
  readMore: "Read more →",
  close: "Close",
  openDetails: "Open details about {{title}}",
};

function renderSection() {
  return render(<SectionBeyondWork hobbies={hobbies} labels={labels} />);
}

describe("SectionBeyondWork", () => {
  it("renders the section title and the topic cards", () => {
    renderSection();

    expect(screen.getByText("Beyond Work")).toBeInTheDocument();
    expect(screen.getByText("Adventures & Sports")).toBeInTheDocument();
    expect(screen.getByText("Open Source")).toBeInTheDocument();
    expect(screen.getByText("Tools & Pastimes I Build")).toBeInTheDocument();
  });

  it("opens a modal with the topic detail when a card is clicked", () => {
    renderSection();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /Open details about Open Source/i })
    );

    const dialog = screen.getByRole("dialog", { name: "Open Source" });
    expect(dialog).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /django-sample-components/i })
    ).toBeInTheDocument();
  });

  it("closes the modal with the close button", () => {
    renderSection();

    fireEvent.click(
      screen.getByRole("button", { name: /Open details about Open Source/i })
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
