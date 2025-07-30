import { useSyncExternalStore, useCallback } from "react";
import {
  audioContext,
  createOscillatorWithConfig,
} from "@/features/metronome/lib/oscillator";
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
    case "INCREMENT_BEAT": {
      const nextBeat = state.currentBeat + 1;
      return {
        ...state,
        currentBeat: nextBeat > state.beatsPerMeasure ? 1 : nextBeat,
      };
    }
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
  const scheduleNextNote = useCallback(() => {
    if (!metronomeState.isPlaying) return;

    while (nextNoteTime <= audioContext.currentTime) {
      dispatch({ type: "INCREMENT_BEAT" });

      const isAccented =
        metronomeState.accentedBeatEnabled && metronomeState.currentBeat === 1;
      const oscillator = createOscillatorWithConfig(
        metronomeState.volume,
        isAccented
      );
      oscillator.start(nextNoteTime);
      const NOTE_DURATION = 0.08;
      oscillator.stop(nextNoteTime + NOTE_DURATION);
      nextNoteTime = nextNoteTime + calculateIntervalByBPM(metronomeState.bpm);
      break;
    }

    const SCHEDULE_DELAY_MS = 25;
    nextNoteTimer = setTimeout(() => scheduleNextNote(), SCHEDULE_DELAY_MS);
  }, []);

  const startMetronome = useCallback(() => {
    if (!metronomeState.isPlaying) {
      dispatch({ type: "START" });
      nextNoteTime = audioContext.currentTime;
      scheduleNextNote();
    }
  }, [scheduleNextNote]);

  const stopMetronome = useCallback(() => {
    if (nextNoteTimer !== undefined) {
      clearTimeout(nextNoteTimer);
    }
    dispatch({ type: "STOP" });
  }, []);

  const setBPM = useCallback(
    (bpm: number) => {
      if (metronomeState.isPlaying) {
        stopMetronome();
        dispatch({ type: "SET_BPM", bpm });
        startMetronome();
      } else {
        dispatch({ type: "SET_BPM", bpm });
      }
    },
    [startMetronome, stopMetronome]
  );

  const setVolume = useCallback((volume: number) => {
    dispatch({ type: "SET_VOLUME", volume });
  }, []);

  const setBeatsPerMeasure = useCallback((beats: number) => {
    dispatch({ type: "SET_BEATS_PER_MEASURE", beats });
  }, []);

  const toggleAccentEnabled = useCallback(() => {
    dispatch({ type: "TOGGLE_ACCENT_ENABLED" });
  }, []);

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
