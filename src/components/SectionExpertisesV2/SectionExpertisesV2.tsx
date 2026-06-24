import './style.scss'
import { Expertise } from '../../types/Expertise';
import { sanitizeHtml } from '../../utils/sanitizeHtml';
import data from '../../data/data.json';

export default function SectionExpertisesV2() {
    const expertises: Expertise[] = data.expertises;

    return (
        <section className="expertise-v2">
            <header className="expertise-v2__header">
                <span className="expertise-v2__eyebrow">What I do</span>
                <h1 className="expertise-v2__title">Expertise</h1>
            </header>

            <div className="expertise-v2__grid">
                {expertises.map((item, index) => (
                    <article className="expertise-v2__item" key={item.title}>
                        <span className="expertise-v2__index">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <h2 className="expertise-v2__name">{item.title}</h2>
                        <span className="expertise-v2__divider" aria-hidden="true" />
                        <div
                            className="expertise-v2__text"
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.html_text) }}
                        />
                    </article>
                ))}
            </div>
        </section>
    );
}
