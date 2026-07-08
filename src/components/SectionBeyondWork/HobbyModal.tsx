import { useEffect, useState } from "react";
import type { HobbyTopic } from "../../types/Hobby";
import type { BeyondWorkLabels } from "./labels";
import { withBase } from "../../utils/withBase";

interface HobbyModalProps {
    topic: HobbyTopic;
    onClose: () => void;
    labels: BeyondWorkLabels;
}

// Accessible overlay with the full detail of a topic.
// Closes on overlay click, the ✕ button, and the Esc key.
export default function HobbyModal({ topic, onClose, labels }: HobbyModalProps) {
    // Index of the image open in the lightbox, or null when it is closed.
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const expandedImage = expandedIndex !== null ? topic.images[expandedIndex] : null;

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                // Esc closes the lightbox first; only then the modal itself.
                setExpandedIndex((index) => {
                    if (index === null) onClose();
                    return null;
                });
            } else if (event.key === "ArrowLeft") {
                setExpandedIndex((index) =>
                    index === null ? null : (index + topic.images.length - 1) % topic.images.length,
                );
            } else if (event.key === "ArrowRight") {
                setExpandedIndex((index) =>
                    index === null ? null : (index + 1) % topic.images.length,
                );
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onClose, topic.images.length]);

    // body_html arrives pre-sanitized from the page frontmatter (build time).
    const safeHtml = topic.body_html;

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
                    aria-label={labels.close}
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

                {topic.images.length > 0 && (
                    <div className="hobby-modal__gallery">
                        {topic.images.map((image, index) => (
                            <button
                                key={image.src}
                                type="button"
                                className="hobby-modal__photo-button"
                                onClick={() => setExpandedIndex(index)}
                                aria-label={labels.expandImage.replace("{{alt}}", image.alt)}
                            >
                                <img
                                    className="hobby-modal__photo"
                                    src={withBase(image.src)}
                                    alt={image.alt}
                                    loading="lazy"
                                />
                            </button>
                        ))}
                    </div>
                )}

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

                {expandedImage && (
                    <div
                        className="hobby-lightbox"
                        role="dialog"
                        aria-modal="true"
                        aria-label={expandedImage.alt}
                        onClick={() => setExpandedIndex(null)}
                    >
                        <button
                            type="button"
                            className="hobby-lightbox__close"
                            onClick={() => setExpandedIndex(null)}
                            aria-label={labels.close}
                        >
                            ✕
                        </button>

                        {topic.images.length > 1 && (
                            <button
                                type="button"
                                className="hobby-lightbox__nav hobby-lightbox__nav--prev"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setExpandedIndex(
                                        (expandedIndex! + topic.images.length - 1) % topic.images.length,
                                    );
                                }}
                                aria-label={labels.previousImage}
                            >
                                ‹
                            </button>
                        )}

                        <img
                            className="hobby-lightbox__image"
                            src={withBase(expandedImage.src)}
                            alt={expandedImage.alt}
                            onClick={(event) => event.stopPropagation()}
                        />

                        {topic.images.length > 1 && (
                            <button
                                type="button"
                                className="hobby-lightbox__nav hobby-lightbox__nav--next"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setExpandedIndex((expandedIndex! + 1) % topic.images.length);
                                }}
                                aria-label={labels.nextImage}
                            >
                                ›
                            </button>
                        )}

                        <p className="hobby-lightbox__caption">{expandedImage.alt}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
