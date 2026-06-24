import './style.scss'
import { Expertise } from '../../types/Expertise';
import { sanitizeHtml } from '../../utils/sanitizeHtml';
import ExpertiseIcon from '../ExpertiseIcon/ExpertiseIcon';
import data from '../../data/data.json';

export default function SectionExpertisesV3() {
    const expertises: Expertise[] = data.expertises;

    return (
        <section className="expertise-v3">
            <h1 className="expertise-v3__title">My Expertise</h1>

            <div className="expertise-v3__grid">
                {expertises.map((item) => {
                    const [firstWord, ...rest] = item.title.split(' ');
                    const codeTag = item.code_tag ?? 'div';
                    return (
                        <article className="expertise-v3__item" key={item.title}>
                            <div className="expertise-v3__headline">
                                <div className="expertise-v3__icon">
                                    <ExpertiseIcon icon={item.icon} url_img={item.url_img} title={item.title} />
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
                                <span className="expertise-v3__tag">&lt;{codeTag}&gt;</span>
                                <div
                                    className="expertise-v3__text"
                                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.html_text) }}
                                />
                                <span className="expertise-v3__tag">&lt;/{codeTag}&gt;</span>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
