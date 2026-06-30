import { CSSProperties, useState } from "react";
import "./style.scss";
import HobbyCard from "./HobbyCard";
import HobbyModal from "./HobbyModal";
import { HobbiesData } from "../../types/Hobby";

interface SectionBeyondWorkProps {
    hobbies: HobbiesData;
}

export default function SectionBeyondWork({ hobbies: data }: SectionBeyondWorkProps) {
    const [openId, setOpenId] = useState<string | null>(null);

    const openTopic = data.topics.find((topic) => topic.id === openId) ?? null;

    return (
        <section className="beyond-work">
            <h1 className="section-title">{data.section.title}</h1>
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
                    />
                ))}
            </div>

            {openTopic && (
                <HobbyModal topic={openTopic} onClose={() => setOpenId(null)} />
            )}
        </section>
    );
}
