import type { CSSProperties } from "react";
import type { HobbyTopic } from "../../types/Hobby";
import type { BeyondWorkLabels } from "./labels";

interface HobbyCardProps {
    topic: HobbyTopic;
    index: number;
    onOpen: (id: string) => void;
    labels: BeyondWorkLabels;
    /** Heading level of the card title (one below the section title). */
    headingLevel: 2 | 3;
}

// Compact card showing only the emoji, title and summary.
// This is the presentation layer (fanned "deck of cards" look): the card's
// position in the fan is driven purely by the `--i` CSS variable, so the
// layout can be reskinned again without touching content or modal logic.
// Semantics: an <article> with a real heading; the open button lives inside
// the heading and is stretched over the whole card in CSS, so the entire card
// stays clickable without nesting block content inside a <button>.
export default function HobbyCard({ topic, index, onOpen, labels, headingLevel }: HobbyCardProps) {
    const Heading = `h${headingLevel}` as const;
    return (
        <article className="hobby-card" style={{ "--i": index } as CSSProperties}>
            <span className="hobby-card__emoji" aria-hidden="true">{topic.emoji}</span>
            <Heading className="hobby-card__title">
                <button
                    type="button"
                    className="hobby-card__open"
                    onClick={() => onOpen(topic.id)}
                    aria-label={labels.openDetails.replace("{{title}}", topic.title)}
                >
                    {topic.title}
                </button>
            </Heading>
            <p className="hobby-card__summary">{topic.summary}</p>
            <span className="hobby-card__hint" aria-hidden="true">{labels.readMore}</span>
        </article>
    );
}
