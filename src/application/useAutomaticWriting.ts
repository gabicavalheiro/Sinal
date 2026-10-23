import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { LetterComposer } from "../domain/letterComposer";
import { MAX_TRANSLATION_LENGTH } from "./useTranslation";

export function useAutomaticWriting(
  enabled: boolean,
  letter: string | undefined,
  handPresent: boolean,
  update: Dispatch<SetStateAction<string>>,
) {
  const composer = useRef(new LetterComposer());
  const latest = useRef({ letter, handPresent });
  latest.current = { letter, handPresent };
  useEffect(() => {
    if (!enabled) return;
    const tick = () => {
      const current = latest.current;
      const next = composer.current.observe(
        current.letter,
        current.handPresent,
        performance.now(),
      );
      if (next) update((text) => (text + next).slice(0, MAX_TRANSLATION_LENGTH));
    };
    tick();
    const timer = window.setInterval(tick, 100);
    return () => window.clearInterval(timer);
  }, [enabled, update]);
}
