import { GraduationCap, LockKeyhole, ScanLine } from "lucide-react";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<WorkspaceModel, "navigate" | "page">;

export function WorkspaceTabs({ navigate, page }: Props) {
  return (
    <div
      className="workspace-tabs"
      role="tablist"
      aria-label="Modo de uso"
      onKeyDown={(event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const index =
          event.key === "Home" ? 0 : event.key === "End" ? 1 : page === "live" ? 1 : 0;
        navigate(index === 0 ? "live" : "practice");
        event.currentTarget
          .querySelectorAll<HTMLButtonElement>('[role="tab"]')
          [index]?.focus();
      }}
    >
      <button
        role="tab"
        id="tab-live"
        aria-controls="workspace-panel"
        tabIndex={page === "live" ? 0 : -1}
        aria-selected={page === "live"}
        onClick={() => navigate("live")}
      >
        <ScanLine size={17} />
        Tradução ao vivo
      </button>
      <button
        role="tab"
        id="tab-practice"
        aria-controls="workspace-panel"
        tabIndex={page === "practice" ? 0 : -1}
        aria-selected={page === "practice"}
        onClick={() => navigate("practice")}
      >
        <GraduationCap size={19} />
        Modo prática
      </button>
      <span className="workspace-caption">
        <LockKeyhole size={13} />
        Seu espaço é privado
      </span>
    </div>
  );
}
