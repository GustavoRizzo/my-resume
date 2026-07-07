import type { CSSProperties } from "react";
import type { HobbyTopic } from "../../types/Hobby";
import type { BeyondWorkLabels } from "./labels";

interface HobbyCardProps {
    topic: HobbyTopic;
    index: number;
    onOpen: (id: string) => void;
    labels: BeyondWorkLabels;
}

// Compact, clickable card showing only the emoji, title and summary.
// This is the presentation layer (fanned "deck of cards" look): the card's
// position in the fan is driven purely by the `--i` CSS variable, so the
// layout can be reskinned again without touching content or modal logic.
export default function HobbyCard({ topic, index, onOpen, labels }: HobbyCardProps) {
    return (
        <button
            type="button"
            className="hobby-card"
            style={{ "--i": index } as CSSProperties}
            onClick={() => onOpen(topic.id)}
            aria-label={labels.openDetails.replace("{{title}}", topic.title)}
        >
            <span className="hobby-card__emoji" aria-hidden="true">{topic.emoji}</span>
            <h2 className="hobby-card__title">{topic.title}</h2>
            <p className="hobby-card__summary">{topic.summary}</p>
            <span className="hobby-card__hint">{labels.readMore}</span>
        </button>
    );
}
