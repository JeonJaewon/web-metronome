import { useSyncExternalStore } from "react";
import { audioContext, createOscillatorWithConfig } from "@/lib/oscillator";
import { calculateIntervalByBPM } from "@/utils/calculateIntervalByBPM";

let listeners: (() => void)[] = [];
let nextNoteTimer: ReturnType<typeof setTimeout> | undefined;
let nextNoteTime = audioContext.currentTime;

const subscribe = (listener: () => void) => {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

const notifyListeners = () => {
  for (const listener of listeners) {
    listener();
  }
};

type MetronomeState = {
  isPlaying: boolean;
  bpm: number;
  volume: number;
  beatsPerMeasure: number;
  currentBeat: number;
  accentedBeatEnabled: boolean;
};

type MetronomeAction =
  | { type: "START" }
  | { type: "STOP" }
  | { type: "SET_BPM"; bpm: number }
  | { type: "SET_VOLUME"; volume: number }
  | { type: "SET_BEATS_PER_MEASURE"; beats: number }
  | { type: "TOGGLE_ACCENT_ENABLED" }
  | { type: "INCREMENT_BEAT" };

const initialState: MetronomeState = {
  isPlaying: false,
  bpm: 100,
  volume: 0.5,
  beatsPerMeasure: 4,
  currentBeat: 0,
  accentedBeatEnabled: true,
};

let metronomeState = initialState;

const metronomeReducer = (
  state: MetronomeState,
  action: MetronomeAction
): MetronomeState => {
  switch (action.type) {
    case "START":
      return { ...state, isPlaying: true, currentBeat: 0 };
    case "STOP":
      return { ...state, isPlaying: false };
    case "SET_BPM":
      return { ...state, bpm: action.bpm };
    case "SET_VOLUME":
      return { ...state, volume: action.volume };
    case "SET_BEATS_PER_MEASURE":
      return { ...state, beatsPerMeasure: action.beats, currentBeat: 0 };
    case "TOGGLE_ACCENT_ENABLED":
      return { ...state, accentedBeatEnabled: !state.accentedBeatEnabled };
    case "INCREMENT_BEAT":
      const nextBeat = state.currentBeat + 1;
      return {
        ...state,
        currentBeat: nextBeat > state.beatsPerMeasure ? 1 : nextBeat,
      };
    default:
      return state;
  }
};

const dispatch = (action: MetronomeAction) => {
  metronomeState = metronomeReducer(metronomeState, action);
  notifyListeners();
};

const getSnapshot = () => metronomeState;

export const useMetronomeScheduler = () => {
  const scheduleNextNote = () => {
    if (!metronomeState.isPlaying) return;

    const SCHEDULE_BUFFER = 0.1;
    while (nextNoteTime < audioContext.currentTime + SCHEDULE_BUFFER) {
      dispatch({ type: "INCREMENT_BEAT" });

      const isAccented =
        metronomeState.accentedBeatEnabled && metronomeState.currentBeat === 1;
      const oscillator = createOscillatorWithConfig(
        metronomeState.volume,
        isAccented
      );
      oscillator.start(nextNoteTime);
      const NOTE_DURATION = 0.1;
      oscillator.stop(nextNoteTime + NOTE_DURATION);
      nextNoteTime = nextNoteTime + calculateIntervalByBPM(metronomeState.bpm);
    }

    const SCHEDULE_DELAY = 25;
    nextNoteTimer = setTimeout(() => scheduleNextNote(), SCHEDULE_DELAY);
  };

  const startMetronome = () => {
    if (!metronomeState.isPlaying) {
      dispatch({ type: "START" });
      nextNoteTime = audioContext.currentTime;
      scheduleNextNote();
    }
  };

  const stopMetronome = () => {
    if (nextNoteTimer !== undefined) {
      clearTimeout(nextNoteTimer);
    }
    dispatch({ type: "STOP" });
  };

  const setBPM = (bpm: number) => {
    dispatch({ type: "SET_BPM", bpm });
  };

  const setVolume = (volume: number) => {
    dispatch({ type: "SET_VOLUME", volume });
  };

  const setBeatsPerMeasure = (beats: number) => {
    dispatch({ type: "SET_BEATS_PER_MEASURE", beats });
  };

  const toggleAccentEnabled = () => {
    dispatch({ type: "TOGGLE_ACCENT_ENABLED" });
  };

  return {
    ...useSyncExternalStore(subscribe, getSnapshot),
    startMetronome,
    stopMetronome,
    setBPM,
    setVolume,
    setBeatsPerMeasure,
    toggleAccentEnabled,
  };
};
