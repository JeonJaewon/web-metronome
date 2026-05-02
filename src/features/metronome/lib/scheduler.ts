import { secondsPerBeat } from "@/lib/bpm";
import { metronomeSettings } from "@/features/metronome/lib/metronomeSettings";
import {
  audioContext,
  createOscillatorWithConfig,
} from "@/features/metronome/lib/oscillator";
import { playbackClock } from "@/features/metronome/lib/playbackClock";

type SchedulerState = {
  isPlaying: boolean;
  currentBeat: number;
  totalBeats: number;
};

const NOTE_DURATION = 0.08;
const SCHEDULE_DELAY_MS = 25;

let state: SchedulerState = { isPlaying: false, currentBeat: 0, totalBeats: 0 };
let nextNoteTime = audioContext.currentTime;
let nextNoteTimer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

const setState = (next: SchedulerState) => {
  state = next;
  for (const listener of listeners) listener();
};

let prevSettings = metronomeSettings.getSnapshot();
metronomeSettings.subscribe(() => {
  const next = metronomeSettings.getSnapshot();
  if (next.bpm !== prevSettings.bpm && state.isPlaying) {
    nextNoteTime =
      nextNoteTime - secondsPerBeat(prevSettings.bpm) + secondsPerBeat(next.bpm);
  }
  if (next.beatsPerMeasure !== prevSettings.beatsPerMeasure) {
    setState({ ...state, currentBeat: 0 });
  }
  prevSettings = next;
});

const incrementBeat = () => {
  const { beatsPerMeasure } = metronomeSettings.getSnapshot();
  const nextBeat = state.currentBeat + 1;
  setState({
    ...state,
    currentBeat: nextBeat > beatsPerMeasure ? 1 : nextBeat,
    totalBeats: state.totalBeats + 1,
  });
};

const scheduleNextNote = () => {
  if (!state.isPlaying) return;

  while (nextNoteTime <= audioContext.currentTime) {
    incrementBeat();

    const settings = metronomeSettings.getSnapshot();
    const isAccented =
      settings.accentedBeatEnabled && state.currentBeat === 1;
    const oscillator = createOscillatorWithConfig({
      volume: settings.volume,
      isAccentedBeat: isAccented,
      startTime: nextNoteTime,
      duration: NOTE_DURATION,
    });
    oscillator.start(nextNoteTime);
    oscillator.stop(nextNoteTime + NOTE_DURATION);
    nextNoteTime = nextNoteTime + secondsPerBeat(settings.bpm);
    break;
  }

  nextNoteTimer = setTimeout(scheduleNextNote, SCHEDULE_DELAY_MS);
};

const start = () => {
  if (state.isPlaying) return;
  setState({ isPlaying: true, currentBeat: 0, totalBeats: 0 });
  playbackClock.start();
  nextNoteTime = audioContext.currentTime;
  scheduleNextNote();
};

const stop = () => {
  if (!state.isPlaying) return;
  if (nextNoteTimer !== undefined) clearTimeout(nextNoteTimer);
  setState({ ...state, isPlaying: false });
  playbackClock.stop();
};

const toggle = () => {
  if (state.isPlaying) stop();
  else start();
};

const restart = () => {
  if (!state.isPlaying) return;
  stop();
  start();
};

const getProgress = () => {
  if (!state.isPlaying) return 0;
  const interval = secondsPerBeat(metronomeSettings.getSnapshot().bpm);
  const lastNoteTime = nextNoteTime - interval;
  const now = audioContext.currentTime;
  const raw = (now - lastNoteTime) / interval;
  if (raw < 0) return 0;
  if (raw > 1) return 1;
  return raw;
};

export const scheduler = {
  getSnapshot: () => state,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  start,
  stop,
  toggle,
  restart,
  getProgress,
};
