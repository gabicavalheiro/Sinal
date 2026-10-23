import type { HandDetectorPort } from "../domain/ports";

export async function createHandDetector(): Promise<HandDetectorPort> {
  const { HandLandmarker, FilesetResolver } = await import("@mediapipe/tasks-vision");
  const files = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.32/wasm",
  );
  const detector = await HandLandmarker.createFromOptions(files, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
    },
    runningMode: "VIDEO",
    numHands: 1,
  });
  return {
    detect: (video, timestamp) =>
      detector.detectForVideo(video, timestamp).landmarks[0] ?? null,
    dispose: () => detector.close(),
  };
}
