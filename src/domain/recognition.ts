import type { Prediction } from "./ports";

export const SPELLNET_LABELS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "I",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "Y",
] as const;

export const RECOGNITION_POLICY = {
  minimumScore: 0.8,
  minimumSamples: 3,
  stableDurationMs: 650,
  inferenceDelayMs: 220,
} as const;

/** Releases a prediction after consecutive observations of the same class. */
export class RecognitionGate {
  private candidate = "";
  private since = 0;
  private samples = 0;
  reset() {
    this.candidate = "";
    this.since = 0;
    this.samples = 0;
  }
  observe(prediction: Prediction | null, now: number): Prediction | null {
    if (
      !prediction ||
      !Number.isFinite(prediction.confidence) ||
      prediction.confidence < RECOGNITION_POLICY.minimumScore ||
      !SPELLNET_LABELS.includes(prediction.letter as (typeof SPELLNET_LABELS)[number])
    ) {
      this.reset();
      return null;
    }
    if (prediction.letter !== this.candidate) {
      this.candidate = prediction.letter;
      this.since = now;
      this.samples = 1;
      return null;
    }
    this.samples++;
    return this.samples >= RECOGNITION_POLICY.minimumSamples &&
      now - this.since >= RECOGNITION_POLICY.stableDurationMs
      ? prediction
      : null;
  }
}

export function selectPrediction(scores: ArrayLike<number>): Prediction | null {
  if (scores.length !== SPELLNET_LABELS.length)
    throw new Error("Saída do modelo incompatível.");
  let best = -1;
  for (let i = 0; i < scores.length; i++) {
    if (!Number.isFinite(scores[i]) || scores[i] < 0 || scores[i] > 1) return null;
    if (best < 0 || scores[i] > scores[best]) best = i;
  }
  return {
    letter: SPELLNET_LABELS[best],
    confidence: scores[best],
    modelVersion: "spellnet-onnx-v1",
  };
}
