import { Expertise } from "../../types/Expertise";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import ExpertiseIcon from "../ExpertiseIcon/ExpertiseIcon";

export default function CardExpertise( {title, html_text, url_img, underline_class_css, icon}:Expertise ) {
    const safeHtmlText = sanitizeHtml(html_text);

    return (
        <div className="card">
            <div className="card__icon">
                <ExpertiseIcon
                    className="icon"
                    icon={icon}
                    url_img={url_img}
                    title={title}
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