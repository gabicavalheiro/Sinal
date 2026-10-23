import { useEffect, useRef, useState, type RefObject } from "react";
import type { Landmark } from "../domain/landmarks";
import type {
  CreateFrameClassifier,
  FrameClassifierPort,
  Prediction,
} from "../domain/ports";
import { RECOGNITION_POLICY, RecognitionGate } from "../domain/recognition";

export function useRecognition(
  active: boolean,
  videoRef: RefObject<HTMLVideoElement | null>,
  points: readonly Landmark[] | null,
  createClassifier: CreateFrameClassifier,
) {
  const latest = useRef(points);
  latest.current = points;
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [candidate, setCandidate] = useState(false);
  const gate = useRef(new RecognitionGate());
  useEffect(() => {
    if (!points) {
      gate.current.reset();
      setPrediction(null);
      setCandidate(false);
    }
  }, [points]);
  useEffect(() => {
    if (!active) {
      setStatus("idle");
      setPrediction(null);
      setCandidate(false);
      gate.current.reset();
      return;
    }
    let disposed = false;
    let timer = 0;
    let classifier: FrameClassifierPort | undefined;
    setStatus("loading");
    setPrediction(null);
    gate.current.reset();
    createClassifier()
      .then(async (model) => {
        if (disposed) {
          await model.dispose();
          return;
        }
        classifier = model;
        setStatus("ready");
        const tick = async () => {
          if (disposed) return;
          const video = videoRef.current,
            landmarks = latest.current;
          try {
            if (video && video.readyState >= 2 && landmarks) {
              const result = await model.predict(video, landmarks);
              if (disposed) return;
              if (!latest.current) {
                gate.current.reset();
                setPrediction(null);
                setCandidate(false);
              } else {
                const stable = gate.current.observe(result, performance.now());
                setPrediction(stable);
                setCandidate(
                  !!result && result.confidence >= RECOGNITION_POLICY.minimumScore,
                );
              }
            } else {
              gate.current.reset();
              setPrediction(null);
              setCandidate(false);
            }
            if (!disposed)
              timer = window.setTimeout(
                () => void tick(),
                RECOGNITION_POLICY.inferenceDelayMs,
              );
          } catch {
            if (!disposed) {
              gate.current.reset();
              setStatus("error");
              setPrediction(null);
              setCandidate(false);
            }
          }
        };
        void tick();
      })
      .catch(() => {
        if (!disposed) setStatus("error");
      });
    return () => {
      disposed = true;
      clearTimeout(timer);
      gate.current.reset();
      void classifier?.dispose().catch(() => undefined);
    };
  }, [active, videoRef, createClassifier]);
  return {
    status,
    prediction: active && points ? prediction : null,
    candidate: active && points ? candidate : false,
  };
}
