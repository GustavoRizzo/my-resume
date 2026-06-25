import { Outlet, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { I18nextProvider } from "react-i18next";
import { resolveLangParam } from "../i18n/resolveLang";
import { getI18n } from "../i18n/config";
import type { Lang } from "../i18n/types";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";

export function loader({ params }: LoaderFunctionArgs) {
  const lang = resolveLangParam(params.lang);
  return { lang };
}

// Language layout: validates the :lang segment, provides the matching i18n
// instance, and frames every page with the language switch.
export default function LangLayout() {
  const { lang } = useLoaderData() as { lang: Lang };

  return (
    <I18nextProvider i18n={getI18n(lang)}>
      <div className="container">
        <LanguageSelector lang={lang} />
        <Outlet />
      </div>
    </I18nextProvider>
  );
}
