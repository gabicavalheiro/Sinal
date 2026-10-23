/** Adds a held letter once. A deliberate absence allows the same letter again. */
export class LetterComposer {
  private last: string | undefined;
  private absentSince: number | undefined;

  reset() {
    this.last = undefined;
    this.absentSince = undefined;
  }

  observe(letter: string | undefined, handPresent: boolean, now: number) {
    if (!handPresent) {
      this.absentSince ??= now;
      if (now - this.absentSince >= 800) this.last = undefined;
      return undefined;
    }
    this.absentSince = undefined;
    if (!letter || letter === this.last) return undefined;
    this.last = letter;
    return letter;
  }
}
