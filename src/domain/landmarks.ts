export type Landmark = Readonly<{ x: number; y: number; z: number }>;
export type Letter = "A" | "B" | "C" | "D";

/** Wrist-centered, isotropic scale normalization. Orientation is preserved. */
export function normalizeLandmarks(points: readonly Landmark[]): number[] {
  if (points.length !== 21) throw new Error("Uma mão deve ter exatamente 21 pontos.");
  if (points.some((p) => ![p.x, p.y, p.z].every(Number.isFinite))) {
    throw new Error("As coordenadas precisam ser finitas.");
  }
  const wrist = points[0];
  const centered = points.map((p) => ({
    x: p.x - wrist.x,
    y: p.y - wrist.y,
    z: p.z - wrist.z,
  }));
  const scale = Math.max(...centered.map((p) => Math.hypot(p.x, p.y, p.z)));
  if (scale < 1e-8) throw new Error("Os pontos não definem uma mão válida.");
  return centered.flatMap((p) => [p.x / scale, p.y / scale, p.z / scale]);
}

export const HAND_CONNECTIONS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [5, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [9, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [13, 17],
  [0, 17],
  [17, 18],
  [18, 19],
  [19, 20],
] as const;
