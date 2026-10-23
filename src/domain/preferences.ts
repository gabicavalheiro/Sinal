import type { Letter } from "./landmarks";
export const PRACTICE_LETTERS: readonly Letter[] = ["A", "B", "C", "D"];
export const EMPTY_PROGRESS: Record<Letter, number> = { A: 0, B: 0, C: 0, D: 0 };
export type Preferences = { points: boolean; mirror: boolean };
export const validPreferences = (v: unknown): v is Preferences =>
  !!v &&
  typeof v === "object" &&
  "points" in v &&
  typeof v.points === "boolean" &&
  "mirror" in v &&
  typeof v.mirror === "boolean";
export const validProgress = (v: unknown): v is Record<Letter, number> =>
  !!v &&
  typeof v === "object" &&
  PRACTICE_LETTERS.every(
    (l) =>
      l in v &&
      Number.isSafeInteger((v as Record<string, number>)[l]) &&
      (v as Record<string, number>)[l] >= 0,
  );
