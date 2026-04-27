import { useEffect, useRef } from "react";

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
};

export const useKeyControl = (
  key: string,
  onKeyDown: (event: KeyboardEvent) => void
) => {
  const callbackRef = useRef(onKeyDown);
  callbackRef.current = onKeyDown;

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key !== key) return;
      if (isEditableTarget(event.target)) return;
      // Space on a focused button is a native click — don't double-fire.
      if (key === " " && event.target instanceof HTMLButtonElement) return;
      callbackRef.current(event);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key]);
};
