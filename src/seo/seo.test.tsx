import { act, render, screen, waitFor } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import Site from "../app/Site";
import { featureStore } from "../app/feature";
import { PageShell } from "./PageShell";
import { updatePageMetadata } from "./document";
import { type Feature, featureFromPath, pages, renderSitemap, SITE_ORIGIN } from "./pages";

vi.mock("../app/App", () => ({
  default: () => <button>Interactive practice controls</button>,
}));

afterEach(() => {
  act(() => featureStore.setFocusedFeature("metronome"));
  document.head.querySelectorAll("[data-page-meta]").forEach((tag) => tag.remove());
});

describe("static practice pages", () => {
  it.each<Feature>(["metronome", "guitarScales"])("hydrates the %s tool shell without extra page content", async (feature) => {
    featureStore.setFocusedFeature(feature);
    const container = document.createElement("div");
    container.innerHTML = renderToString(<div><PageShell feature={feature} /></div>);
    document.body.append(container);
    const initialMain = container.querySelector("main");
    const onRecoverableError = vi.fn();
    const root = hydrateRoot(container, <Site />, { onRecoverableError });

    try {
      expect(initialMain).toHaveAccessibleName(pages[feature].name);
      await waitFor(() => expect(screen.getByRole("button", { name: "Interactive practice controls" })).toBeInTheDocument());
      expect(container.querySelector("main")).toBe(initialMain);
      expect(container.querySelector("header, article, footer, h1")).toBeNull();
      expect(onRecoverableError).not.toHaveBeenCalled();
    } finally {
      await act(() => root.unmount());
      container.remove();
    }
  });

  it("updates the URL, tool label and metadata on navigation and popstate", async () => {
    window.history.replaceState(null, "", pages.metronome.path);
    render(<Site />);
    act(() => featureStore.setFocusedFeature("guitarScales"));

    expect(window.location.pathname).toBe(pages.guitarScales.path);
    expect(screen.getByRole("main")).toHaveAccessibleName(pages.guitarScales.name);
    expect(document.title).toBe(pages.guitarScales.title);
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", `${SITE_ORIGIN}${pages.guitarScales.path}`);

    // Simulate the URL and popstate event delivered by browser Back.
    act(() => {
      window.history.replaceState(null, "", pages.metronome.path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(featureStore.getSnapshot()).toBe("metronome");
    expect(document.title).toBe(pages.metronome.title);
    expect(screen.getByRole("main")).toHaveAccessibleName(pages.metronome.name);
    await waitFor(() => expect(screen.getByRole("button", { name: "Interactive practice controls" })).toBeInTheDocument());
  });

  it("keeps one consistent set of canonical, sharing and structured metadata", () => {
    for (const feature of ["metronome", "guitarScales", "metronome"] as const) {
      updatePageMetadata(feature);
      const url = `${SITE_ORIGIN}${pages[feature].path}`;
      expect(document.querySelectorAll("title")).toHaveLength(1);
      expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
      expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
      expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute("content", url);
      expect(document.querySelector('meta[name="twitter:title"]')).toHaveAttribute("content", document.title);
      const structured = JSON.parse(document.querySelector('script[type="application/ld+json"]')!.textContent!);
      expect(structured.url).toBe(url);
      expect(structured.name).toBe(pages[feature].name);
      expect(structured.offers.price).toBe("0");
    }
  });

  it("recognizes direct page URLs and includes only canonical URLs in the sitemap", () => {
    expect(featureFromPath(pages.guitarScales.path)).toBe("guitarScales");
    expect(featureFromPath(pages.guitarScales.path.slice(0, -1))).toBe("guitarScales");
    expect(featureFromPath(`${pages.guitarScales.path}index.html`)).toBe("guitarScales");
    expect(featureFromPath(pages.metronome.path)).toBe("metronome");
    const sitemap = new DOMParser().parseFromString(renderSitemap(), "application/xml");
    expect(sitemap.querySelector("parsererror")).toBeNull();
    expect([...sitemap.querySelectorAll("loc")].map((loc) => loc.textContent)).toEqual(
      Object.values(pages).map((page) => `${SITE_ORIGIN}${page.path}`),
    );
  });
});
