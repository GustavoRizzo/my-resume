import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useRevealOnScroll } from "./useRevealOnScroll";

// A probe component mounts a real element so the observer has a node to watch.
function Probe() {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();
  return <div ref={ref} data-testid="box" data-visible={visible} />;
}

describe("useRevealOnScroll", () => {
  const original = globalThis.IntersectionObserver;
  afterEach(() => {
    cleanup();
    globalThis.IntersectionObserver = original;
  });

  it("reveals once the element intersects", () => {
    // setupTests installs a mock that reports intersection immediately.
    render(<Probe />);
    expect(screen.getByTestId("box").dataset.visible).toBe("true");
  });

  it("stays hidden until the element intersects", () => {
    class NoopObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }
    globalThis.IntersectionObserver = NoopObserver as unknown as typeof IntersectionObserver;
    render(<Probe />);
    expect(screen.getByTestId("box").dataset.visible).toBe("false");
  });
});
