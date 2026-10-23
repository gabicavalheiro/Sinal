import { CheckCheck, X } from "lucide-react";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<WorkspaceModel, "setToast" | "toast">;

export function Toast({ setToast, toast }: Props) {
  return (
    <div className="toast" role="status">
      <CheckCheck size={18} />
      {toast}
      <button
        className="icon-button"
        aria-label="Fechar aviso"
        onClick={() => setToast("")}
      >
        <X size={15} />
      </button>
    </div>
  );
}
