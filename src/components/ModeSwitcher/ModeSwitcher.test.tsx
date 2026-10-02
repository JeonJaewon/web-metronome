import { StrictMode } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ModeSwitcher } from "./ModeSwitcher";
import { initializeAnalytics } from "@/lib/analytics";

vi.mock("@/features/metronome/lib/scheduler", () => ({ useIsPlaying: () => false }));

type VisibilityEntry = { isIntersecting: boolean; intersectionRatio: number };
let callbacks: ((entries: VisibilityEntry[]) => void)[];
const disconnect = vi.fn();

beforeEach(() => {
  window.history.replaceState(null, "", "/web-metronome/");
  callbacks = [];
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: (entries: VisibilityEntry[]) => void) {
      callbacks.push(callback);
    }
    observe() {}
    disconnect = disconnect;
  });
  window.gtag = vi.fn();
});

afterEach(() => {
  delete window.gtag;
  delete window.dataLayer;
  document.querySelectorAll('script[src*="googletagmanager.com"]').forEach((script) => script.remove());
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("planner analytics", () => {
  it("counts visible impressions once despite Strict Mode and multiple responsive links", () => {
    render(<StrictMode><ModeSwitcher /><ModeSwitcher /></StrictMode>);
    act(() => callbacks.forEach((callback) => callback([{ isIntersecting: false, intersectionRatio: 0 }])));
    act(() => callbacks.forEach((callback) => callback([{ isIntersecting: true, intersectionRatio: 0.25 }])));
    expect(window.gtag).not.toHaveBeenCalled();

    act(() => callbacks.forEach((callback) => callback([{ isIntersecting: true, intersectionRatio: 0.5 }])));
    expect(window.gtag).toHaveBeenCalledExactlyOnceWith("event", "pedal_planner_view", {
      link_url: "https://pedalcanvas.com/",
      page_path: "/web-metronome/",
    });
  });

  it("tracks normal and middle clicks while preserving the destination", () => {
    render(<ModeSwitcher />);
    const link = screen.getByRole("link", { name: "Pedalboard Planner" });
    expect(link).toHaveAttribute("href", "https://pedalcanvas.com/");
    // Prevent jsdom's unsupported navigation after the React handler runs.
    document.addEventListener("click", (event) => event.preventDefault(), { once: true });
    fireEvent.click(link);
    fireEvent(link, new MouseEvent("auxclick", { bubbles: true, button: 1 }));
    fireEvent(link, new MouseEvent("auxclick", { bubbles: true, button: 2 }));
    expect(window.gtag).toHaveBeenCalledTimes(2);
    expect(window.gtag).toHaveBeenLastCalledWith("event", "pedal_planner_click", {
      link_url: "https://pedalcanvas.com/",
      page_path: "/web-metronome/",
    });
  });

  it("still renders and allows clicks when analytics or IntersectionObserver is unavailable", () => {
    delete window.gtag;
    vi.stubGlobal("IntersectionObserver", undefined);
    render(<ModeSwitcher />);
    const link = screen.getByRole("link", { name: "Pedalboard Planner" });
    document.addEventListener("click", (event) => event.preventDefault(), { once: true });
    expect(() => fireEvent.click(link)).not.toThrow();
    expect(link).toHaveAttribute("href", "https://pedalcanvas.com/");
  });
});

describe("GA initialization", () => {
  it("does not load Google Analytics during development", () => {
    delete window.gtag;
    vi.stubEnv("PROD", false);
    initializeAnalytics();
    expect(window.dataLayer).toBeUndefined();
    expect(document.querySelector('script[src*="googletagmanager.com"]')).toBeNull();
  });

  it("queues the production configuration before loading Google and initializes only once", () => {
    delete window.gtag;
    vi.stubEnv("PROD", true);
    initializeAnalytics();
    initializeAnalytics();
    expect(window.dataLayer?.map((entry) => Array.from(entry as IArguments))).toEqual([
      ["js", expect.any(Date)],
      ["config", "G-LDNJ546913"],
    ]);
    const scripts = document.querySelectorAll<HTMLScriptElement>('script[src*="googletagmanager.com"]');
    expect(scripts).toHaveLength(1);
    expect(scripts[0].src).toBe("https://www.googletagmanager.com/gtag/js?id=G-LDNJ546913");
    expect(scripts[0].async).toBe(true);
  });
});
