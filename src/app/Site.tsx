import { lazy, Suspense, useEffect, useState } from "react";
import { useFocusedFeature } from "./feature";
import { PageShell, ToolPlaceholder } from "../seo/PageShell";
import { updatePageMetadata } from "../seo/document";

const App = lazy(() => import("./App"));

export default function Site() {
  const feature = useFocusedFeature();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => updatePageMetadata(feature), [feature]);

  return (
    <div>
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
