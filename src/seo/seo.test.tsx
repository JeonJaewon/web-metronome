import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
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
  it.each<Feature>(["metronome", "guitarScales"])("hydrates the %s guide without replacing the initial HTML", async (feature) => {
    featureStore.setFocusedFeature(feature);
    const container = document.createElement("div");
    container.innerHTML = renderToString(<div><PageShell feature={feature} /></div>);
    document.body.append(container);
    const initialHeading = container.querySelector("h1");
    const onRecoverableError = vi.fn();
    const root = hydrateRoot(container, <Site />, { onRecoverableError });

    try {
      // The explanatory text and real links must already exist without JS.
      expect(initialHeading).toHaveTextContent(pages[feature].name);
      expect(container.querySelectorAll("article li")).toHaveLength(4);
      expect(container.querySelector(`a[href="${pages.guitarScales.path}"]`)).not.toBeNull();
      await waitFor(() => expect(screen.getByRole("button", { name: "Interactive practice controls" })).toBeInTheDocument());
      expect(container.querySelector("h1")).toBe(initialHeading);
      expect(onRecoverableError).not.toHaveBeenCalled();
    } finally {
      await act(() => root.unmount());
      container.remove();
    }
  });

  it("updates the URL, heading and metadata on navigation and popstate", async () => {
    window.history.replaceState(null, "", pages.metronome.path);
    render(<Site />);
    fireEvent.click(screen.getByRole("link", { name: "Guitar scales" }));

    expect(window.location.pathname).toBe(pages.guitarScales.path);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(pages.guitarScales.name);
    expect(document.title).toBe(pages.guitarScales.title);
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", `${SITE_ORIGIN}${pages.guitarScales.path}`);

    // Simulate the URL and popstate event delivered by browser Back.
    act(() => {
      window.history.replaceState(null, "", pages.metronome.path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(featureStore.getSnapshot()).toBe("metronome");
    expect(document.title).toBe(pages.metronome.title);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(pages.metronome.name);
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
