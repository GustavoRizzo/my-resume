import { setupEasterEgg, STEP_2_MS, STEP_3_MS } from "./easterEgg";

const FRAMES = ["/egg2.webp", "/egg3.webp"] as const;

function setup() {
  const wrap = document.createElement("div");
  const img = document.createElement("img");
  img.setAttribute("src", "/perfil-800.webp");
  img.setAttribute("srcset", "/perfil-400.webp 400w, /perfil-800.webp 800w");
  wrap.appendChild(img);
  document.body.appendChild(wrap);
  const teardown = setupEasterEgg(wrap, img, FRAMES);
  return { wrap, img, teardown };
}

describe("setupEasterEgg", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  it("plays both frames on click and restores the responsive photo", () => {
    const { wrap, img, teardown } = setup();

    wrap.click();
    expect(img.getAttribute("src")).toBe("/egg2.webp");
    // srcset must go, or the browser would keep showing the photo.
    expect(img.hasAttribute("srcset")).toBe(false);

    vi.advanceTimersByTime(STEP_2_MS);
    expect(img.getAttribute("src")).toBe("/egg3.webp");

    vi.advanceTimersByTime(STEP_3_MS);
    expect(img.getAttribute("src")).toBe("/perfil-800.webp");
    expect(img.getAttribute("srcset")).toBe("/perfil-400.webp 400w, /perfil-800.webp 800w");
    teardown();
  });

  it("restarts the sequence when clicked mid-animation", () => {
    const { wrap, img, teardown } = setup();
    wrap.click();
    vi.advanceTimersByTime(STEP_2_MS);
    expect(img.getAttribute("src")).toBe("/egg3.webp");

    wrap.click();
    expect(img.getAttribute("src")).toBe("/egg2.webp");
    vi.advanceTimersByTime(STEP_2_MS + STEP_3_MS);
    expect(img.getAttribute("src")).toBe("/perfil-800.webp");
    teardown();
  });

  it("preloads the frames on intent, not with the page, and only once", () => {
    const created: string[] = [];
    const RealImage = window.Image;
    vi.spyOn(window, "Image").mockImplementation(function (this: unknown) {
      const el = new RealImage();
      queueMicrotask(() => created.push(el.getAttribute("src") ?? ""));
      return el;
    } as unknown as typeof Image);

    const { wrap, teardown } = setup();
    expect(window.Image).not.toHaveBeenCalled();

    wrap.dispatchEvent(new Event("pointerenter"));
    wrap.dispatchEvent(new Event("touchstart"));
    wrap.click();
    expect(window.Image).toHaveBeenCalledTimes(FRAMES.length);
    teardown();
  });

  it("stops reacting after teardown", () => {
    const { wrap, img, teardown } = setup();
    teardown();
    wrap.click();
    expect(img.getAttribute("src")).toBe("/perfil-800.webp");
  });
});
