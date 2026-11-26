import { CLASSES, setupBreakpoints } from "./breakpoints";

// A card like SectionExpertises renders: tag line, text with <p>/<li> lines.
// jsdom has no layout, so rects are mocked: card inner edge at x = 76, code
// block at x = 100 with a 36px gutter, and each line 20px tall, stacked.
const CARD_LEFT = 76;
const CODE_LEFT = 100;
const LINE_H = 20;

function setup(textHtml = "<p><b>Backend:</b></p><ul><li>Python</li><li>C#</li></ul>") {
  document.body.innerHTML = `
    <article class="expertise-v3__item">
      <div class="expertise-v3__code" style="padding-left: 36px">
        <span class="expertise-v3__tag">&lt;dl&gt;</span>
        <div class="expertise-v3__text">${textHtml}</div>
        <span class="expertise-v3__tag">&lt;/dl&gt;</span>
      </div>
    </article>`;
  const card = document.querySelector<HTMLElement>(".expertise-v3__item")!;
  const code = card.querySelector<HTMLElement>(".expertise-v3__code")!;
  vi.spyOn(card, "getBoundingClientRect").mockReturnValue({ left: CARD_LEFT } as DOMRect);
  vi.spyOn(code, "getBoundingClientRect").mockReturnValue({ left: CODE_LEFT } as DOMRect);

  // Lines in document order (querySelectorAll keeps it), as the gutter numbers them.
  const text = card.querySelector(".expertise-v3__text")!;
  const lines = text.querySelector("p, li")
    ? [...card.querySelectorAll<HTMLElement>(".expertise-v3__tag, .expertise-v3__text p, .expertise-v3__text li")]
    : [...card.querySelectorAll<HTMLElement>(".expertise-v3__tag, .expertise-v3__text")];
  lines.forEach((el, i) =>
    vi.spyOn(el, "getBoundingClientRect").mockReturnValue({ top: i * LINE_H, bottom: (i + 1) * LINE_H } as DOMRect),
  );

  setupBreakpoints(document);
  return { card, lines };
}

/** Click at (x, middle of line i). */
const clickLine = (card: Element, x: number, i: number) =>
  card.dispatchEvent(new MouseEvent("click", { bubbles: true, clientX: x, clientY: i * LINE_H + LINE_H / 2 }));

const GUTTER_X = 110; //  over the line numbers
const PADDING_X = 80; //  card padding, left of the code block
const TEXT_X = 200; //    over the line text

describe("setupBreakpoints", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  it("toggles the breakpoint of the line at the click's height, inside the gutter", () => {
    const { card, lines } = setup(); // <dl>, Backend:, Python, C#, </dl>

    clickLine(card, GUTTER_X, 2);
    expect(lines[2].textContent).toBe("Python");
    expect(lines[2].classList.contains(CLASSES.breakpoint)).toBe(true);
    expect(card.classList.contains(CLASSES.cardHasBreakpoints)).toBe(true);

    clickLine(card, GUTTER_X, 2);
    expect(lines[2].classList.contains(CLASSES.breakpoint)).toBe(false);
    expect(card.classList.contains(CLASSES.cardHasBreakpoints)).toBe(false);
  });

  it("also reacts in the card padding left of the code (a generous hit area)", () => {
    const { card, lines } = setup();
    clickLine(card, PADDING_X, 1);
    expect(lines[1].classList.contains(CLASSES.breakpoint)).toBe(true);
  });

  it("ignores clicks over the line text (selection and scrolling stay safe)", () => {
    const { card } = setup();
    clickLine(card, TEXT_X, 2);
    expect(card.querySelector(`.${CLASSES.breakpoint}`)).toBeNull();
    expect(card.classList.contains(CLASSES.cardHasBreakpoints)).toBe(false);
  });

  it("ignores clicks below the last line", () => {
    const { card } = setup();
    clickLine(card, GUTTER_X, 9);
    expect(card.querySelector(`.${CLASSES.breakpoint}`)).toBeNull();
  });

  it("keeps the card flagged while any of its lines has a breakpoint", () => {
    const { card } = setup();
    clickLine(card, GUTTER_X, 2);
    clickLine(card, GUTTER_X, 3);
    clickLine(card, GUTTER_X, 2);
    expect(card.classList.contains(CLASSES.cardHasBreakpoints)).toBe(true);
  });

  it("treats a prose-only text block as one line", () => {
    const { card, lines } = setup("Managed teams in <b>finance</b>.");
    clickLine(card, GUTTER_X, 1);
    expect(lines[1].classList.contains("expertise-v3__text")).toBe(true);
    expect(lines[1].classList.contains(CLASSES.breakpoint)).toBe(true);
  });
});
