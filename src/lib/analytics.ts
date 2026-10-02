const MEASUREMENT_ID = "G-LDNJ546913";
const plannerViews = new Set<string>();

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function initializeAnalytics() {
  if (!import.meta.env.PROD || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // Match Google's snippet: gtag consumes Arguments objects from the queue.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.append(script);
}

export function trackPlannerClick() {
  window.gtag?.("event", "pedal_planner_click", {
    link_url: "https://pedalcanvas.com/",
    page_path: window.location.pathname,
  });
}

export function observePlannerLink(link: HTMLAnchorElement) {
  if (!window.gtag || !window.IntersectionObserver) return;

  const path = window.location.pathname;
  if (plannerViews.has(path)) return;

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5)) return;
    if (!plannerViews.has(path)) {
      plannerViews.add(path);
      window.gtag?.("event", "pedal_planner_view", {
        link_url: link.href,
        page_path: path,
      });
    }
    observer.disconnect();
  }, { threshold: 0.5 });

  observer.observe(link);
  return () => observer.disconnect();
}
