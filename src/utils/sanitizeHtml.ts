// isomorphic-dompurify wires up jsdom on the server, so sanitization works
// identically during static prerendering and in the browser.
import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = ["p", "b", "strong", "i", "em", "ul", "ol", "li", "br", "span"];
const ALLOWED_ATTR = ["style"];

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
  });
}
