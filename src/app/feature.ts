import { useSyncExternalStore } from "react";
import { type Feature, featureFromPath, pages } from "../seo/pages";

export type { Feature } from "../seo/pages";

let state: Feature = featureFromPath(window.location.pathname);
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const setState = (next: Feature) => {
  if (state === next) return;
  state = next;
  for (const listener of listeners) listener();
};

window.addEventListener("popstate", () => {
  setState(featureFromPath(window.location.pathname));
});

export const featureStore = {
  getSnapshot: () => state,
  subscribe,
  setFocusedFeature: (next: Feature) => {
    if (state === next) return;
    window.history.pushState(null, "", pages[next].path);
    setState(next);
  },
};

export const useFocusedFeature = (): Feature =>
  useSyncExternalStore(subscribe, () => state, () => state);
