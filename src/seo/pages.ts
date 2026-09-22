import { MAX_BPM, MIN_BPM } from "../lib/bpm";

export type Feature = "metronome" | "guitarScales";

export const SITE_ORIGIN = "https://jeonjaewon.github.io";
export const BASE_PATH = "/web-metronome/";

type Page = {
  path: string;
  name: string;
  title: string;
  description: string;
  introduction: string;
  steps: string[];
  sections: { heading: string; text: string }[];
};

export const pages: Record<Feature, Page> = {
  metronome: {
    path: BASE_PATH,
    name: "Free Online Metronome",
    title: "Free Online Metronome – Tap Tempo & BPM Control",
    description: `Practice with a free online metronome: ${MIN_BPM}–${MAX_BPM} BPM, tap tempo, beat accents and visual pulses. Use it for guitar, piano, drums or any instrument.`,
    introduction: `Keep time with a free browser metronome. Set ${MIN_BPM}–${MAX_BPM} BPM, tap a tempo and follow the beat as you practice. No download or account needed.`,
    steps: [
      "Set your tempo with the BPM controls. BPM means beats per minute: at 60 BPM, each beat is one second apart.",
      "Choose 2, 3, 4, 5 or 6 beats per measure. Enable the accent to hear the first beat of each measure more clearly.",
      "Press Start to begin, then follow the sound and visual beat indicator. Press Stop when you finish.",
      "To find a song’s tempo, tap the Tap tempo button several times at a steady pace, or press T on your keyboard.",
    ],
    sections: [
      {
        heading: "How to practice with a metronome",
        text: "Start at a tempo where you can play a phrase evenly. Repeat it with one note per beat, then try two notes per beat. Increase the BPM gradually when the rhythm feels steady. The stopwatch helps you track your practice session.",
      },
      {
        heading: "Keyboard shortcuts",
        text: "In metronome mode, press Space to play or stop, Left or Right to change the tempo by 1 BPM, and T to tap a tempo. On tablet and desktop layouts, Up and Down adjust the volume by 5%.",
      },
      {
        heading: "Sound and visual timing",
        text: "The metronome schedules sound with the Web Audio API and offers beat dots or a pendulum display. Press Start to enable audio in your browser, and check your device volume if you cannot hear the clicks.",
      },
    ],
  },
  guitarScales: {
    path: `${BASE_PATH}guitar-scales/`,
    name: "Interactive Guitar Scale Chart",
    title: "Guitar Scale Chart – Pentatonic, Major, Minor & Blues",
    description: "Explore guitar scales on an interactive fretboard. Choose any root, view major, minor, pentatonic and blues scales, and practice with a built-in metronome.",
    introduction: "Explore five guitar scales in any root on a standard-tuning fretboard. Switch between note names and scale degrees, and keep time with the built-in metronome.",
    steps: [
      "Choose a root note, such as A or C. The root is the note your scale is built around.",
      "Select Major, Minor, Major Pentatonic, Minor Pentatonic or Blues to see the notes on the fretboard.",
      "Move the fretboard position to explore the scale along the neck, and switch labels between note names and scale degrees.",
      "Use the metronome controls to practice the displayed scale at a steady tempo.",
    ],
    sections: [
      {
        heading: "Major and minor scales",
        text: "The major scale has seven degrees: 1, 2, 3, 4, 5, 6 and 7. The natural minor scale uses 1, 2, ♭3, 4, 5, ♭6 and ♭7. Compare them using the same root to see how the third, sixth and seventh change.",
      },
      {
        heading: "Pentatonic and blues scales",
        text: "Major pentatonic uses five degrees: 1, 2, 3, 5 and 6. Minor pentatonic uses 1, ♭3, 4, 5 and ♭7. The blues scale adds a ♭5 to minor pentatonic, giving you six notes to explore in riffs and improvisation.",
      },
      {
        heading: "Reading the guitar fretboard",
        text: "The chart uses standard guitar tuning: E, A, D, G, B and E from the lowest string to the highest. Highlighted root notes help you find your starting points. Degree labels show each note’s role relative to the root, so you can compare patterns across keys.",
      },
    ],
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
