import { test } from "node:test";
import assert from "node:assert/strict";
import { LetterComposer } from "./letterComposer";

test("composes confirmed letters without repeating held or unstable signs", () => {
  const composer = new LetterComposer();
  assert.equal(composer.observe("A", true, 0), "A");
  assert.equal(composer.observe("A", true, 200), undefined);
  assert.equal(composer.observe(undefined, true, 400), undefined);
  assert.equal(composer.observe("A", true, 900), undefined);
  assert.equal(composer.observe("B", true, 1200), "B");
});
test("requires sustained hand absence before repeating a letter", () => {
  const composer = new LetterComposer();
  composer.observe("A", true, 0);
  composer.observe(undefined, false, 100);
  assert.equal(composer.observe("A", true, 500), undefined);
  composer.observe(undefined, false, 600);
  composer.observe(undefined, false, 1400);
  assert.equal(composer.observe("A", true, 1500), "A");
});
test("reset starts a new writing session", () => {
  const composer = new LetterComposer();
  composer.observe("A", true, 0);
  composer.reset();
  assert.equal(composer.observe("A", true, 100), "A");
});
