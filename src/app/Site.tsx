import { lazy, Suspense, useEffect, useState, type MouseEvent } from "react";
import { featureStore, useFocusedFeature } from "./feature";
import { PageShell, ToolPlaceholder } from "../seo/PageShell";
import { updatePageMetadata } from "../seo/document";
import { featureFromPath, pages } from "../seo/pages";

const App = lazy(() => import("./App"));

export default function Site() {
  const feature = useFocusedFeature();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => updatePageMetadata(feature), [feature]);

  const navigate = (event: MouseEvent<HTMLDivElement>) => {
    if (
      event.defaultPrevented || event.button !== 0 || event.metaKey ||
      event.ctrlKey || event.shiftKey || event.altKey
    ) return;
    const link = (event.target as Element).closest("a");
    if (!link || link.target || link.hasAttribute("download")) return;
    const url = new URL(link.href);
    if (url.origin !== window.location.origin || url.search || url.hash) return;
    if (!Object.values(pages).some((page) => page.path === url.pathname)) return;
    event.preventDefault();
    featureStore.setFocusedFeature(featureFromPath(url.pathname));
  };

  return (
    <div onClick={navigate}>
      <PageShell feature={feature}>
        {mounted ? (
          <Suspense fallback={<ToolPlaceholder />}><App /></Suspense>
        ) : (
          <ToolPlaceholder />
        )}
      </PageShell>
    </div>
  );
}
