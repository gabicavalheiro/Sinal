import { SPELLNET_LABELS } from "./recognition";

export type PracticeStep = { letter: string; supported: boolean };
export type StepResult = {
  letter: string;
  outcome: "recognized" | "review" | "unsupported";
};

export function createNameSteps(value: string): PracticeStep[] {
  const input = value.trim();
  if (!input || input.length > 40 || !/^[\p{L}\p{M}\s'’\-]+$/u.test(input)) return [];
  return Array.from(input.toLocaleUpperCase("pt-BR").normalize("NFC"))
    .filter((letter) => /\p{L}/u.test(letter))
    .map((letter) => {
      const normalized =
        letter === "Ç" ? letter : letter.normalize("NFD").replace(/\p{M}/gu, "");
      return {
        letter: normalized,
        supported: SPELLNET_LABELS.some((value) => value === normalized),
      };
    });
}

export function practiceSummary(results: readonly StepResult[]) {
  return {
    recognized: results.filter((result) => result.outcome === "recognized").length,
    review: [
      ...new Set(
        results
          .filter((result) => result.outcome === "review")
          .map((result) => result.letter),
      ),
    ],
    unsupported: [
      ...new Set(
        results
          .filter((result) => result.outcome === "unsupported")
          .map((result) => result.letter),
      ),
    ],
  };
}

/** Each step needs a fresh stable prediction, including adjacent identical letters. */
export class PracticeConfirmation {
  private target = "";
  private ready = false;
  begin(target: string) {
    this.target = target;
    this.ready = false;
  }
  observe(letter: string | undefined) {
    if (!letter) {
      this.ready = true;
      return false;
    }
    if (this.ready && letter === this.target) {
      this.ready = false;
      return true;
    }
    return false;
  }
}
