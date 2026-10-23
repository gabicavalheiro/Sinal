import { useCallback, useEffect, useRef, useState } from "react";
import { normalizeLandmarks, type Landmark } from "../domain/landmarks";
import type { CameraPort, CreateHandDetector, HandDetectorPort } from "../domain/ports";
import { cameraError } from "./cameraError";

export function useCamera(cameraPort: CameraPort, createDetector: CreateHandDetector) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const generation = useRef(0);
  const [status, setStatus] = useState<"off" | "requesting" | "active" | "error">("off");
  const [error, setError] = useState("");
  const [landmarks, setLandmarks] = useState<readonly Landmark[] | null>(null);
  const [detectorStatus, setDetectorStatus] = useState<
    "idle" | "loading" | "ready" | "unavailable"
  >("idle");

  const stop = useCallback(() => {
    generation.current++;
    if (streamRef.current) cameraPort.stop(streamRef.current);
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setLandmarks(null);
    setStatus("off");
  }, [cameraPort]);

  const start = useCallback(async () => {
    const request = ++generation.current;
    setStatus("requesting");
    setError("");
    try {
      const stream = await cameraPort.start();
      if (request !== generation.current) {
        cameraPort.stop(stream);
        return;
      }
      streamRef.current = stream;
      stream.getVideoTracks()[0]?.addEventListener(
        "ended",
        () => {
          if (streamRef.current === stream) stop();
        },
        { once: true },
      );
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      if (request === generation.current) setStatus("active");
    } catch (e) {
      if (request !== generation.current) return;
      if (streamRef.current) cameraPort.stop(streamRef.current);
      streamRef.current = null;
      setError(cameraError(e));
      setStatus("error");
    }
  }, [stop, cameraPort]);

  useEffect(() => {
    if (status !== "active") {
      setDetectorStatus("idle");
      return;
    }
    let disposed = false;
    let raf = 0;
    let detector: HandDetectorPort | undefined;
    let lastTime = -1;
    let lastFrame = 0;
    setDetectorStatus("loading");
    createDetector()
      .then((value) => {
        if (disposed) {
          value.dispose();
          return;
        }
        detector = value;
        setDetectorStatus("ready");
        const tick = (now: number) => {
          if (disposed) return;
          const video = videoRef.current;
          if (
            video &&
            video.readyState >= 2 &&
            video.currentTime !== lastTime &&
            now - lastFrame >= 80
          ) {
            lastTime = video.currentTime;
            lastFrame = now;
            try {
              const points = value.detect(video, now);
              if (points) normalizeLandmarks(points);
              setLandmarks(points);
            } catch {
              setLandmarks(null);
              setDetectorStatus("unavailable");
              return;
            }
          }
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      })
      .catch(() => {
        if (!disposed) setDetectorStatus("unavailable");
      });
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      detector?.dispose();
    };
  }, [status, createDetector]);

  useEffect(
    () => () => {
      generation.current++;
      if (streamRef.current) cameraPort.stop(streamRef.current);
    },
    [cameraPort],
  );

  return { videoRef, status, error, start, stop, landmarks, detectorStatus };
}
