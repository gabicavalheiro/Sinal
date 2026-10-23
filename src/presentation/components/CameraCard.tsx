import { Check, LoaderCircle, ScanLine, VideoOff } from "lucide-react";
import type { WorkspaceModel } from "../useWorkspace";
import { CameraControls } from "./CameraControls";
import { CameraPlaceholder } from "./CameraPlaceholder";
import { DemoPreview } from "./DemoPreview";
import { LandmarkOverlay } from "./LandmarkOverlay";
type Props = Pick<
  WorkspaceModel,
  | "camera"
  | "demo"
  | "demoIndex"
  | "navigate"
  | "preferences"
  | "recognition"
  | "recognitionMessage"
  | "sampleLetter"
  | "setDemo"
  | "setDemoIndex"
  | "setPreferences"
  | "startCamera"
  | "videoHeight"
  | "videoWidth"
>;

export function CameraCard({
  camera,
  demo,
  demoIndex,
  navigate,
  preferences,
  recognition,
  recognitionMessage,
  sampleLetter,
  setDemo,
  setDemoIndex,
  setPreferences,
  startCamera,
  videoHeight,
  videoWidth,
}: Props) {
  return (
    <section className="camera-card" aria-label="Área da câmera">
      <div
        className={
          "camera-view " +
          (camera.status === "active" ? "camera-view--active " : "") +
          (demo ? "camera-view--demo" : "")
        }
      >
        <div className="camera-topline">
          <span
            className={
              "camera-status " +
              (camera.status === "active" || demo ? "camera-status--on" : "")
            }
          >
            <span />
            {demo
              ? "Demonstração"
              : camera.status === "active"
                ? "Câmera ligada"
                : camera.status === "requesting"
                  ? "Aguardando permissão"
                  : "Câmera desligada"}
          </span>
          <span className="camera-mode">
            {demo ? "EXEMPLO INTERATIVO" : "SUA CÂMERA, SEU ESPAÇO"}
          </span>
        </div>
        <video
          ref={camera.videoRef}
          autoPlay
          muted
          playsInline
          className={"camera-video " + (preferences.mirror ? "is-mirrored" : "")}
          style={{
            visibility: camera.status === "active" ? "visible" : "hidden",
          }}
          aria-label="Vídeo ao vivo da sua webcam"
        />
        {camera.status === "active" && camera.landmarks && preferences.points && (
          <LandmarkOverlay
            camera={camera}
            preferences={preferences}
            videoHeight={videoHeight}
            videoWidth={videoWidth}
          />
        )}
        {camera.status !== "active" && !demo && (
          <CameraPlaceholder
            camera={camera}
            preferences={preferences}
            startCamera={startCamera}
          />
        )}
        {demo && (
          <DemoPreview
            demoIndex={demoIndex}
            preferences={preferences}
            sampleLetter={sampleLetter}
            setDemo={setDemo}
            setDemoIndex={setDemoIndex}
          />
        )}
        {camera.status === "active" && (
          <>
            <div className="capture-frame">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div
              className={
                "live-message " +
                (recognition.prediction ? "live-message--confirmed" : "")
              }
              role="status"
              aria-live="polite"
            >
              {recognition.prediction ? (
                <>
                  <Check size={20} />
                  <strong>Letra {recognition.prediction.letter} confirmada</strong>
                </>
              ) : camera.detectorStatus === "loading" ? (
                <>
                  <LoaderCircle className="spin" size={15} />
                  Preparando detector de mãos…
                </>
              ) : (
                <>
                  <ScanLine size={16} />
                  {recognitionMessage}
                </>
              )}
            </div>
            <button className="stop-camera" onClick={camera.stop}>
              <VideoOff size={15} />
              Desligar câmera
            </button>
          </>
        )}
      </div>
      <details className="camera-options">
        <summary>Ajustes da câmera</summary>
        <CameraControls
          navigate={navigate}
          preferences={preferences}
          setPreferences={setPreferences}
        />
      </details>
    </section>
  );
}
