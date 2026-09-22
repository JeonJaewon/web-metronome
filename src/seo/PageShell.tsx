import React, { type ReactNode } from "react";
import { type Feature, pages } from "./pages";

export function ToolPlaceholder() {
  return <p className="tool-placeholder" role="status">Loading interactive tool…</p>;
}

// This shell is rendered at build time and hydrated in the browser. Keep it
// independent of the audio engine and other browser-only tool modules.
export function PageShell({
  feature,
  children = <ToolPlaceholder />,
}: {
  feature: Feature;
  children?: ReactNode;
}) {
  const page = pages[feature];
  const related = pages[feature === "metronome" ? "guitarScales" : "metronome"];

  return (
    <React.Fragment>
      <a className="skip-link" href="#practice-tool">Skip to practice tool</a>
      <header className="page-intro">
        <h1>{page.name}</h1>
        <p>{page.introduction}</p>
        <nav aria-label="Practice tools">
          {Object.entries(pages).map(([key, item]) => (
            <a key={key} href={item.path} aria-current={key === feature ? "page" : undefined}>
              {key === "metronome" ? "Metronome" : "Guitar scales"}
            </a>
          ))}
        </nav>
      </header>
      <main>
        <section id="practice-tool" className="practice-tool" aria-label={page.name} tabIndex={-1}>
          {children}
        </section>
        <article className="practice-guide" aria-labelledby="guide-title">
          <h2 id="guide-title">{feature === "metronome" ? "How to use the online metronome" : "How to use the guitar scale chart"}</h2>
          <ol>{page.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.text}</p>
            </section>
          ))}
          <p>Continue practicing with the <a href={related.path}>{related.name.toLowerCase()}</a>.</p>
        </article>
      </main>
      <footer className="page-footer">
        Free music practice tools by <a href="https://github.com/JeonJaewon">Jeon Jaewon</a>.
      </footer>
    </React.Fragment>
  );
}
