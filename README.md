# Simple Online Metronome

This project is a simple web-based metronome built using Web Audio API, React, TypeScript, and Vite.

## Project URL

You can access the live version of the project at [https://jeonjaewon.github.io/web-metronome](https://jeonjaewon.github.io/web-metronome).

The guitar scale chart has its own URL: [Guitar scales](https://jeonjaewon.github.io/web-metronome/guitar-scales/).

## Features

- Accurate BPM control
- Simple and intuitive interface
- Lightweight and fast loading
- Works on any device with a web browser
- Free to use
- Interactive major, minor, pentatonic and blues guitar scales

## How to Use

1. Visit [https://jeonjaewon.github.io/web-metronome](https://jeonjaewon.github.io/web-metronome).
2. Adjust the BPM using the slider or input field.
3. Click the play button to start the metronome.
4. Use the tap tempo button to set BPM by tapping.

## Technologies Used

- React
- TypeScript
- Vite
- Web Audio API

## SEO and static pages

`pnpm build` produces real HTML pages at `/web-metronome/` and
`/web-metronome/guitar-scales/`, plus `dist/sitemap.xml`. Each page includes a
visible heading, practice guide, internal links, its own title and description,
canonical URL, Open Graph/Twitter metadata and WebApplication JSON-LD before
JavaScript runs. The interactive controls load in the browser; the guide and
navigation are prerendered and hydrated from the same React component.

Edit page content and metadata in `src/seo/pages.ts` and shared markup in
`src/seo/PageShell.tsx`. The Vite plugin renders the shell into both HTML entries.
Keep the common font/icon/script tags in the two HTML templates in sync.
Internal navigation uses browser history and preserves the running audio engine.
Direct visits and refreshes work on GitHub Pages without an SPA fallback.

Validate with `pnpm build`, `pnpm lint`, and `pnpm test:run`. Use `pnpm preview`
to inspect both generated pages, including direct visits, reloads and Back/Forward.

### After deployment

1. In Google Search Console, verify the URL-prefix property
   `https://jeonjaewon.github.io/web-metronome/`, then submit
   `https://jeonjaewon.github.io/web-metronome/sitemap.xml`.
2. Inspect both page URLs with URL Inspection to confirm the deployed HTML and
   request indexing. Search ranking and indexing are not guaranteed by these changes.
3. Crawlers read robots rules at `https://jeonjaewon.github.io/robots.txt`.
   The copy in this repository is published at `/web-metronome/robots.txt` and
   cannot control crawling. Add its Sitemap directive to the separate root site's
   robots.txt if you manage that site, or submit the sitemap directly in Search Console.
4. Check structured data with Google's Rich Results Test and sharing previews
   after deployment. The markup describes the actual free tools; it contains no
   fabricated ratings or reviews.

The interface and guides are English. If Korean search traffic becomes a goal,
add fully translated pages with separate URLs and reciprocal hreflang links.
Use Search Console performance data and real-user Core Web Vitals to prioritize
further improvements; neither is available from a repository-only audit.

References: [JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics),
[sitemap submission](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap),
[robots.txt location](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt).
