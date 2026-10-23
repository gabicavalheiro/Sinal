import { ArrowRight, ScanLine, Video, X } from "lucide-react";
import { Button } from "../design-system";
import { HandIllustration } from "../HandIllustration";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<WorkspaceModel, "camera" | "preferences" | "startCamera">;

export function CameraPlaceholder({ camera, preferences, startCamera }: Props) {
  return (
    <div className="camera-placeholder">
      <div className="hand-stage">
        <div className="stage-orbit stage-orbit--one" />
        <div className="stage-orbit stage-orbit--two" />
        <span className="stage-spark stage-spark--one">+</span>
        <span className="stage-spark stage-spark--two">+</span>
        <HandIllustration landmarks={preferences.points} />
        <span className="hand-badge">
          <ScanLine size={15} />
          <span>Um mundo nas suas mãos</span>
        </span>
      </div>
      <h2>
        {camera.status === "requesting"
          ? "Pode deixar a câmera entrar."
          : camera.status === "error"
            ? "Vamos tentar de novo?"
            : "O próximo passo é seu."}
      </h2>
      <p>
        {camera.status === "requesting"
          ? "Confirme a permissão no aviso do seu navegador."
          : camera.error || (
              <>
                Ative a câmera e posicione sua mão.
                <br />O resto começa com um gesto.
              </>
            )}
      </p>
      <Button
        onClick={camera.status === "requesting" ? camera.stop : startCamera}
        icon={camera.status === "requesting" ? <X size={17} /> : <Video size={18} />}
        variant={camera.status === "requesting" ? "secondary" : "primary"}
      >
        {camera.status === "requesting"
          ? "Cancelar solicitação"
          : camera.status === "error"
            ? "Tentar novamente"
            : "Ativar câmera"}
        {camera.status !== "requesting" && <ArrowRight size={16} />}
      </Button>
    </div>
  );
}
