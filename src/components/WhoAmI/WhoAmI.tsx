import { useEffect, useRef, useState } from 'react';
import linkedin from '../../assets/linkedIn_logo.png';
import github from "../../assets/github_logo.png";
import perfil from "../../assets/perfil.png";
import easterEgg2 from "../../assets/perfil_easter_egg_2.webp";
import easterEgg3 from "../../assets/perfil_easter_egg_3.webp";
import './style.scss'
import ConsoleTextAnimated from "../../components/ConsoleTextAnimated/ConsoleTextAnimated";
import type { About } from "../../types/About";

// Easter egg: clicking the profile photo briefly swaps it for two alternate
// images before returning to the original. All images are bundled imports, so
// Vite emits hashed URLs under the configured base — no runtime path math.
const EASTER_EGG_2 = easterEgg2.src;
const EASTER_EGG_3 = easterEgg3.src;
const STEP_2_MS = 300;
const STEP_3_MS = 500;

export default function WhoAmI( {name, url_linkedin, url_github, console_phrases}:Omit<About, "perfil_img"> ) {

    const perfilSrc = perfil.src;
    const [currentImg, setCurrentImg] = useState(perfilSrc);
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
            setTimeout(() => setCurrentImg(perfilSrc), STEP_2_MS + STEP_3_MS)
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
                        src={linkedin.src}
                        alt="linkedin"
                    />
                </a>
                <a href={url_github}>
                    <img
                        className="github"
                        src={github.src}
                        alt="github"
                    />
                </a>
            </div>
        </section>
    );
}
