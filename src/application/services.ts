import type {
  CameraPort,
  CreateFrameClassifier,
  CreateHandDetector,
  StoragePort,
  TextPort,
} from "../domain/ports";

export interface AppServices {
  camera: CameraPort;
  createDetector: CreateHandDetector;
  createClassifier: CreateFrameClassifier;
  storage: StoragePort;
  text: TextPort;
}
