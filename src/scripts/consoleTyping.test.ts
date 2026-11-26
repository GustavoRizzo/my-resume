import { startConsoleTyping, TIMINGS } from "./consoleTyping";

const phrases = [
  { phrase: "Hi", color: "#FF0000" },
  { phrase: "Yo", color: "#00FF00" },
];

function setup(list = phrases) {
  const text = document.createElement("span");
  const cursor = document.createElement("div");
  cursor.className = "console-underscore hidden";
  // Attached, so computed styles (toHaveStyle) are available.
  document.body.append(text, cursor);
  const stop = startConsoleTyping(text, cursor, list);
  return { text, cursor, stop };
}

describe("startConsoleTyping", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  it("starts with the first phrase's color", () => {
    const { text, stop } = setup();
    expect(text).toHaveStyle("color: rgb(255, 0, 0)");
    stop();
  });

  it("types letter by letter, erases, then moves to the next phrase", () => {
    const { text, stop } = setup();
    vi.advanceTimersByTime(TIMINGS.perLetter);
    expect(text.textContent).toBe("H");
    vi.advanceTimersByTime(TIMINGS.perLetter);
    expect(text.textContent).toBe("Hi");

    // Fully typed → pause → erase back to nothing.
    vi.advanceTimersByTime(TIMINGS.perLetter + TIMINGS.beforeErase);
    vi.advanceTimersByTime(TIMINGS.perLetter * 3);
    expect(text.textContent).toBe("");

    // Pause, switch phrase (and color), type again.
    vi.advanceTimersByTime(TIMINGS.beforeNewPhrase + TIMINGS.perLetter * 2);
    expect(text).toHaveStyle("color: rgb(0, 255, 0)");
    // The second phrase is being typed (exact letter depends on tick phase).
    expect(text.textContent).toMatch(/^Yo?$/);
    stop();
  });

  it("blinks the cursor", () => {
    const { cursor, stop } = setup();
    vi.advanceTimersByTime(TIMINGS.cursorBlink);
    expect(cursor).not.toHaveClass("hidden");
    vi.advanceTimersByTime(TIMINGS.cursorBlink);
    expect(cursor).toHaveClass("hidden");
    stop();
  });

  it("stops every timer when stopped", () => {
    const { text, stop } = setup();
    stop();
    vi.advanceTimersByTime(10_000);
    expect(text.textContent).toBe("");
    expect(vi.getTimerCount()).toBe(0);
  });

  it("does nothing without phrases", () => {
    setup([]);
    expect(vi.getTimerCount()).toBe(0);
  });
});
