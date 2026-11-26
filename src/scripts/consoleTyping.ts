import type { ConsolePhrase } from "../types/ConsolePhrase";

// Console "typewriter" under the hero title: types each phrase letter by
// letter, waits, erases it, then moves on to the next one (cycling forever),
// with a blinking block cursor. Vanilla port of the old React
// ConsoleTextAnimated island, so the hero needs no framework runtime.

export const TIMINGS = {
  beforeNewPhrase: 1000,
  beforeErase: 2000,
  perLetter: 120,
  cursorBlink: 500,
} as const;

/** Starts the animation; returns a function that stops it. */
export function startConsoleTyping(
  textEl: HTMLElement,
  cursorEl: HTMLElement,
  phrases: ConsolePhrase[],
): () => void {
  if (phrases.length === 0) return () => {};

  // Work on a copy: the queue is rotated as phrases are shown.
  const queue = [...phrases];

  let letterCount = 1;
  let direction = 1; // 1: typing forward, -1: erasing
  let waiting = false;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  textEl.style.color = queue[0].color || "";

  const typingId = setInterval(() => {
    if (waiting) return;
    const phrase = queue[0].phrase;

    if (letterCount === 0) {
      // Fully erased: pause, then switch to the next phrase.
      waiting = true;
      textEl.textContent = "";
      timeoutId = setTimeout(() => {
        queue.push(queue.shift()!);
        direction = 1;
        letterCount += direction;
        waiting = false;
        textEl.style.color = queue[0].color || "";
      }, TIMINGS.beforeNewPhrase);
    } else if (letterCount === phrase.length + 1) {
      // Fully typed: pause, then start erasing.
      waiting = true;
      timeoutId = setTimeout(() => {
        direction = -1;
        letterCount += direction;
        waiting = false;
      }, TIMINGS.beforeErase);
    } else {
      textEl.textContent = phrase.substring(0, letterCount);
      letterCount += direction;
    }
  }, TIMINGS.perLetter);

  const blinkId = setInterval(() => {
    cursorEl.classList.toggle("hidden");
  }, TIMINGS.cursorBlink);

  return () => {
    clearInterval(typingId);
    clearInterval(blinkId);
    clearTimeout(timeoutId);
  };
}
