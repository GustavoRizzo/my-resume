// UI strings the island needs, resolved at build time by the page (t() is
// server-side only) and passed down as plain props.
export type BeyondWorkLabels = {
  readMore: string;
  close: string;
  /** Template with a {{title}} placeholder. */
  openDetails: string;
};
