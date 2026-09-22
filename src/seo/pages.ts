import { MAX_BPM, MIN_BPM } from "../lib/bpm";

export type Feature = "metronome" | "guitarScales";

export const SITE_ORIGIN = "https://jeonjaewon.github.io";
export const BASE_PATH = "/web-metronome/";

type Page = {
  path: string;
  name: string;
  title: string;
  description: string;
};

export const pages: Record<Feature, Page> = {
  metronome: {
    path: BASE_PATH,
    name: "Free Online Metronome",
    title: "Free Online Metronome – Tap Tempo & BPM Control",
    description: `Practice with a free online metronome: ${MIN_BPM}–${MAX_BPM} BPM, tap tempo, beat accents and visual pulses. Use it for guitar, piano, drums or any instrument.`,
  },
  guitarScales: {
    path: `${BASE_PATH}guitar-scales/`,
    name: "Interactive Guitar Scale Chart",
    title: "Guitar Scale Chart – Pentatonic, Major, Minor & Blues",
    description: "Explore guitar scales on an interactive fretboard. Choose any root, view major, minor, pentatonic and blues scales, and practice with a built-in metronome.",
  },
};

export const featureFromPath = (pathname: string): Feature =>
  pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "") ===
  pages.guitarScales.path.replace(/\/$/, "")
    ? "guitarScales"
    : "metronome";

type HeadTag = {
  tag: "title" | "meta" | "link" | "script";
  attrs: Record<string, string>;
  children?: string;
};

export const pageHeadTags = (feature: Feature): HeadTag[] => {
  const page = pages[feature];
  const url = `${SITE_ORIGIN}${page.path}`;
  const image = `${SITE_ORIGIN}${BASE_PATH}og.jpeg`;
  const meta = (key: string, content: string): HeadTag => ({
    tag: "meta",
    attrs: { [key.startsWith("og:") ? "property" : "name"]: key, content },
  });

  const tags: HeadTag[] = [
    { tag: "title", attrs: {}, children: page.title },
    meta("description", page.description),
    { tag: "link", attrs: { rel: "canonical", href: url } },
    meta("og:type", "website"),
    meta("og:site_name", "Simple Online Metronome"),
    meta("og:title", page.title),
    meta("og:description", page.description),
    meta("og:url", url),
    meta("og:image", image),
    meta("og:image:width", "3402"),
    meta("og:image:height", "1786"),
    meta("og:image:alt", "Simple Online Metronome interface"),
    meta("twitter:card", "summary_large_image"),
    meta("twitter:title", page.title),
    meta("twitter:description", page.description),
    meta("twitter:image", image),
    meta("twitter:image:alt", "Simple Online Metronome interface"),
    {
      tag: "script",
      attrs: { type: "application/ld+json" },
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "@id": `${url}#app`,
        name: page.name,
        url,
        description: page.description,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript and Web Audio API support",
        isAccessibleForFree: true,
        inLanguage: "en",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      }).replace(/</g, "\\u003c"),
    },
  ];
  return tags.map((tag) => ({ ...tag, attrs: { ...tag.attrs, "data-page-meta": "" } }));
};

export const renderSitemap = (): string =>
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  Object.values(pages)
    .map((page) => `  <url><loc>${SITE_ORIGIN}${page.path}</loc></url>`)
    .join("\n") +
  `\n</urlset>\n`;
