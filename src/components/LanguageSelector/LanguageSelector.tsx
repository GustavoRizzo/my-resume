import './style.scss'
import { useLocation, useNavigate } from 'react-router';
import { SUPPORTED_LANGS, type Lang } from '../../i18n/types';

interface LanguageSelectorProps {
    lang: Lang;
}

// Switch between languages by swapping the URL prefix (/en/x ↔ /pt/x), keeping
// the current sub-path, and remembering the choice for the bare "/" entry.
const LanguageSelector = ({ lang }: LanguageSelectorProps) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const switchTo = (next: Lang) => {
        if (next === lang) return;
        const rest = pathname.replace(/^\/(en|pt)(?=\/|$)/, '');
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('resume.lang', next);
        }
        navigate(`/${next}${rest}`);
    };

    return (
        <div className="language-selector">
            <div className="justabox">
                {SUPPORTED_LANGS.map((code) => (
                    <div className="option" key={code}>
                        <input
                            id={code}
                            type="radio"
                            name="lang"
                            value={code}
                            checked={lang === code}
                            onChange={() => switchTo(code)}
                        />
                        <label htmlFor={code} className={`${code}-lang label`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguageSelector;
