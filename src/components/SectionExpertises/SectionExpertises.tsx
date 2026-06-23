import './style.scss'
import CardExpertise from './CardExpertise';
import { Expertise } from '../../types/Expertise';
import data from '../../data/data.json';

export default function SectionExpertises() {
    const expertises: Expertise[] = data.expertises;

    return (
        <section className="especialidades">
            <h1 style={{ marginTop: '5px' }}>Experience</h1>
            <div className="especialidades__grid">

                {expertises.map((item) => (
                    <CardExpertise
                        key={item.title}
                        title={item.title}
                        html_text={item.html_text}
                        url_img={item.url_img}
                        underline_class_css= {item.underline_class_css}
                    />
                ))}

            </div>
        </section>
    );
}