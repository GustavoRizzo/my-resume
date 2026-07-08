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
  expandImage: "Expand image: {{alt}}",
  previousImage: "Previous image",
  nextImage: "Next image",
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

  it("expands an image in a lightbox and navigates with the arrows", () => {
    renderSection();

    fireEvent.click(
      screen.getByRole("button", { name: /Open details about Tech Events/i })
    );

    const firstImage = hobbies.topics.find((t) => t.id === "tech-events")!.images[0];
    fireEvent.click(
      screen.getByRole("button", { name: `Expand image: ${firstImage.alt}` })
    );

    const lightbox = screen.getByRole("dialog", { name: firstImage.alt });
    expect(lightbox).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Next image" }));
    expect(screen.queryByRole("dialog", { name: firstImage.alt })).not.toBeInTheDocument();

    // Esc closes the lightbox first, keeping the topic modal open.
    fireEvent.keyDown(document, { key: "Escape" });
    expect(
      screen.getByRole("dialog", { name: "Tech Events & Hackathons" })
    ).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
