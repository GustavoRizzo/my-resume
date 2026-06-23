import { useState } from "react";
import "./style.scss";
import HobbyCard from "./HobbyCard";
import HobbyModal from "./HobbyModal";
import { HobbiesData } from "../../types/Hobby";
import hobbies from "../../data/hobbies/en.json";

export default function SectionBeyondWork() {
    const data = hobbies as HobbiesData;
    const [openId, setOpenId] = useState<string | null>(null);

    const openTopic = data.topics.find((topic) => topic.id === openId) ?? null;

    return (
        <section className="beyond-work">
            <h1 style={{ marginTop: "5px" }}>{data.section.title}</h1>
            <p className="beyond-work__subtitle">{data.section.subtitle}</p>

            <div className="beyond-work__grid">
                {data.topics.map((topic) => (
                    <HobbyCard key={topic.id} topic={topic} onOpen={setOpenId} />
                ))}
            </div>

            {openTopic && (
                <HobbyModal topic={openTopic} onClose={() => setOpenId(null)} />
            )}
        </section>
    );
}
