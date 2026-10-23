import { CircleHelp, Menu } from "lucide-react";
import { pageNames } from "../navigation";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<WorkspaceModel, "page" | "setHelp" | "setMobileNav">;

export function TopBar({ page, setHelp, setMobileNav }: Props) {
  return (
    <header className="topbar">
      <div className="topbar-location">
        <button
          className="icon-button mobile-menu"
          onClick={() => setMobileNav(true)}
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>
        <span className="topbar-word">LABORATÓRIO DE LIBRAS</span>
        <span className="topbar-separator">/</span>
        <span className="topbar-page">{pageNames[page]}</span>
      </div>
      <div className="topbar-actions">
        <span className="local-pill">
          <span />
          100% no seu navegador
        </span>
        <button className="help-button" onClick={() => setHelp(true)}>
          <CircleHelp size={17} />
          <span>Como funciona</span>
        </button>
      </div>
    </header>
  );
}
