import { useEffect, useRef, useState } from 'react';
import perfil from "../../assets/perfil.png";
import linkedinIcon from "../../assets/icons/linkedin.svg";
import githubIcon from "../../assets/icons/github.svg";
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
                {/* Easter-egg hint: "click" twice around the photo, slowly
                    rotating, fading in and out on a cycle (see style.scss). */}
                <svg className="about_click_hint" viewBox="0 0 100 100" aria-hidden="true">
                    <defs>
                        <path
                            id="click-hint-circle"
                            d="M 50,50 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
                        />
                    </defs>
                    <text>
                        <textPath href="#click-hint-circle" startOffset="0%">click</textPath>
                        <textPath href="#click-hint-circle" startOffset="50%">click</textPath>
                    </text>
                </svg>
            </div>
            <h1 className="hero-title">{name}</h1>
            < ConsoleTextAnimated console_phrases={console_phrases} />
            <div className="list_contato">
                <a href={url_linkedin} aria-label="LinkedIn">
                    <img className="linkedin" src={linkedinIcon.src} alt="" />
                </a>
                <a href={url_github} aria-label="GitHub">
                    <img className="github" src={githubIcon.src} alt="" />
                </a>
            </div>
        </section>
    );
}
