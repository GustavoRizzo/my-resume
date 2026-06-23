import { Expertise } from "../../types/Expertise";
import { sanitizeHtml } from "../../utils/sanitizeHtml";

export default function CardExpertise( {title, html_text, url_img, underline_class_css}:Expertise ) {
    const safeHtmlText = sanitizeHtml(html_text);

    return (
        <div className="card">
            <div className="card__icon">
                <img
                    className="icon"
                    src={url_img}
                    alt={title}
                />
            </div>
            <h2>
                <span className={`chonky-underline ${underline_class_css}`}>
                    {title}
                </span>
            </h2>
            <div className="card__text" dangerouslySetInnerHTML={{ __html: safeHtmlText }} />
        </div>
    );
}