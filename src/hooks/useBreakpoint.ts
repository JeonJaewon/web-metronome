import { useSyncExternalStore } from "react";

export type Breakpoint = "mobile" | "tablet" | "desktop";

const tabletMql = window.matchMedia("(min-width: 768px)");
const desktopMql = window.matchMedia("(min-width: 1200px)");

const getSnapshot = (): Breakpoint => {
  if (desktopMql.matches) return "desktop";
  if (tabletMql.matches) return "tablet";
  return "mobile";
};

const subscribe = (callback: () => void) => {
  tabletMql.addEventListener("change", callback);
  desktopMql.addEventListener("change", callback);
  return () => {
    tabletMql.removeEventListener("change", callback);
    desktopMql.removeEventListener("change", callback);
  };
};

export const useBreakpoint = (): Breakpoint =>
  useSyncExternalStore(subscribe, getSnapshot);
