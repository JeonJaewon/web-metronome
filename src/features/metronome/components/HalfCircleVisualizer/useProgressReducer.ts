import { useReducer } from "react";

export enum AnimationDirection {
  FORWARD = 1,
  BACKWARD = -1,
}

export type ProgressState = {
  direction: AnimationDirection;
  angle: number;
};

export type ProgressAction =
  | { type: "SET_PROGRESS"; progress: number }
  | { type: "TOGGLE_DIRECTION"; progress: number }
  | { type: "CLEAR_STATE" };

function calcAngle(progress: number) {
  return 180 - 180 * progress;
}

function progressReducer(
  state: ProgressState,
  action: ProgressAction
): ProgressState {
  switch (action.type) {
    case "SET_PROGRESS": {
      const angle = calcAngle(
        state.direction === AnimationDirection.FORWARD
          ? action.progress
          : 1 - action.progress
      );

      return {
        ...state,
        angle,
      };
    }
    case "TOGGLE_DIRECTION": {
      const newDirection =
        state.direction === AnimationDirection.FORWARD
          ? AnimationDirection.BACKWARD
          : AnimationDirection.FORWARD;
      const angle = calcAngle(
        newDirection === AnimationDirection.FORWARD
          ? action.progress
          : 1 - action.progress
      );
      return {
        direction: newDirection,
        angle,
      };
    }
    case "CLEAR_STATE": {
      return {
        direction: AnimationDirection.FORWARD,
        angle: 180,
      };
    }
    default:
      return state;
  }
}

export const useProgressReducer = () => {
  return useReducer(progressReducer, {
    direction: AnimationDirection.FORWARD,
    angle: 180,
  });
};
