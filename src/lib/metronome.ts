import { useSyncExternalStore } from "react";
import { audioContext, createOscillatorWithConfig } from "./oscillator";
import { calculateIntervalByBPM } from "../utils/calculateIntervalByBPM";

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
};

type MetronomeAction =
  | { type: "START" }
  | { type: "STOP" }
  | { type: "SET_BPM"; bpm: number }
  | { type: "SET_VOLUME"; volume: number };

const initialState: MetronomeState = {
  isPlaying: false,
  bpm: 100,
  volume: 0.5,
};

let metronomeState = initialState;

const metronomeReducer = (
  state: MetronomeState,
  action: MetronomeAction
): MetronomeState => {
  switch (action.type) {
    case "START":
      return { ...state, isPlaying: true };
    case "STOP":
      return { ...state, isPlaying: false };
    case "SET_BPM":
      return { ...state, bpm: action.bpm };
    case "SET_VOLUME":
      return { ...state, volume: action.volume };
    default:
      return state;
  }
};

const dispatch = (action: MetronomeAction) => {
  metronomeState = metronomeReducer(metronomeState, action);
  notifyListeners();
};

const getSnapshot = () => metronomeState;

export const useMetronomeScheduler = (onTick?: () => void) => {
  const scheduleNextNote = () => {
    if (!metronomeState.isPlaying) return;

    const SCHEDULE_BUFFER = 0.1;
    while (nextNoteTime < audioContext.currentTime + SCHEDULE_BUFFER) {
      const oscillator = createOscillatorWithConfig(metronomeState.volume);
      oscillator.start(nextNoteTime);
      const NOTE_DURATION = 0.1;
      oscillator.stop(nextNoteTime + NOTE_DURATION);
      onTick?.();
      nextNoteTime = nextNoteTime + calculateIntervalByBPM(metronomeState.bpm);
    }

    const SCHEDULE_DELAY = 25;
    nextNoteTimer = setTimeout(() => scheduleNextNote(), SCHEDULE_DELAY);
  };

  const startMetronome = () => {
    if (!metronomeState.isPlaying) {
      dispatch({ type: "START" });
      scheduleNextNote();
    }
  };

  const stopMetronome = () => {
    if (nextNoteTimer !== undefined) {
      clearTimeout(nextNoteTimer);
    }
    nextNoteTime = Infinity;
    dispatch({ type: "STOP" });
  };

  const setBPM = (bpm: number) => {
    dispatch({ type: "SET_BPM", bpm });
    if (metronomeState.isPlaying) {
      stopMetronome();
      startMetronome();
    }
  };

  const setVolume = (volume: number) => {
    dispatch({ type: "SET_VOLUME", volume });
  };

  return {
    ...useSyncExternalStore(subscribe, getSnapshot),
    startMetronome,
    stopMetronome,
    setBPM,
    setVolume,
  };
};
