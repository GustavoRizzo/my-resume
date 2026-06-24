export type Expertise = {
  title: string;
  html_text: string;
  url_img: string;
  underline_class_css: string;
  /** Tag name shown around the description in the V3 "code editor" style. Defaults to "h3". */
  code_tag?: string;
  /** Key of an inline SVG icon (see ExpertiseIcon). Falls back to url_img when absent. */
  icon?: string;
};