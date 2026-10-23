import { Eye, FlipHorizontal2, Settings2 } from "lucide-react";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<WorkspaceModel, "navigate" | "preferences" | "setPreferences">;

export function CameraControls({ navigate, preferences, setPreferences }: Props) {
  return (
    <div className="camera-controls">
      <label className="compact-toggle">
        <input
          type="checkbox"
          checked={preferences.points}
          onChange={(e) =>
            setPreferences((p) => ({
              ...p,
              points: e.target.checked,
            }))
          }
        />
        <span className="mini-switch" />
        <Eye size={15} />
        <span>Mostrar pontos</span>
      </label>
      <span className="control-divider" />
      <button
        className={"mirror-button " + (preferences.mirror ? "mirror-button--active" : "")}
        aria-pressed={preferences.mirror}
        onClick={() => setPreferences((p) => ({ ...p, mirror: !p.mirror }))}
      >
        <FlipHorizontal2 size={16} />
        <span>Espelhar</span>
      </button>
      <button
        className="camera-settings icon-button"
        aria-label="Abrir preferências da câmera"
        onClick={() => navigate("settings")}
      >
        <Settings2 size={17} />
      </button>
    </div>
  );
}
