import { useEffect } from "react";

export const useKeyControl = (
  key: string,
  onKeyDown: (event: KeyboardEvent) => void
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        onKeyDown(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, onKeyDown]);
};
