import { useEffect, useRef, useState } from "react";
import {
  createNameSteps,
  practiceSummary,
  PracticeConfirmation,
  type PracticeStep,
  type StepResult,
} from "../domain/namePractice";
import type { StoragePort } from "../domain/ports";
import { useStoredState } from "./useStoredState";

type SavedReview = { letters: string[]; sessions: number };
function validReview(value: unknown): value is SavedReview {
  if (!value || typeof value !== "object") return false;
  const data = value as SavedReview;
  return (
    Number.isSafeInteger(data.sessions) &&
    data.sessions >= 0 &&
    Array.isArray(data.letters) &&
    data.letters.length <= 27 &&
    data.letters.every((letter) => typeof letter === "string" && /^[A-ZÇ]$/.test(letter))
  );
}
export function useNamePractice(
  storage: StoragePort,
  prediction: string | undefined,
  stopCamera: () => void,
) {
  const [name, setName] = useState("");
  const [steps, setSteps] = useState<PracticeStep[]>([]);
  const [results, setResults] = useState<StepResult[]>([]);
  const [phase, setPhase] = useState<"setup" | "session" | "summary">("setup");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useStoredState<SavedReview>(
    storage,
    "sinal.name-practice.v1",
    { letters: [], sessions: 0 },
    validReview,
  );
  const gate = useRef(new PracticeConfirmation());
  const index = results.length;
  const target = steps[index];
  useEffect(() => {
    gate.current.begin(target?.letter ?? "");
    setConfirmed(false);
  }, [steps, index, target?.letter]);
  useEffect(() => {
    if (
      phase === "session" &&
      target?.supported &&
      !confirmed &&
      gate.current.observe(prediction)
    )
      setConfirmed(true);
  }, [phase, target?.supported, prediction, confirmed, index]);

  function start(value = name, review = false) {
    const next = createNameSteps(value);
    if (!next.length) {
      setError(
        "Use um nome ou palavra com até 40 caracteres, apenas letras e separadores.",
      );
      return;
    }
    stopCamera();
    setSteps(next);
    setResults([]);
    setConfirmed(false);
    setError("");
    setPhase("session");
    if (!review) setName(value.trim());
  }
  function advance() {
    if (!target) return;
    const outcome = !target.supported
      ? "unsupported"
      : confirmed
        ? "recognized"
        : "review";
    const next: StepResult[] = [...results, { letter: target.letter, outcome }];
    setResults(next);
    if (next.length === steps.length) {
      const summary = practiceSummary(next);
      const recognized = new Set(
        next
          .filter((result) => result.outcome === "recognized")
          .map((result) => result.letter),
      );
      setSaved((previous) => ({
        sessions: previous.sessions + 1,
        letters: [
          ...new Set([
            ...previous.letters.filter((letter) => !recognized.has(letter)),
            ...summary.review,
          ]),
        ],
      }));
      stopCamera();
      setPhase("summary");
    }
  }
  function exit() {
    stopCamera();
    setPhase("setup");
    setConfirmed(false);
  }
  return {
    name,
    setName,
    steps,
    results,
    phase,
    confirmed,
    error,
    saved,
    index,
    target,
    start,
    restart: () => start(steps.map((step) => step.letter).join(""), true),
    advance,
    exit,
    summary: practiceSummary(results),
  };
}
export type NamePracticeModel = ReturnType<typeof useNamePractice>;
