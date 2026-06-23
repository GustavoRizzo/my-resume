import { useEffect, useRef } from "react";
import { ConsolePhrase } from "../../types/ConsolePhrase";

export default function ConsoleTextAnimated ({console_phrases}:{console_phrases: ConsolePhrase[]}) {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (console_phrases.length === 0) return;

    // Work on a copy to avoid mutating the prop array
    const consoleInputs = [...console_phrases];

    const timeBeforeStartNewPhrase = 1000;
    const timeBeforeStartErase = 2000;
    const timeOfEachLetter = 120;
    const timeCursorBlink = 500;

    let letterCount = 1;
    let directional = 1;  // 1: typing forward, -1: typing backwards
    let waiting = false;
    let visible = true;
    let timeoutId: number | undefined;

    // Set starting color
    if (textRef.current) {
      textRef.current.style.color = consoleInputs[0].color || "";
    }

    const typingIntervalId = window.setInterval(() => {
      const textElement = textRef.current;
      if (!textElement) return;

      if (letterCount === 0 && !waiting) {
        waiting = true;
        textElement.textContent = consoleInputs[0].phrase.substring(0, letterCount);

        // Change Phrase
        timeoutId = window.setTimeout(() => {
          const input = consoleInputs.shift();
          if (input) {
            consoleInputs.push(input);
          }
          directional = 1;
          letterCount += directional;
          waiting = false;
          // set the new color
          if (textRef.current) {
            textRef.current.style.color = consoleInputs[0].color || "";
          }
        }, timeBeforeStartNewPhrase);

      } else if (letterCount === consoleInputs[0].phrase.length + 1 && !waiting) {
        // finished writing the phrase
        waiting = true;
        timeoutId = window.setTimeout(() => {
          directional = -1;
          letterCount += directional;
          waiting = false;
        }, timeBeforeStartErase);
      } else if (!waiting) {
        textElement.textContent = consoleInputs[0].phrase.substring(0, letterCount);
        letterCount += directional;
      }
    }, timeOfEachLetter);

    // Make the cursor blink
    const blinkIntervalId = window.setInterval(() => {
      const cursorElement = cursorRef.current;
      if (!cursorElement) return;

      if (visible) {
        cursorElement.className = "console-underscore hidden";
        visible = false;
      } else {
        cursorElement.className = "console-underscore";
        visible = true;
      }
    }, timeCursorBlink);

    // Cleanup function to clear intervals and timeout on unmount
    return () => {
      window.clearInterval(typingIntervalId);
      window.clearInterval(blinkIntervalId);
      window.clearTimeout(timeoutId);
    };
  }, [console_phrases]);

  return (
    <div className="console-container">
      <span ref={textRef} id="console-text-id"></span>
      <div ref={cursorRef} className="console-underscore hidden" id="console-cursor">
        ▊
      </div>
    </div>
  );
}
