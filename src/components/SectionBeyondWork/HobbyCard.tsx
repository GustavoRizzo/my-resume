import { CSSProperties } from "react";
import { HobbyTopic } from "../../types/Hobby";

interface HobbyCardProps {
    topic: HobbyTopic;
    index: number;
    onOpen: (id: string) => void;
}

// Compact, clickable card showing only the emoji, title and summary.
// This is the presentation layer (fanned "deck of cards" look): the card's
// position in the fan is driven purely by the `--i` CSS variable, so the
// layout can be reskinned again without touching content or modal logic.
export default function HobbyCard({ topic, index, onOpen }: HobbyCardProps) {
    return (
        <button
            type="button"
            className="hobby-card"
            style={{ "--i": index } as CSSProperties}
            onClick={() => onOpen(topic.id)}
            aria-label={`Open details about ${topic.title}`}
        >
            <span className="hobby-card__emoji" aria-hidden="true">{topic.emoji}</span>
            <h2 className="hobby-card__title">{topic.title}</h2>
            <p className="hobby-card__summary">{topic.summary}</p>
            <span className="hobby-card__hint">Read more →</span>
        </button>
    );
}
