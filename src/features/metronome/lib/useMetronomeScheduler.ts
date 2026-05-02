import { useSyncExternalStore } from "react";
import { metronomeSettings } from "@/features/metronome/lib/metronomeSettings";
import { scheduler } from "@/features/metronome/lib/scheduler";

export const useMetronomeScheduler = () => {
  const settings = useSyncExternalStore(
    metronomeSettings.subscribe,
    metronomeSettings.getSnapshot
  );
  const playback = useSyncExternalStore(
    scheduler.subscribe,
    scheduler.getSnapshot
  );

  return {
    ...settings,
    ...playback,
    startMetronome: scheduler.start,
    stopMetronome: scheduler.stop,
    toggleMetronome: scheduler.toggle,
    restartMetronome: scheduler.restart,
    setBPM: metronomeSettings.setBPM,
    setVolume: metronomeSettings.setVolume,
    setBeatsPerMeasure: metronomeSettings.setBeatsPerMeasure,
    toggleAccentEnabled: metronomeSettings.toggleAccentEnabled,
    getProgress: scheduler.getProgress,
  };
};
