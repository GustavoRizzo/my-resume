// Adds "is-visible" to each matching element the first time it scrolls into
// view. Replaces the React useRevealOnScroll hook — the sections themselves
// are static HTML now. A <noscript> rule in BaseLayout keeps content visible
// without JS.
export function revealOnScroll(selector: string, threshold = 0.2): void {
  if (typeof IntersectionObserver === "undefined") return;

  document.querySelectorAll(selector).forEach((node) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
  });
}
