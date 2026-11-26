// Easter egg: clicking the profile photo briefly swaps it for two alternate
// frames before returning to the original. Vanilla port of the old React
// WhoAmI island.
//
// The frames are NOT fetched with the page: they would compete for bandwidth
// with the photo itself (the page's LCP element). They are preloaded on the
// first sign of intent (pointer/touch/focus on the photo) or once the page is
// loaded and the browser is idle, whichever comes first.

export const STEP_2_MS = 300;
export const STEP_3_MS = 500;

/** Wires the easter egg; returns a function that removes it. */
export function setupEasterEgg(
  trigger: HTMLElement,
  img: HTMLImageElement,
  frames: readonly [string, string],
): () => void {
  // The photo is responsive: its srcset wins over src, so a swap has to drop
  // the srcset and the restore has to put it back.
  const original = { src: img.getAttribute("src"), srcset: img.getAttribute("srcset") };
  let timeouts: ReturnType<typeof setTimeout>[] = [];
  let preloaded = false;

  function preload() {
    if (preloaded) return;
    preloaded = true;
    frames.forEach((src) => {
      new Image().src = src;
    });
  }

  function show(src: string) {
    img.removeAttribute("srcset");
    img.src = src;
  }

  function restore() {
    if (original.srcset) img.setAttribute("srcset", original.srcset);
    if (original.src) img.src = original.src;
  }

  function clearTimeouts() {
    timeouts.forEach(clearTimeout);
    timeouts = [];
  }

  function play() {
    preload();
    // Restart the sequence from scratch on every click.
    clearTimeouts();
    show(frames[0]);
    timeouts.push(
      setTimeout(() => show(frames[1]), STEP_2_MS),
      setTimeout(restore, STEP_2_MS + STEP_3_MS),
    );
  }

  const intentEvents = ["pointerenter", "touchstart", "focusin"] as const;
  intentEvents.forEach((type) => trigger.addEventListener(type, preload, { once: true, passive: true }));
  trigger.addEventListener("click", play);

  // Fallback so the first click is instant even without hover (keyboard,
  // some touch flows): preload after load, when the browser is idle.
  const hasIdle = typeof requestIdleCallback === "function";
  let idleId: number | undefined;
  const scheduleIdle = () => {
    idleId = hasIdle ? requestIdleCallback(preload, { timeout: 5000 }) : window.setTimeout(preload, 2000);
  };
  if (document.readyState === "complete") scheduleIdle();
  else window.addEventListener("load", scheduleIdle, { once: true });

  return () => {
    clearTimeouts();
    intentEvents.forEach((type) => trigger.removeEventListener(type, preload));
    trigger.removeEventListener("click", play);
    window.removeEventListener("load", scheduleIdle);
    if (idleId !== undefined) {
      if (hasIdle) cancelIdleCallback(idleId);
      else clearTimeout(idleId);
    }
  };
}
