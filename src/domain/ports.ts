import type { Landmark } from "./landmarks";

export type CreateHandDetector = () => Promise<HandDetectorPort>;
export type CreateFrameClassifier = () => Promise<FrameClassifierPort>;

export interface StoragePort {
  read(key: string): string | null;
  write(key: string, value: string): void;
}

export interface TextPort {
  copy(text: string): Promise<void>;
  download(text: string, filename: string): void;
}

export interface CameraPort {
  start(deviceId?: string): Promise<MediaStream>;
  stop(stream: MediaStream): void;
}

export interface Prediction {
  letter: string;
  confidence: number;
  modelVersion: string;
}

/** Classifies a cropped video frame using its detected hand region. */
export interface FrameClassifierPort {
  predict(
    video: HTMLVideoElement,
    landmarks: readonly Landmark[],
  ): Promise<Prediction | null>;
  dispose(): Promise<void>;
}

/** Classifies a vector of normalized hand coordinates. */
export interface ClassifierPort {
  predict(normalizedCoordinates: readonly number[]): Promise<Prediction | null>;
  dispose(): void;
}

export interface HandDetectorPort {
  detect(video: HTMLVideoElement, timestamp: number): readonly Landmark[] | null;
  dispose(): void;
}
