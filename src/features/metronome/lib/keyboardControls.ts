import {
  metronomeSettings,
  useBPM,
} from "@/features/metronome/lib/metronomeSettings";
import { scheduler } from "@/features/metronome/lib/scheduler";
import { useKeyControl } from "@/hooks/useKeyControl";

export const useTogglePlayKeyControl = () => {
  useKeyControl(" ", scheduler.toggle);
};

export const useBpmKeyControl = () => {
  const bpm = useBPM();
  useKeyControl("ArrowRight", () => metronomeSettings.setBPM(bpm + 1));
  useKeyControl("ArrowLeft", () => metronomeSettings.setBPM(bpm - 1));
};

export const SHORTCUTS = [
  { description: "Play / Stop", keys: "Space" },
  { description: "BPM ± 1", keys: "← →" },
  { description: "Volume ± 5%", keys: "↑ ↓" },
  { description: "Tap tempo", keys: "T" },
] as const;
