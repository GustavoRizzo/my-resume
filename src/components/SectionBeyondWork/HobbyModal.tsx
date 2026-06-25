import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HobbyTopic } from "../../types/Hobby";
import { sanitizeHtml } from "../../utils/sanitizeHtml";

interface HobbyModalProps {
    topic: HobbyTopic;
    onClose: () => void;
}

// Accessible overlay with the full detail of a topic.
// Closes on overlay click, the ✕ button, and the Esc key.
export default function HobbyModal({ topic, onClose }: HobbyModalProps) {
    const { t } = useTranslation();
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onClose]);

    const safeHtml = sanitizeHtml(topic.body_html);

    return (
        <div className="hobby-modal__overlay" onClick={onClose}>
            <div
                className="hobby-modal"
                role="dialog"
                aria-modal="true"
                aria-label={topic.title}
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="hobby-modal__close"
                    onClick={onClose}
                    aria-label={t("a11y.close")}
                >
                    ✕
                </button>

                <h2 className="hobby-modal__title">
                    <span className="hobby-modal__emoji" aria-hidden="true">{topic.emoji}</span>
                    {topic.title}
                </h2>

                <div
                    className="hobby-modal__body"
                    dangerouslySetInnerHTML={{ __html: safeHtml }}
                />

                {topic.links.length > 0 && (
                    <div className="hobby-modal__links">
                        {topic.links.map((link) => (
                            <a
                                key={link.url}
                                className="hobby-modal__link"
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link.label}
                                {link.note && (
                                    <span className="hobby-modal__badge">{link.note}</span>
                                )}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
