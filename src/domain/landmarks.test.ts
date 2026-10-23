import assert from "node:assert/strict";
import test from "node:test";
import { normalizeLandmarks } from "./landmarks";

const hand = Array.from({ length: 21 }, (_, i) => ({
  x: i * 0.012,
  y: Math.sin(i) * 0.15,
  z: i * 0.003,
}));

test("produces 63 features with wrist at origin", () => {
  const features = normalizeLandmarks(hand);
  assert.equal(features.length, 63);
  assert.deepEqual(features.slice(0, 3), [0, 0, 0]);
  assert.ok(features.every(Number.isFinite));
});

test("features are invariant to translation and uniform scale", () => {
  const moved = hand.map((p) => ({
    x: p.x * 3.4 + 7,
    y: p.y * 3.4 - 2,
    z: p.z * 3.4 + 1,
  }));
  const expected = normalizeLandmarks(hand);
  normalizeLandmarks(moved).forEach((n, i) =>
    assert.ok(Math.abs(n - expected[i]) < 1e-12),
  );
});

test("rejects missing, degenerate and non-finite points", () => {
  assert.throws(() => normalizeLandmarks(hand.slice(1)));
  assert.throws(() => normalizeLandmarks(Array(21).fill({ x: 0, y: 0, z: 0 })));
  assert.throws(() => normalizeLandmarks(hand.map((p, i) => (i ? p : { ...p, x: NaN }))));
});
