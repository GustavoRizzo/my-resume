import { useEffect, useRef, useState } from "react";

// Scroll-reveal that is SSR/hydration-safe.
//
// The first render is always "hidden" (visible=false) on BOTH the server
// (static prerender) and the client, so the hydrated HTML matches and React
// doesn't bail out. We only reveal after mount, once the element scrolls into
// view (via the observer callback — never a synchronous setState in the effect
// body). A <noscript> rule in root.tsx keeps content visible without JS; the
// test environment provides an IntersectionObserver mock (see setupTests).
export function useRevealOnScroll<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

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
