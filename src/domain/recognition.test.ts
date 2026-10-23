import assert from "node:assert/strict";
import test from "node:test";
import { RecognitionGate, selectPrediction, SPELLNET_LABELS } from "./recognition";
const a = { letter: "A", confidence: 0.95, modelVersion: "test" };
test("shows A only after repeated stable predictions, not a single frame", () => {
  const gate = new RecognitionGate();
  assert.equal(gate.observe(a, 0), null);
  assert.equal(gate.observe(a, 300), null);
  assert.equal(gate.observe(a, 700)?.letter, "A");
});
test("low score, hand loss and a changed letter clear confirmation", () => {
  const gate = new RecognitionGate();
  gate.observe(a, 0);
  gate.observe(a, 300);
  gate.observe(a, 700);
  assert.equal(gate.observe({ ...a, confidence: 0.79 }, 1000), null);
  assert.equal(gate.observe(a, 1200), null);
  gate.reset();
  assert.equal(gate.observe(a, 2000), null);
  assert.equal(gate.observe({ ...a, letter: "B" }, 2300), null);
  assert.equal(gate.observe({ ...a, letter: "B" }, 2600), null);
  assert.equal(gate.observe({ ...a, letter: "B" }, 3000)?.letter, "B");
  assert.equal(gate.observe(null, 3100), null);
});
test("model class order is upstream 21-class Libras order", () => {
  const scores = new Float32Array(21);
  scores[7] = 0.99;
  assert.equal(selectPrediction(scores)?.letter, "I");
  assert.equal(SPELLNET_LABELS.length, 21);
  assert.throws(() => selectPrediction(new Float32Array(26)));
  scores[3] = NaN;
  assert.equal(selectPrediction(scores), null);
});
