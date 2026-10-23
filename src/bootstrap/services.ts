import { browserCamera } from "../infrastructure/camera";
import { createHandDetector } from "../infrastructure/mediapipe";
import { createSpellNetClassifier } from "../infrastructure/spellnet";
import { browserStorage } from "../infrastructure/storage";
import { browserText } from "../infrastructure/text";

import type { AppServices } from "../application/services";

export const services = Object.freeze({
  camera: browserCamera,
  createDetector: createHandDetector,
  createClassifier: createSpellNetClassifier,
  text: browserText,
  storage: browserStorage,
} satisfies AppServices);
