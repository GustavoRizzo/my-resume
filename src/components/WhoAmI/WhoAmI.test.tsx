import { render, screen, fireEvent, act, cleanup } from "@testing-library/react";
import WhoAmI from "./WhoAmI";

const props = {
  name: "Test Name",
  perfil_img: "perfil.png",
  url_linkedin: "https://linkedin.test",
  url_github: "https://github.test",
  console_phrases: [{ phrase: "hello" }],
};

function getPerfil() {
  return screen.getByAltText("perfil") as HTMLImageElement;
}

describe("WhoAmI easter egg", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    cleanup();
  });

  it("plays the image sequence on click and returns to the original", () => {
    render(<WhoAmI {...props} />);
    const img = getPerfil();
    expect(img.src).toContain("perfil.png");

    fireEvent.click(img);
    expect(getPerfil().src).toContain("perfil_easter_egg_2.webp");

    act(() => void vi.advanceTimersByTime(300));
    expect(getPerfil().src).toContain("perfil_easter_egg_3.webp");

    act(() => void vi.advanceTimersByTime(500));
    expect(getPerfil().src).toContain("perfil.png");
  });

  it("restarts the sequence when clicked again mid-animation", () => {
    render(<WhoAmI {...props} />);
    const img = getPerfil();

    fireEvent.click(img);
    act(() => void vi.advanceTimersByTime(300));
    expect(getPerfil().src).toContain("perfil_easter_egg_3.webp");

    // Click again before it finishes: should restart at image 2.
    fireEvent.click(getPerfil());
    expect(getPerfil().src).toContain("perfil_easter_egg_2.webp");

    act(() => void vi.advanceTimersByTime(800));
    expect(getPerfil().src).toContain("perfil.png");
  });
});
