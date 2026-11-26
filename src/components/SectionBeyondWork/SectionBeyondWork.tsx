import { useState } from "react";
import type { CSSProperties } from "react";
import "./style.scss";
import HobbyCard from "./HobbyCard";
import HobbyModal from "./HobbyModal";
import type { HobbiesData } from "../../types/Hobby";
import type { BeyondWorkLabels } from "./labels";

interface SectionBeyondWorkProps {
    hobbies: HobbiesData;
    labels: BeyondWorkLabels;
    /** Heading level of the section title: 1 on its own page, 2 inside the home. */
    level?: 1 | 2;
}

export default function SectionBeyondWork({ hobbies: data, labels, level = 1 }: SectionBeyondWorkProps) {
    const [openId, setOpenId] = useState<string | null>(null);
    const SectionHeading = `h${level}` as const;

    const openTopic = data.topics.find((topic) => topic.id === openId) ?? null;

    return (
        <section className="beyond-work">
            <SectionHeading className="section-title">{data.section.title}</SectionHeading>
            <p className="beyond-work__subtitle">{data.section.subtitle}</p>

            <div
                className="beyond-work__fan"
                style={{ "--total": data.topics.length } as CSSProperties}
            >
                {data.topics.map((topic, index) => (
                    <HobbyCard
                        key={topic.id}
                        topic={topic}
                        index={index}
                        onOpen={setOpenId}
                        labels={labels}
                        headingLevel={level === 1 ? 2 : 3}
                    />
                ))}
            </div>

            {openTopic && (
                <HobbyModal topic={openTopic} onClose={() => setOpenId(null)} labels={labels} />
            )}
        </section>
    );
}
