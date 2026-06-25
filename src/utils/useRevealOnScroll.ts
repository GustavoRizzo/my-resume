import { useEffect, useRef, useState } from "react";

// Scroll-reveal that is SSR/hydration-safe.
//
// The first render is always "hidden" (visible=false) on BOTH the server
// (static prerender) and the client, so the hydrated HTML matches and React
// doesn't bail out. We only reveal after mount: immediately when there's no
// IntersectionObserver (jsdom tests, old browsers), or once the element scrolls
// into view. A <noscript> rule in root.tsx keeps content visible without JS.
export function useRevealOnScroll<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
