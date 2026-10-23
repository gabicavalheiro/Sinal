import { useState } from "react";
import type { Letter } from "../domain/landmarks";
import type { StoragePort } from "../domain/ports";
import { EMPTY_PROGRESS, PRACTICE_LETTERS, validProgress } from "../domain/preferences";
import { useStoredState } from "./useStoredState";

export function usePractice(storage: StoragePort) {
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceDone, setPracticeDone] = useState(false);
  const [progress, setProgress] = useStoredState<Record<Letter, number>>(
    storage,
    "sinal.practice.v1",
    EMPTY_PROGRESS,
    validProgress,
  );
  const practiceLetter = PRACTICE_LETTERS[practiceIndex % PRACTICE_LETTERS.length];
  const totalPractice = Object.values(progress).reduce((sum, count) => sum + count, 0);
  function finishPractice() {
    setProgress((previous) => ({
      ...previous,
      [practiceLetter]: previous[practiceLetter] + 1,
    }));
    setPracticeDone(true);
  }
  function nextPractice() {
    setPracticeDone(false);
    setPracticeIndex((index) => index + 1);
  }
  return {
    practiceIndex,
    setPracticeIndex,
    practiceDone,
    setPracticeDone,
    progress,
    setProgress,
    practiceLetter,
    totalPractice,
    finishPractice,
    nextPractice,
  };
}
