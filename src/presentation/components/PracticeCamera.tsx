import { Camera, CameraOff, Check, LoaderCircle } from "lucide-react";
import { Button } from "../design-system";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<
  WorkspaceModel,
  "camera" | "recognition" | "preferences" | "startCamera"
> & { target: string; supported: boolean; confirmed: boolean };
export function PracticeCamera({
  camera,
  recognition,
  preferences,
  startCamera,
  target,
  supported,
  confirmed,
}: Props) {
  const active = camera.status === "active";
  const unavailable =
    recognition.status === "error" || camera.detectorStatus === "unavailable";
  const preparing =
    recognition.status === "loading" || camera.detectorStatus === "loading";
  const message = !supported
    ? "Esta letra tem prática de observação."
    : confirmed
      ? `Letra ${target} reconhecida. Pode continuar.`
      : !active
        ? ""
        : unavailable
          ? "Não consegui iniciar o reconhecimento. Tente religar a câmera."
          : preparing
            ? "Preparando reconhecimento…"
            : !camera.landmarks
              ? "Posicione uma mão inteira na câmera."
              : recognition.prediction?.letter === target
                ? `Solte o gesto e faça ${target} novamente.`
                : recognition.prediction
                  ? `Reconheci ${recognition.prediction.letter}. Vamos tentar ${target}?`
                  : "Mantenha o sinal por um instante.";
  return (
    <div className={"journey-camera " + (active ? "journey-camera--active" : "")}>
      <video
        ref={camera.videoRef}
        autoPlay
        muted
        playsInline
        className={preferences.mirror ? "is-mirrored" : ""}
        aria-label="Sua câmera para praticar"
        style={{ visibility: active && supported ? "visible" : "hidden" }}
      />
      {supported && !active && (
        <div className="journey-camera-start">
          <Camera size={28} strokeWidth={1.4} />
          <p>
            {camera.error ||
              (camera.status === "requesting"
                ? "Permita o acesso no navegador."
                : "Veja sua mão enquanto pratica.")}
          </p>
          <Button onClick={camera.status === "requesting" ? camera.stop : startCamera}>
            {camera.status === "requesting"
              ? "Cancelar"
              : camera.status === "error"
                ? "Tentar novamente"
                : "Ativar câmera"}
          </Button>
          <small>Vídeo só no seu dispositivo.</small>
        </div>
      )}
      {!supported && (
        <div className="journey-camera-start">
          <CameraOff size={28} strokeWidth={1.4} />
          <p>Sem avaliação pela câmera para {target}.</p>
          <small>Observe a referência e continue quando quiser.</small>
        </div>
      )}
      {active && supported && (
        <button
          className="journey-camera-stop icon-button"
          onClick={camera.stop}
          aria-label="Desligar câmera"
        >
          <CameraOff size={19} />
        </button>
      )}
      {((active && supported) || !supported) && (
        <div
          className={"journey-feedback " + (confirmed ? "journey-feedback--success" : "")}
          role="status"
        >
          {confirmed ? (
            <Check size={18} />
          ) : preparing ? (
            <LoaderCircle size={16} className="spin" />
          ) : null}
          {message}
        </div>
      )}
    </div>
  );
}
