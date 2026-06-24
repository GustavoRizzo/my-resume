import { useEffect, useRef, useState } from 'react';
import linkedin from '../../../public/images/linkedIn_logo.png';
import github from "../../../public/images/github_logo.png";
import './style.scss'
import ConsoleTextAnimated from "../../components/ConsoleTextAnimated/ConsoleTextAnimated";
import { About } from "../../types/About";

// Easter egg: clicking the profile photo briefly swaps it for two alternate
// images before returning to the original. Files live in `public/` and are
// resolved against BASE_URL so they work under the `/my-resume/` GitHub Pages base.
const EASTER_EGG_2 = `${import.meta.env.BASE_URL}perfil_easter_egg_2.webp`;
const EASTER_EGG_3 = `${import.meta.env.BASE_URL}perfil_easter_egg_3.webp`;
const STEP_2_MS = 300;
const STEP_3_MS = 500;

export default function WhoAmI( {name, perfil_img, url_linkedin, url_github, console_phrases}:About ) {

    const [currentImg, setCurrentImg] = useState(perfil_img);
    const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    // Preload the easter egg images so the swap is instant.
    useEffect(() => {
        [EASTER_EGG_2, EASTER_EGG_3].forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    // Clear any pending timeouts on unmount to avoid setting state after teardown.
    useEffect(() => () => clearTimeouts(), []);

    function clearTimeouts() {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
    }

    function playEasterEgg() {
        // Restart the sequence from scratch on every click.
        clearTimeouts();
        setCurrentImg(EASTER_EGG_2);
        timeoutsRef.current.push(
            setTimeout(() => setCurrentImg(EASTER_EGG_3), STEP_2_MS),
            setTimeout(() => setCurrentImg(perfil_img), STEP_2_MS + STEP_3_MS)
        );
    }

    return (
        <section className="about">
            <div className="about_perfil_wrap" onClick={playEasterEgg}>
                <img
                    className="about_img_perfil"
                    src={currentImg}
                    alt="perfil"
                />
            </div>
            <h1 className="hero-title">{name}</h1>
            < ConsoleTextAnimated console_phrases={console_phrases} />
            <div className="list_contato">
                <a href={url_linkedin}>
                    <img
                        className="linkedin"
                        src={linkedin}
                        alt="linkedin"
                    />
                </a>
                <a href={url_github}>
                    <img
                        className="github"
                        src={github}
                        alt="github"
                    />
                </a>
            </div>
        </section>
    );
}
