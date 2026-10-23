import type { CameraPort } from "../domain/ports";

export const browserCamera: CameraPort = {
  async start(deviceId) {
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      throw new Error("UNSUPPORTED");
    }
    return navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: "user",
        ...(deviceId ? { deviceId: { exact: deviceId } } : {}),
      },
    });
  },
  stop(stream) {
    stream.getTracks().forEach((track) => track.stop());
  },
};
