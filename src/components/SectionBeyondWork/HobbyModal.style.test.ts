import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Regression guard for the mobile "growing/shrinking loop" bug: on narrow
// viewports, .hobby-modal is a flex item inside .hobby-modal__overlay. Without
// `min-width: 0`, a flex item's automatic min-width is its content's
// min-content size, which can force the modal wider than the viewport
// (horizontal scroll), which in turn shifts the mobile browser's viewport
// (toolbar collapse) and re-triggers the layout — an endless grow/shrink loop.
// Vitest doesn't apply SCSS in jsdom (no real layout), so this asserts the
// fix directly against the stylesheet source instead of computed styles.
describe("hobby-modal styles", () => {
  const scss = readFileSync(join(__dirname, "style.scss"), "utf-8");

  function block(selectorRegex: RegExp): string {
    const match = scss.match(selectorRegex);
    expect(match, `could not find block matching ${selectorRegex}`).not.toBeNull();
    return match![0];
  }

  it("lets .hobby-modal shrink below its content's min-content size", () => {
    const hobbyModalBlock = block(/\.hobby-modal\s*\{[^}]*\}/);
    expect(hobbyModalBlock).toMatch(/min-width:\s*0/);
  });

  it("wraps long body content instead of overflowing horizontally", () => {
    const bodyBlock = block(/&__body\s*\{[^}]*\}/);
    expect(bodyBlock).toMatch(/overflow-wrap:\s*anywhere/);
  });

  it("wraps long link labels/urls instead of overflowing horizontally", () => {
    const linkBlock = block(/&__link\s*\{[^}]*\}/);
    expect(linkBlock).toMatch(/overflow-wrap:\s*anywhere/);
    expect(linkBlock).toMatch(/max-width:\s*100%/);
  });
});

describe("global overflow guard", () => {
  it("prevents the whole page from scrolling horizontally as a defensive fallback", () => {
    const indexCss = readFileSync(join(__dirname, "../../index.css"), "utf-8");
    const bodyBlock = indexCss.match(/body\s*\{[^}]*\}/)?.[0] ?? "";
    expect(bodyBlock).toMatch(/overflow-x:\s*hidden/);
  });
});
