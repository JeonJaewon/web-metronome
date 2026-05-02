import { useFocusedFeature } from "@/app/feature";
import { ModeSwitcher } from "@/components/ModeSwitcher/ModeSwitcher";
import * as styles from "@/features/guitarScales/GuitarScales.css";
import { Fretboard } from "@/features/guitarScales/components/Fretboard/Fretboard";
import { LabelToggle } from "@/features/guitarScales/components/LabelToggle/LabelToggle";
import { MiniMetronomeBar } from "@/features/guitarScales/components/MiniMetronomeBar/MiniMetronomeBar";
import { RootPicker } from "@/features/guitarScales/components/RootPicker/RootPicker";
import { ScalePicker } from "@/features/guitarScales/components/ScalePicker/ScalePicker";
import { ScaleSummary } from "@/features/guitarScales/components/ScaleSummary/ScaleSummary";
import {
  GuitarScale,
  GuitarScaleType,
  LabelMode,
  Note,
  pcToName,
  SCALE_DEFINITIONS,
  scalePitchClasses,
} from "@/features/guitarScales/scale";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import clsx from "clsx";
import { useState } from "react";

type State = {
  rootNote: Note;
  scaleType: GuitarScaleType;
  labelMode: LabelMode;
  position: number;
};

export const GuitarScales = () => {
  const focusedFeature = useFocusedFeature();
  const breakpoint = useBreakpoint();
  const [state, setState] = useState<State>({
    rootNote: "A",
    scaleType: GuitarScale.MinorPentatonic,
    labelMode: "note",
    position: 5,
  });

  if (focusedFeature !== "guitarScales") return null;

  const setRootNote = (rootNote: Note) =>
    setState((s) => ({ ...s, rootNote }));
  const setScaleType = (scaleType: GuitarScaleType) =>
    setState((s) => ({ ...s, scaleType }));
  const setLabelMode = (labelMode: LabelMode) =>
    setState((s) => ({ ...s, labelMode }));
  const setPosition = (position: number) =>
    setState((s) => ({ ...s, position }));

  const layoutProps = {
    state,
    setRootNote,
    setScaleType,
    setLabelMode,
    setPosition,
  };

  return (
    <div className={styles.wrapper}>
      {breakpoint === "desktop" ? (
        <ScalesDesktop {...layoutProps} />
      ) : breakpoint === "tablet" ? (
        <ScalesTablet {...layoutProps} />
      ) : (
        <ScalesMobile {...layoutProps} />
      )}
    </div>
  );
};

type LayoutProps = {
  state: State;
  setRootNote: (note: Note) => void;
  setScaleType: (type: GuitarScaleType) => void;
  setLabelMode: (mode: LabelMode) => void;
  setPosition: (position: number) => void;
};

const ScalesMobile = ({
  state,
  setRootNote,
  setScaleType,
  setLabelMode,
  setPosition,
}: LayoutProps) => (
  <div className={styles.consoleMobile}>
    <div className={styles.headerRow}>
      <ModeSwitcher size="md" />
      <LabelToggle value={state.labelMode} onChange={setLabelMode} />
    </div>
    <div className={styles.nowShowing}>
      <span className={styles.subLabel}>Now showing</span>
      <ScaleSummary
        rootNote={state.rootNote}
        scaleType={state.scaleType}
        size="md"
      />
      <span className={styles.subLabel}>
        Position {state.position} ·{" "}
        {SCALE_DEFINITIONS[state.scaleType].degrees.length} notes
      </span>
    </div>
    <Fretboard
      rootNote={state.rootNote}
      scaleType={state.scaleType}
      labelMode={state.labelMode}
      position={state.position}
      onPositionChange={setPosition}
      height={200}
    />
    <div className={styles.card}>
      <div className={styles.cardHeader}>Scale</div>
      <ScalePicker
        value={state.scaleType}
        onChange={setScaleType}
        layout="select"
      />
    </div>
    <div className={styles.card}>
      <div className={styles.cardHeader}>Root</div>
      <RootPicker value={state.rootNote} onChange={setRootNote} compact />
    </div>
    <div className={styles.fillBottom}>
      <MiniMetronomeBar />
    </div>
  </div>
);

const ScalesTablet = ({
  state,
  setRootNote,
  setScaleType,
  setLabelMode,
  setPosition,
}: LayoutProps) => (
  <div className={styles.consoleTablet}>
    <div className={styles.headerRow}>
      <ModeSwitcher size="md" />
      <LabelToggle value={state.labelMode} onChange={setLabelMode} />
    </div>
    <div className={styles.tabletBody}>
      <div className={styles.tabletLeft}>
        <div className={styles.summaryRow}>
          <ScaleSummary
            rootNote={state.rootNote}
            scaleType={state.scaleType}
            size="md"
          />
          <MiniMetronomeBar />
        </div>
        <Fretboard
          rootNote={state.rootNote}
          scaleType={state.scaleType}
          labelMode={state.labelMode}
          position={state.position}
          onPositionChange={setPosition}
          height={290}
        />
        <div className={styles.sectionGap}>
          <span className={styles.sectionLabel}>Root</span>
          <RootPicker value={state.rootNote} onChange={setRootNote} />
        </div>
      </div>
      <div className={styles.tabletSidePanel}>
        <span className={styles.sectionLabel}>Scale</span>
        <ScalePicker
          value={state.scaleType}
          onChange={setScaleType}
          layout="list"
        />
      </div>
    </div>
  </div>
);

const ScalesDesktop = ({
  state,
  setRootNote,
  setScaleType,
  setLabelMode,
  setPosition,
}: LayoutProps) => {
  const pcs = scalePitchClasses(state.rootNote, state.scaleType);
  const degrees = SCALE_DEFINITIONS[state.scaleType].degrees;
  return (
    <div className={styles.consoleDesktop}>
      <div className={styles.headerRow}>
        <ModeSwitcher size="lg" />
        <div className={styles.headerActions}>
          <LabelToggle value={state.labelMode} onChange={setLabelMode} />
          <MiniMetronomeBar />
        </div>
      </div>
      <div className={styles.desktopBody}>
        <div className={styles.desktopLeft}>
          <ScaleSummary
            rootNote={state.rootNote}
            scaleType={state.scaleType}
            size="lg"
          />
          <Fretboard
            rootNote={state.rootNote}
            scaleType={state.scaleType}
            labelMode={state.labelMode}
            position={state.position}
            onPositionChange={setPosition}
            height={320}
          />
          <div className={styles.sectionGap}>
            <span className={styles.sectionLabel}>Root</span>
            <RootPicker value={state.rootNote} onChange={setRootNote} />
          </div>
        </div>
        <div className={styles.desktopRight}>
          <span className={styles.sectionLabel}>Scale</span>
          <ScalePicker
            value={state.scaleType}
            onChange={setScaleType}
            layout="list"
          />
          <div className={styles.desktopFooter}>
            <span className={styles.sectionLabel}>Notes in scale</span>
            <div className={styles.notesList}>
              {pcs.map((pc, ix) => (
                <span
                  key={ix}
                  className={clsx(
                    styles.noteChip,
                    ix === 0 && styles.noteChipRoot
                  )}
                >
                  {state.labelMode === "note" ? pcToName(pc) : degrees[ix]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
