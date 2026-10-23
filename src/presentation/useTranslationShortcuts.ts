import { useEffect, type Dispatch, type SetStateAction } from "react";
import { MAX_TRANSLATION_LENGTH } from "../application/useTranslation";

export function useTranslationShortcuts(
  enabled: boolean,
  currentLetter: string | undefined,
  update: Dispatch<SetStateAction<string>>,
) {
  useEffect(() => {
    if (!enabled) return;
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target;
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        !(target instanceof HTMLElement) ||
        target.matches("input,textarea,button,[contenteditable='true']")
      )
        return;
      if (event.code === "Enter" && currentLetter) {
        event.preventDefault();
        update((text) => (text + currentLetter).slice(0, MAX_TRANSLATION_LENGTH));
      } else if (event.code === "Space") {
        event.preventDefault();
        update((text) =>
          text && !text.endsWith(" ")
            ? (text + " ").slice(0, MAX_TRANSLATION_LENGTH)
            : text,
        );
      } else if (event.code === "Backspace") {
        event.preventDefault();
        update((text) => text.slice(0, -1));
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled, currentLetter, update]);
}
