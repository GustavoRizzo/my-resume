import '@testing-library/jest-dom';

// jsdom has no IntersectionObserver. Provide a mock that reports the element as
// intersecting immediately, so scroll-reveal components (useRevealOnScroll)
// reach their visible state during tests. Individual tests can override
// globalThis.IntersectionObserver to exercise other behaviour.
class MockIntersectionObserver {
  constructor(private readonly callback: IntersectionObserverCallback) {}
  observe(target: Element) {
    this.callback(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    );
  }
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
}

globalThis.IntersectionObserver ??=
  MockIntersectionObserver as unknown as typeof IntersectionObserver;
