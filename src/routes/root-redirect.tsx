import { useEffect } from "react";
import { useNavigate } from "react-router";
import { detectClientLang } from "../i18n/resolveLang";
import { DEFAULT_LANG } from "../i18n/types";

export function meta() {
  return [{ title: "Gustavo Rizzo — Software Developer" }];
}

// The "/" entry has no content of its own (avoids duplicate-content SEO): it
// resolves the preferred language on the client and redirects to /:lang.
export default function RootRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/${detectClientLang()}`, { replace: true });
  }, [navigate]);

  // No-JS / crawler fallback: send them to the default language home.
  return (
    <noscript>
      <meta httpEquiv="refresh" content={`0; url=${import.meta.env.BASE_URL}${DEFAULT_LANG}`} />
    </noscript>
  );
}
