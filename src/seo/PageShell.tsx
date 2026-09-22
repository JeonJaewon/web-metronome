import React, { type ReactNode } from "react";
import { type Feature, pages } from "./pages";

export function ToolPlaceholder() {
  return <p className="tool-placeholder" role="status">Loading interactive tool…</p>;
}

// Keep the initial shell independent of browser-only audio modules.
export function PageShell({
  feature,
  children = <ToolPlaceholder />,
}: {
  feature: Feature;
  children?: ReactNode;
}) {
  return (
    <React.Fragment>
      <main id="practice-tool" className="practice-tool" aria-label={pages[feature].name}>
        {children}
      </main>
    </React.Fragment>
  );
}
