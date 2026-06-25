import { ReactNode, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router";
import { useTranslation } from "react-i18next";
import type { Lang } from "../../i18n/types";
import './style.scss'

interface NavbarProps {
    name: string;
    lang: Lang;
}

export default function Navbar({ name, lang }: NavbarProps) {
    const { t } = useTranslation();
    const [isHidden, setIsHidden] = useState(true);

    const toggleVisibility = () => {
      setIsHidden(!isHidden);
    };

    return (
        <nav className="navbar">
            <Link to={`/${lang}`} className="navbar__title">{name}</Link>
            <button onClick={toggleVisibility} className="navbar__toggle-button">
                <span role="img" aria-label={t('nav.toggleMenu')}>
                👁️
                </span>
            </button>
            {!isHidden && (
                <ul className="navbar__options">
                    <CustomLink to={`/${lang}/expertises`}>{t('nav.expertises')}</CustomLink>
                    <CustomLink to={`/${lang}/about`}>{t('nav.about')}</CustomLink>
                    <CustomLink to={`/${lang}/career`}>{t('nav.career')}</CustomLink>
                    <CustomLink to={`/${lang}/beyond-work`}>{t('nav.beyondWork')}</CustomLink>
                </ul>
            )}
        </nav>
    );
}

interface CustumLinkProps {
    to: string,
    children: ReactNode
}

function CustomLink({ to, children, ...props }:CustumLinkProps) {
    // The CustomLink do the same thing of Link (react-router) component, but also add the style classe "active", if the URL match the router link.
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true});

    return(
        <li className={"navbar__options__option" + (isActive? " navbar__options__option--active" : "")}>
            <Link to={to} {...props} className="navbar__options__option__link">
                {children}
            </Link>
        </li>

    );
}
