import { Feature, featureStore, useFocusedFeature } from "@/app/feature";
import { pages } from "@/seo/pages";
import * as styles from "@/components/ModeSwitcher/ModeSwitcher.css";
import { useIsPlaying } from "@/features/metronome/lib/scheduler";
import { useDismiss } from "@/hooks/useDismiss";
import clsx from "clsx";
import { ReactElement, useCallback, useRef, useState } from "react";

type Size = "sm" | "md" | "lg";

type Props = {
  size?: Size;
};

const CARET_SIZE: Record<Size, number> = { sm: 10, md: 11, lg: 12 };

const MODES: { key: Feature; label: string; Icon: () => ReactElement }[] = [
  { key: "metronome", label: "Metronome", Icon: MetronomeIcon },
  { key: "guitarScales", label: "Scales", Icon: GuitarIcon },
];

export const ModeSwitcher = ({ size = "md" }: Props) => {
  const focusedFeature = useFocusedFeature();
  const isPlaying = useIsPlaying();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(wrapRef, open, close);

  const current = MODES.find((m) => m.key === focusedFeature) ?? MODES[0];
  const caret = CARET_SIZE[size];

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={clsx(styles.trigger, styles.triggerSizes[size])}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span
          className={clsx(
            styles.dot,
            styles.dotSizes[size],
            isPlaying && styles.dotRunning[size]
          )}
        />
        <span>{current.label}</span>
        <svg
          width={caret}
          height={caret}
          viewBox="0 0 10 10"
          fill="none"
          className={styles.caret}
        >
          <path
            d="M2 4 L5 7 L8 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div role="menu" className={styles.popover}>
          {MODES.map(({ key, label, Icon }) => {
            const active = key === focusedFeature;
            return (
              <a
                key={key}
                href={pages[key].path}
                role="menuitemradio"
                aria-checked={active}
                onClick={(event) => {
                  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  featureStore.setFocusedFeature(key);
                  setOpen(false);
                }}
                className={clsx(styles.item, active && styles.itemActive)}
              >
                <span className={styles.itemIcon}>
                  <Icon />
                </span>
                <span className={styles.itemLabel}>{label}</span>
                {active && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={styles.itemCheck}
                  >
                    <path
                      d="M3 8.5 L6.5 12 L13 4.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

function MetronomeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 14 L4 3 L12 3 L11 14 Z" />
      <line x1="4.5" y1="14" x2="11.5" y2="14" />
      <line x1="8" y1="11" x2="10" y2="4" />
    </svg>
  );
}

function GuitarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <line x1="3" y1="2" x2="3" y2="14" />
      <line x1="7" y1="2" x2="7" y2="14" />
      <line x1="11" y1="2" x2="11" y2="14" />
      <line x1="1.5" y1="5" x2="12.5" y2="5" />
      <line x1="1.5" y1="8.5" x2="12.5" y2="8.5" />
      <line x1="1.5" y1="12" x2="12.5" y2="12" />
    </svg>
  );
}
