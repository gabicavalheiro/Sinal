import {
  ArrowRight,
  BookOpen,
  ChartNoAxesColumnIncreasing,
  ChevronRight,
  GraduationCap,
  Hand,
  Layers3,
  ScanLine,
  Settings2,
  Sparkle,
} from "lucide-react";
import type { ReactNode } from "react";
import { pageNames, type Page } from "../navigation";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<WorkspaceModel, "page" | "mobileNav" | "navigate">;

export function Sidebar({ page, mobileNav, navigate }: Props) {
  const navItem = (target: Page, icon: ReactNode) => (
    <button
      className={"nav-item " + (page === target ? "nav-item--active" : "")}
      onClick={() => navigate(target)}
      aria-current={page === target ? "page" : undefined}
    >
      {icon}
      <span>{pageNames[target]}</span>
      {page === target && <span className="nav-active-dot" />}
    </button>
  );
  return (
    <aside className={"sidebar " + (mobileNav ? "sidebar--open" : "")}>
      <button
        className="brand"
        onClick={() => navigate("live")}
        aria-label="Sinal, início"
      >
        <span className="brand-symbol">
          <Hand size={25} strokeWidth={1.6} />
        </span>
        <span>
          sinal<span className="brand-period">.</span>
        </span>
      </button>
      <p className="brand-caption">O COMEÇO DE UMA CONVERSA</p>
      <div className="navigation">
        <p className="nav-label">SEU ESPAÇO</p>
        <nav aria-label="Principal">
          {navItem("live", <ScanLine size={19} />)}
          {navItem("practice", <GraduationCap size={20} />)}
        </nav>
        <p className="nav-label nav-label--second">PARA EXPLORAR</p>
        <nav aria-label="Aprendizado">
          {navItem("alphabet", <BookOpen size={19} />)}
          {navItem("progress", <ChartNoAxesColumnIncreasing size={19} />)}
        </nav>
        <p className="nav-label nav-label--second">POR DENTRO</p>
        <nav aria-label="Projeto">
          {navItem("project", <Layers3 size={19} />)}
          {navItem("settings", <Settings2 size={19} />)}
        </nav>
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-note">
          <div className="note-doodle">
            <Sparkle size={23} strokeWidth={1.2} />
            <span>um gesto de cada vez</span>
          </div>
          <p>
            Pequenos gestos.
            <br />
            Novas conexões.
          </p>
          <button onClick={() => navigate("practice")}>
            Vamos praticar <ArrowRight size={16} />
          </button>
        </div>
        <button className="sidebar-about" onClick={() => navigate("project")}>
          <span className="avatar-icon">
            <Hand size={17} />
          </span>
          <span>
            Feito para aproximar<small>Em construção · v0.1</small>
          </span>
          <ChevronRight size={15} />
        </button>
      </div>
    </aside>
  );
}
