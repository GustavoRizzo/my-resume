// Easter egg for the expertise "code editor" cards: click (or tap) next to a
// line number to toggle a debugger breakpoint, like in an IDE.
// Hit area: a vertical band on the left of the code — from the card's inner
// edge to the end of the gutter — and the line is picked by height, so the
// target is generous without touching the text: the line text stays
// selectable and a finger scrolling through it can't set one by accident.
// Purely decorative and session-only: nothing is saved, a reload clears all.

const CODE = ".expertise-v3__code";
const CARD = ".expertise-v3__item";
// The "lines" that carry a number in the gutter (mirrors style.scss).
const LINE = ".expertise-v3__tag, .expertise-v3__text p, .expertise-v3__text li, .expertise-v3__text";
const TEXT = "expertise-v3__text";

export const CLASSES = {
  breakpoint: "is-breakpoint", //  a line with a breakpoint
  preview: "is-gutter-hover", //   the line the mouse would toggle
  overGutter: "is-over-gutter", // the card while the mouse is in the hit band
  cardHasBreakpoints: "has-breakpoints",
} as const;

/** Inside the hit band: card's inner left edge → end of the gutter (the code block's left padding). */
function inBand(card: HTMLElement, code: HTMLElement, clientX: number): boolean {
  const gutter = parseFloat(getComputedStyle(code).paddingLeft) || 0;
  return clientX >= card.getBoundingClientRect().left && clientX < code.getBoundingClientRect().left + gutter;
}

/** The numbered line at that height, or null. Lines never overlap vertically. */
function lineAt(code: HTMLElement, clientY: number): HTMLElement | null {
  for (const el of code.querySelectorAll<HTMLElement>(LINE)) {
    // a text block that only wraps <p>/<li> lines isn't a line itself
    if (el.classList.contains(TEXT) && el.querySelector("p, li")) continue;
    const { top, bottom } = el.getBoundingClientRect();
    if (clientY >= top && clientY < bottom) return el;
  }
  return null;
}

export function setupBreakpoints(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>(CARD).forEach((card) => {
    const code = card.querySelector<HTMLElement>(CODE);
    if (!code) return;

    const target = (event: MouseEvent) =>
      inBand(card, code, event.clientX) ? lineAt(code, event.clientY) : null;

    const setPreview = (line: HTMLElement | null) => {
      code.querySelectorAll(`.${CLASSES.preview}`).forEach((el) => {
        if (el !== line) el.classList.remove(CLASSES.preview);
      });
      line?.classList.add(CLASSES.preview);
      card.classList.toggle(CLASSES.overGutter, line !== null);
    };

    card.addEventListener("click", (event) => {
      const line = target(event);
      if (!line) return;
      line.classList.toggle(CLASSES.breakpoint);
      card.classList.toggle(CLASSES.cardHasBreakpoints, code.querySelector(`.${CLASSES.breakpoint}`) !== null);
    });

    // Clicking in the band must not start a text selection.
    card.addEventListener("mousedown", (event) => {
      if (target(event)) event.preventDefault();
    });

    // Mouse only: preview dot + pointer cursor while over the band.
    card.addEventListener("pointermove", (event) => {
      if (event.pointerType === "mouse") setPreview(target(event));
    });
    card.addEventListener("pointerleave", () => setPreview(null));
  });
}
