import * as styles from "@/features/guitarScales/components/Fretboard/Fretboard.css";
import {
  clampFretPosition,
  FRET_COUNT,
  INLAY_FRETS,
  OPEN_NOTES,
  POSITION_WIDTH,
  STRING_COUNT,
  TUNING,
} from "@/features/guitarScales/guitar";
import {
  degreeOf,
  LabelMode,
  pitchClass,
  PitchClass,
  pitchClassToNote,
  Scale,
} from "@/features/guitarScales/scale";
import { vars } from "@/styles/theme.css";
import { useEffect, useRef, useState } from "react";

const PAD_LEFT = 36;
const PAD_RIGHT = 12;
const TOP_OFFSET = 18;

type Props = {
  scale: Scale;
  labelMode: LabelMode;
  position: number;
  onPositionChange: (value: number) => void;
  height: number;
  showPosition?: boolean;
};

type FretboardNote = {
  s: number;
  f: number;
  pc: PitchClass;
  isRoot: boolean;
};

export const Fretboard = ({
  scale,
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
  const stringH = (height - TOP_OFFSET - 6) / STRING_COUNT;
  const stringY = (i: number) =>
    TOP_OFFSET + (STRING_COUNT - 1 - i) * stringH + stringH / 2;
  const fretX = (f: number) => PAD_LEFT + (f - 0.5) * fretW;
  const fretLineX = (f: number) => PAD_LEFT + f * fretW;

  const rootPc = scale.pitchClasses[0];
  const noteR = Math.min(stringH * 0.42, fretW * 0.42, 16);

  const handlePoint = (clientX: number) => {
    if (!containerRef.current || fretW <= 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left - PAD_LEFT;
    onPositionChange(clampFretPosition(x / fretW));
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

  const notes: FretboardNote[] = [];
  for (let s = 0; s < STRING_COUNT; s++) {
    for (let f = 0; f <= FRET_COUNT; f++) {
      const pc = pitchClass(TUNING[s] + f);
      if (scale.pitchClasses.includes(pc))
        notes.push({ s, f, pc, isRoot: pc === rootPc });
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

          {INLAY_FRETS.map((f) => {
            const cy = TOP_OFFSET + (STRING_COUNT * stringH) / 2;
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
              height={STRING_COUNT * stringH}
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
              y2={TOP_OFFSET + STRING_COUNT * stringH}
              stroke={f === 0 ? vars.color.fretboardString : vars.color.fretboardInlay}
              strokeWidth={f === 0 ? 4 : 1}
            />
          ))}

          {Array.from({ length: STRING_COUNT }, (_, i) => i).map((i) => (
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

          {Array.from({ length: STRING_COUNT }, (_, i) => i).map((i) => (
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
                ? pitchClassToNote(pc)
                : degreeOf(scale, pc) ?? "";
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
