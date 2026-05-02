import { useFocusedFeature } from "@/app/feature";
import { ModeSwitcher } from "@/components/ModeSwitcher/ModeSwitcher";
import * as styles from "@/features/metronome/Metronome.css";
import { AccentToggleController } from "@/features/metronome/components/AccentToggleController/AccentToggleController";
import { BPMController } from "@/features/metronome/components/BPMController/BPMController";
import { DisplayModule } from "@/features/metronome/components/DisplayModule/DisplayModule";
import { HeroPlay } from "@/features/metronome/components/HeroPlay/HeroPlay";
import { MeterButton } from "@/features/metronome/components/MeterButton/MeterButton";
import { PulseModule } from "@/features/metronome/components/PulseModule/PulseModule";
import { Stopwatch } from "@/features/metronome/components/Stopwatch/Stopwatch";
import { TapTempoButton } from "@/features/metronome/components/TapTempoButton/TapTempoButton";
import { VolumeController } from "@/features/metronome/components/VolumeController/VolumeController";
import { BEAT_OPTIONS } from "@/features/metronome/lib/beatsPerMeasure";
import { tempoName } from "@/features/metronome/lib/tempoName";
import { useMetronomeScheduler } from "@/features/metronome/lib/useMetronomeScheduler";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import clsx from "clsx";

export const Metronome = () => {
  const focusedFeature = useFocusedFeature();
  const breakpoint = useBreakpoint();

  if (focusedFeature !== "metronome") return null;

  return (
    <div className={styles.wrapper}>
      {breakpoint === "desktop" ? (
        <ConsoleDesktop />
      ) : breakpoint === "tablet" ? (
        <ConsoleTablet />
      ) : (
        <ConsoleMobile />
      )}
    </div>
  );
};

type StatusRowProps = {
  switcherSize?: "sm" | "md" | "lg";
  showRunning?: boolean;
};

const StatusRow = ({ switcherSize = "md", showRunning }: StatusRowProps) => {
  const { isPlaying, bpm, beatsPerMeasure } = useMetronomeScheduler();
  return (
    <div className={styles.statusRow}>
      <div className={styles.statusLeft}>
        <ModeSwitcher size={switcherSize} />
        {showRunning && (
          <>
            <span className={styles.statusDivider} />
            <span className={styles.label}>{isPlaying ? "Running" : "Idle"}</span>
          </>
        )}
      </div>
      <span className={clsx(styles.label, styles.labelRight)}>
        {showRunning
          ? `${tempoName(bpm)} · ${beatsPerMeasure}/4`
          : tempoName(bpm)}
      </span>
    </div>
  );
};

const ConsoleMobile = () => (
  <div className={styles.consoleMobile}>
    <StatusRow switcherSize="md" />
    <DisplayModule size="small" />
    <BPMController />
    <TapTempoButton size="small" />
    <PulseModule size="small" dotSize={12} dotGap={12} pendulumHeight={86} />
    <MeterButton size="medium" />
    <AccentToggleController />
    <Stopwatch />
    <HeroPlay height={84} />
  </div>
);

const ConsoleTablet = () => (
  <div className={styles.consoleTablet}>
    <StatusRow switcherSize="md" />
    <DisplayModule size="medium" />
    <div className={styles.twoCol}>
      <BPMController />
      <VolumeController />
    </div>
    <TapTempoButton size="medium" filled />
    <PulseModule size="medium" dotSize={16} dotGap={20} pendulumHeight={130} />
    <MeterButton size="large" />
    <div className={styles.twoCol}>
      <AccentToggleController />
      <Stopwatch />
    </div>
    <HeroPlay height={96} />
  </div>
);

const ConsoleDesktop = () => {
  const { beatsPerMeasure, setBeatsPerMeasure } = useMetronomeScheduler();
  return (
    <div className={styles.consoleDesktop}>
      <StatusRow switcherSize="lg" showRunning />
      <div className={styles.desktopBody}>
        <div className={styles.desktopLeft}>
          <DisplayModule size="large" />
          <PulseModule
            size="large"
            dotSize={20}
            dotGap={28}
            pendulumHeight={170}
          />
          <div className={styles.desktopTransport}>
            <TapTempoButton size="large" filled />
            <div style={{ flex: 1 }}>
              <HeroPlay height={72} />
            </div>
          </div>
        </div>
        <div className={styles.desktopRight}>
          <BPMController />
          <VolumeController />
          <div className={styles.meterGrid}>
            <span className={styles.label}>Meter</span>
            <div className={styles.meterGridList}>
              {BEAT_OPTIONS.map((beats) => {
                const active = beats === beatsPerMeasure;
                return (
                  <button
                    type="button"
                    key={beats}
                    onClick={() => setBeatsPerMeasure(beats)}
                    className={clsx(
                      styles.meterGridButton,
                      active && styles.meterGridButtonActive
                    )}
                  >
                    {beats}/4
                  </button>
                );
              })}
            </div>
          </div>
          <AccentToggleController />
          <Stopwatch />
          <div className={styles.shortcuts}>
            <span className={styles.label}>Shortcuts</span>
            <div className={styles.shortcutsGrid}>
              <span>Play / Stop</span>
              <span className={styles.shortcutKey}>Space</span>
              <span>BPM ± 1</span>
              <span className={styles.shortcutKey}>← →</span>
              <span>Volume ± 5%</span>
              <span className={styles.shortcutKey}>↑ ↓</span>
              <span>Tap tempo</span>
              <span className={styles.shortcutKey}>T</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
