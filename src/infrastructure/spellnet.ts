import moduleUrl from "@onnx/ort-wasm-simd-threaded.mjs?url";
import wasmUrl from "@onnx/ort-wasm-simd-threaded.wasm?url";
import type { Landmark } from "../domain/landmarks";
import { HAND_CONNECTIONS } from "../domain/landmarks";
import type { FrameClassifierPort } from "../domain/ports";
import { selectPrediction } from "../domain/recognition";

/** Mirrors upstream crop, landmark painting and OpenCV BGR MobileNet input. */
export function prepareFrame(
  video: HTMLVideoElement,
  points: readonly Landmark[],
  canvas: HTMLCanvasElement,
): Float32Array {
  const w = video.videoWidth,
    h = video.videoHeight;
  if (!w || !h || points.length !== 21) throw new Error("Frame inválido.");
  const minX = Math.max(0, Math.min(...points.map((p) => Math.floor(p.x * w))) - 100);
  const minY = Math.max(0, Math.min(...points.map((p) => Math.floor(p.y * h))) - 100);
  const maxX = Math.min(w, Math.max(...points.map((p) => Math.floor(p.x * w))) + 100);
  const maxY = Math.min(h, Math.max(...points.map((p) => Math.floor(p.y * h))) + 100);
  if (maxX <= minX || maxY <= minY) throw new Error("Recorte inválido.");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas indisponível.");
  canvas.width = canvas.height = 224;
  ctx.drawImage(video, minX, minY, maxX - minX, maxY - minY, 0, 0, 224, 224);
  const pixels = points.map((p) => ({
    x: Math.min(223, Math.floor(((p.x * w - minX) / (maxX - minX)) * 224)),
    y: Math.min(223, Math.floor(((p.y * h - minY) / (maxY - minY)) * 224)),
  }));
  // MediaPipe Python default drawing specs: green connections, red points, width/radius 2.
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#00ff00";
  for (const [a, b] of HAND_CONNECTIONS) {
    ctx.beginPath();
    ctx.moveTo(pixels[a].x, pixels[a].y);
    ctx.lineTo(pixels[b].x, pixels[b].y);
    ctx.stroke();
  }
  ctx.strokeStyle = "#ff0000";
  for (const p of pixels) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.stroke();
  }
  const rgba = ctx.getImageData(0, 0, 224, 224).data;
  const input = new Float32Array(224 * 224 * 3);
  for (let p = 0; p < 224 * 224; p++) {
    input[p * 3] = rgba[p * 4 + 2] / 127.5 - 1;
    input[p * 3 + 1] = rgba[p * 4 + 1] / 127.5 - 1;
    input[p * 3 + 2] = rgba[p * 4] / 127.5 - 1;
  }
  return input;
}

export async function createSpellNetClassifier(): Promise<FrameClassifierPort> {
  const ort = await import("onnxruntime-web/wasm");
  ort.env.wasm.numThreads = 1;
  ort.env.wasm.wasmPaths = { wasm: wasmUrl, mjs: moduleUrl };
  const session = await ort.InferenceSession.create(
    "/models/spellnet/spellnet-libras.onnx",
    { executionProviders: ["wasm"], graphOptimizationLevel: "all" },
  );
  const canvas = document.createElement("canvas");
  let pending: Promise<unknown> = Promise.resolve();
  return {
    predict(video, points) {
      const run = async () => {
        const input = new ort.Tensor(
          "float32",
          prepareFrame(video, points, canvas),
          [1, 224, 224, 3],
        );
        try {
          const outputs = await session.run({ [session.inputNames[0]]: input });
          try {
            return selectPrediction(outputs[session.outputNames[0]].data as Float32Array);
          } finally {
            Object.values(outputs).forEach((t) => t.dispose());
          }
        } finally {
          input.dispose();
        }
      };
      const inference = run();
      pending = inference;
      return inference;
    },
    async dispose() {
      await pending.catch(() => undefined);
      await session.release();
      canvas.width = canvas.height = 0;
    },
  };
}
