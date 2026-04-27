import * as styles from "@/features/guitarScales/components/ScalePicker/ScalePicker.css";
import {
  GuitarScaleType,
  SCALE_DEFINITIONS,
  SCALE_LIST,
} from "@/features/guitarScales/scale";
import { useDismiss } from "@/hooks/useDismiss";
import clsx from "clsx";
import { useCallback, useRef, useState } from "react";

type Layout = "wrap" | "list" | "select";

type Props = {
  value: GuitarScaleType;
  onChange: (value: GuitarScaleType) => void;
  layout?: Layout;
};

export const ScalePicker = ({ value, onChange, layout = "wrap" }: Props) => {
  if (layout === "select") return <SelectScale value={value} onChange={onChange} />;
  if (layout === "list") return <ListScale value={value} onChange={onChange} />;
  return <WrapScale value={value} onChange={onChange} />;
};

const WrapScale = ({ value, onChange }: Pick<Props, "value" | "onChange">) => (
  <div className={styles.wrapList}>
    {SCALE_LIST.map((k) => {
      const active = k === value;
      return (
        <button
          type="button"
          key={k}
          onClick={() => onChange(k)}
          className={clsx(styles.chip, active && styles.chipActive)}
        >
          {SCALE_DEFINITIONS[k].name}
        </button>
      );
    })}
  </div>
);

const ListScale = ({ value, onChange }: Pick<Props, "value" | "onChange">) => (
  <div className={styles.list}>
    {SCALE_LIST.map((k) => {
      const active = k === value;
      return (
        <button
          type="button"
          key={k}
          onClick={() => onChange(k)}
          className={clsx(styles.listItem, active && styles.listItemActive)}
        >
          <span>{SCALE_DEFINITIONS[k].name}</span>
          {active && <span className={styles.listDot} />}
        </button>
      );
    })}
  </div>
);

const SelectScale = ({ value, onChange }: Pick<Props, "value" | "onChange">) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(wrapRef, open, close);

  return (
    <div ref={wrapRef} className={styles.selectWrap}>
      <button
        type="button"
        className={styles.selectButton}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{SCALE_DEFINITIONS[value].name}</span>
        <svg
          width="11"
          height="11"
          viewBox="0 0 10 10"
          fill="none"
          className={clsx(styles.caret, open && styles.caretOpen)}
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
        <div role="listbox" className={styles.popover}>
          {SCALE_LIST.map((k) => {
            const active = k === value;
            return (
              <button
                type="button"
                role="option"
                aria-selected={active}
                key={k}
                onClick={() => {
                  onChange(k);
                  setOpen(false);
                }}
                className={clsx(
                  styles.popoverItem,
                  active && styles.popoverItemActive
                )}
              >
                <span>{SCALE_DEFINITIONS[k].name}</span>
                {active && <span className={styles.popoverDot} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
