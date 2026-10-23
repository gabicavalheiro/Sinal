import { test } from "node:test";
import assert from "node:assert/strict";
import { createNameSteps, practiceSummary, PracticeConfirmation } from "./namePractice";

test("personalizes names, removes vowel accents, preserves Ç and unsupported letters", () => {
  assert.deepEqual(
    createNameSteps("  João Çaki  ").map((step) => [step.letter, step.supported]),
    [
      ["J", false],
      ["O", true],
      ["A", true],
      ["O", true],
      ["Ç", false],
      ["A", true],
      ["K", false],
      ["I", true],
    ],
  );
});
test("keeps repeated letters and ignores word separators", () => {
  assert.equal(
    createNameSteps("Anna-Maria D’Ávila")
      .map((step) => step.letter)
      .join(""),
    "ANNAMARIADAVILA",
  );
});
test("rejects empty, invalid and overlong entries", () => {
  for (const value of ["", "  ", "123", "Ana👋", "A".repeat(41), "---"])
    assert.deepEqual(createNameSteps(value), []);
});
test("requires a fresh confirmation for every step", () => {
  const gate = new PracticeConfirmation();
  gate.begin("A");
  assert.equal(gate.observe("A"), false);
  assert.equal(gate.observe(undefined), false);
  assert.equal(gate.observe("B"), false);
  assert.equal(gate.observe("A"), true);
  assert.equal(gate.observe("A"), false);
  gate.begin("A");
  assert.equal(gate.observe("A"), false);
  gate.observe(undefined);
  assert.equal(gate.observe("A"), true);
});
test("summary distinguishes review from unsupported, without scoring skipped letters as success", () => {
  assert.deepEqual(
    practiceSummary([
      { letter: "A", outcome: "recognized" },
      { letter: "B", outcome: "review" },
      { letter: "B", outcome: "review" },
      { letter: "J", outcome: "unsupported" },
    ]),
    { recognized: 1, review: ["B"], unsupported: ["J"] },
  );
});
