import './style.scss'
import { Expertise } from '../../types/Expertise';
import { sanitizeHtml } from '../../utils/sanitizeHtml';
import data from '../../data/data.json';

export default function SectionExpertisesV3() {
    const expertises: Expertise[] = data.expertises;

    return (
        <section className="expertise-v3">
            <h1 className="expertise-v3__title">My Expertise</h1>

            <div className="expertise-v3__grid">
                {expertises.map((item) => {
                    const [firstWord, ...rest] = item.title.split(' ');
                    return (
                        <article className="expertise-v3__item" key={item.title}>
                            <div className="expertise-v3__headline">
                                <div className="expertise-v3__icon">
                                    <img src={item.url_img} alt={item.title} />
                                </div>
                                <h5 className="expertise-v3__name">
                                    <span className={`expertise-v3__underline ${item.underline_class_css}`}>
                                        {firstWord}
                                    </span>
                                    <br />
                                    {rest.join(' ')}
                                </h5>
                            </div>

                            <div className="expertise-v3__code">
                                <span className="expertise-v3__tag">&lt;h3&gt;</span>
                                <div
                                    className="expertise-v3__text"
                                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.html_text) }}
                                />
                                <span className="expertise-v3__tag">&lt;/h3&gt;</span>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
