import * as styles from "@/features/guitarScales/components/Fretboard/Fretboard.css";
import {
  GuitarScaleType,
  LabelMode,
  Note,
  NOTES,
  OPEN_NOTES,
  pcToDegree,
  pcToName,
  scalePitchClasses,
  TUNING_PCS,
} from "@/features/guitarScales/scale";
import { vars } from "@/features/metronome/theme.css";
import { useEffect, useRef, useState } from "react";

const FRET_COUNT = 12;
const STRINGS = 6;
const POSITION_WIDTH = 4;
const PAD_LEFT = 36;
const PAD_RIGHT = 12;
const TOP_OFFSET = 18;
const INLAYS = [3, 5, 7, 9, 12];

type Props = {
  rootNote: Note;
  scaleType: GuitarScaleType;
  labelMode: LabelMode;
  position: number;
  onPositionChange: (value: number) => void;
  height: number;
  showPosition?: boolean;
};

export const Fretboard = ({
  rootNote,
  scaleType,
  labelMode,
  position,
  onPositionChange,
  height,
  showPosition = true,
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setWidth(e.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const innerW = Math.max(0, width - PAD_LEFT - PAD_RIGHT);
  const fretW = innerW / FRET_COUNT;
  const stringH = (height - TOP_OFFSET - 6) / STRINGS;
  const stringY = (i: number) =>
    TOP_OFFSET + (STRINGS - 1 - i) * stringH + stringH / 2;
  const fretX = (f: number) => PAD_LEFT + (f - 0.5) * fretW;
  const fretLineX = (f: number) => PAD_LEFT + f * fretW;

  const pcs = scalePitchClasses(rootNote, scaleType);
  const rootPc = NOTES.indexOf(rootNote);
  const noteR = Math.min(stringH * 0.42, fretW * 0.42, 16);

  const handlePoint = (clientX: number) => {
    if (!containerRef.current || fretW <= 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left - PAD_LEFT;
    const f = Math.max(
      0,
      Math.min(FRET_COUNT - POSITION_WIDTH, Math.round(x / fretW))
    );
    onPositionChange(f);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePoint(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    handlePoint(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const notes: { s: number; f: number; pc: number; isRoot: boolean }[] = [];
  for (let s = 0; s < STRINGS; s++) {
    for (let f = 0; f <= FRET_COUNT; f++) {
      const pc = (TUNING_PCS[s] + f) % 12;
      if (pcs.includes(pc)) notes.push({ s, f, pc, isRoot: pc === rootPc });
    }
  }

  return (
    <div
      ref={containerRef}
      className={styles.root}
      style={{ height }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {width > 0 && (
        <svg width={width} height={height} style={{ display: "block" }}>
          {Array.from({ length: FRET_COUNT + 1 }, (_, f) => f).map((f) => (
            <text
              key={`fn-${f}`}
              x={f === 0 ? PAD_LEFT / 2 : fretX(f)}
              y={12}
              fontFamily={vars.font.mono}
              fontSize={9}
              fontWeight={500}
              fill={vars.color.mute}
              textAnchor="middle"
              style={{ letterSpacing: "0.1em" }}
            >
              {f}
            </text>
          ))}

          {INLAYS.map((f) => {
            const cy = TOP_OFFSET + (STRINGS * stringH) / 2;
            if (f === 12) {
              return (
                <g key={`inlay-${f}`}>
                  <circle
                    cx={fretX(f)}
                    cy={cy - stringH * 0.9}
                    r={3}
                    fill={vars.color.fretboardInlay}
                  />
                  <circle
                    cx={fretX(f)}
                    cy={cy + stringH * 0.9}
                    r={3}
                    fill={vars.color.fretboardInlay}
                  />
                </g>
              );
            }
            return (
              <circle
                key={`inlay-${f}`}
                cx={fretX(f)}
                cy={cy}
                r={3.5}
                fill={vars.color.fretboardInlay}
              />
            );
          })}

          {showPosition && (
            <rect
              x={fretLineX(position)}
              y={TOP_OFFSET}
              width={fretW * POSITION_WIDTH}
              height={STRINGS * stringH}
              fill={vars.color.accent}
              opacity={0.07}
            />
          )}

          {Array.from({ length: FRET_COUNT + 1 }, (_, f) => f).map((f) => (
            <line
              key={`fl-${f}`}
              x1={fretLineX(f)}
              x2={fretLineX(f)}
              y1={TOP_OFFSET}
              y2={TOP_OFFSET + STRINGS * stringH}
              stroke={f === 0 ? vars.color.fretboardString : vars.color.fretboardInlay}
              strokeWidth={f === 0 ? 4 : 1}
            />
          ))}

          {Array.from({ length: STRINGS }, (_, i) => i).map((i) => (
            <line
              key={`str-${i}`}
              x1={PAD_LEFT}
              x2={PAD_LEFT + FRET_COUNT * fretW}
              y1={stringY(i)}
              y2={stringY(i)}
              stroke={vars.color.fretboardString}
              strokeWidth={1 + i * 0.15}
              opacity={0.7}
            />
          ))}

          {Array.from({ length: STRINGS }, (_, i) => i).map((i) => (
            <text
              key={`sl-${i}`}
              x={PAD_LEFT - 14}
              y={stringY(i) + 4}
              fontFamily={vars.font.mono}
              fontSize={10}
              fontWeight={500}
              fill={vars.color.mute}
              textAnchor="middle"
            >
              {OPEN_NOTES[i]}
            </text>
          ))}

          {notes.map(({ s, f, pc, isRoot }, idx) => {
            const cx = f === 0 ? PAD_LEFT - 4 : fretX(f);
            const cy = stringY(s);
            const inPos =
              showPosition && f >= position && f <= position + POSITION_WIDTH;
            const fillColor = isRoot ? vars.color.accent : vars.color.dotInk;
            const opacity = inPos ? 1 : 0.32;
            const label =
              labelMode === "note"
                ? pcToName(pc)
                : pcToDegree(pc, rootNote, scaleType) ?? "";
            const txtColor = isRoot
              ? vars.color.onAccent
              : vars.color.fretboardNoteText;
            return (
              <g key={`n-${idx}`} opacity={opacity}>
                <circle cx={cx} cy={cy} r={noteR} fill={fillColor} />
                <text
                  x={cx}
                  y={cy + 3.5}
                  fontFamily={vars.font.sans}
                  fontSize={Math.max(9, noteR * 0.7)}
                  fontWeight={600}
                  fill={txtColor}
                  textAnchor="middle"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
};
