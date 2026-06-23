import { HobbyTopic } from "../../types/Hobby";

interface HobbyCardProps {
    topic: HobbyTopic;
    onOpen: (id: string) => void;
}

// Compact, clickable card showing only the emoji, title and summary.
// This is the presentation layer meant to be reskinned in the future
// (e.g. a "deck of cards" look) without touching content or modal logic.
export default function HobbyCard({ topic, onOpen }: HobbyCardProps) {
    return (
        <button
            type="button"
            className="hobby-card"
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
