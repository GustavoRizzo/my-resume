import webIcon from './icons/web.svg?raw';
import presentationIcon from './icons/presentation.svg?raw';
import engineIcon from './icons/engine.svg?raw';

type Props = {
    icon?: string;
    url_img: string;
    title: string;
    className?: string;
};

// Map an icon key (from data.json) to the raw SVG markup of its file.
// To edit an icon, just change the corresponding file in ./icons/.
const ICONS: Record<string, string> = {
    web: webIcon,
    presentation: presentationIcon,
    engine: engineIcon,
};

export default function ExpertiseIcon({ icon, url_img, title, className }: Props) {
    const svg = icon ? ICONS[icon] : undefined;

    if (svg) {
        return (
            <span
                className={className}
                role="img"
                aria-label={title}
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        );
    }

    return <img className={className} src={url_img} alt={title} />;
}
