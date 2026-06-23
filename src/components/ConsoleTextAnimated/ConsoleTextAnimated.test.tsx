import { render, act } from '@testing-library/react';
import ConsoleTextAnimated from './ConsoleTextAnimated';
import { ConsolePhrase } from '../../types/ConsolePhrase';

describe('ConsoleTextAnimated Component', () => {
  const mockPhrases: ConsolePhrase[] = [
    { phrase: 'Hello World', color: '#FF0000' },
    { phrase: 'React Developer', color: '#00FF00' },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders correctly and sets initial color', () => {
    const { container } = render(<ConsoleTextAnimated console_phrases={mockPhrases} />);
    const textElement = container.querySelector('#console-text-id');
    expect(textElement).toBeInTheDocument();
    
    // Note: jsdom parses hex colors to rgb format
    expect(textElement).toHaveStyle('color: rgb(255, 0, 0)');
  });

  it('types letters incrementally over time', () => {
    const { container } = render(<ConsoleTextAnimated console_phrases={mockPhrases} />);
    const textElement = container.querySelector('#console-text-id');
    expect(textElement).toBeInTheDocument();

    // First letter
    act(() => {
      vi.advanceTimersByTime(120); // timeOfEachLetter
    });
    expect(textElement?.textContent).toBe('H');

    // Second letter
    act(() => {
      vi.advanceTimersByTime(120);
    });
    expect(textElement?.textContent).toBe('He');

    // Wait for the whole first phrase to type (11 letters)
    act(() => {
      vi.advanceTimersByTime(120 * 9);
    });
    expect(textElement?.textContent).toBe('Hello World');
  });

  it('toggles cursor blink class', () => {
    const { container } = render(<ConsoleTextAnimated console_phrases={mockPhrases} />);
    const cursorElement = container.querySelector('#console-cursor');
    expect(cursorElement).toBeInTheDocument();
    expect(cursorElement).toHaveClass('console-underscore');

    act(() => {
      vi.advanceTimersByTime(500); // timeCursorBlink
    });
    expect(cursorElement).toHaveClass('console-underscore hidden');

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(cursorElement).not.toHaveClass('hidden');
  });

  it('clears intervals and timeouts on unmount', () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

    const { unmount } = render(<ConsoleTextAnimated console_phrases={mockPhrases} />);
    
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    expect(clearTimeoutSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
    clearTimeoutSpy.mockRestore();
  });
});
