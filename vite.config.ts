/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { PageShell } from "./src/seo/PageShell";
import { BASE_PATH, pageHeadTags, renderSitemap } from "./src/seo/pages";

function staticPages(): Plugin {
  return {
    name: "static-practice-pages",
    transformIndexHtml(html, context) {
      const feature = context.filename.replace(/\\/g, "/").endsWith("/guitar-scales/index.html")
        ? "guitarScales"
        : "metronome";
      const shell = renderToString(createElement("div", null, createElement(PageShell, { feature })));
      return {
        html: html.replace("<!--app-html-->", shell),
        // Keep the charset declaration within the first 1024 bytes of HTML.
        tags: pageHeadTags(feature).map((tag) => ({ ...tag, injectTo: "head" as const })),
      };
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: renderSitemap() });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin(), staticPages()],
  base: BASE_PATH,
  build: {
    rollupOptions: {
      input: { metronome: "index.html", guitarScales: "guitar-scales/index.html" },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
  },
});
