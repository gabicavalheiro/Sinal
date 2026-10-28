import {
  BookOpen,
  ChartNoAxesColumnIncreasing,
  GraduationCap,
  Hand,
  Layers3,
  ScanLine,
  Settings2,
} from "lucide-react";
import type { ReactNode } from "react";
import { navGroups, pageDescriptions, pageNames, type Page } from "../navigation";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<WorkspaceModel, "page" | "mobileNav" | "navigate">;

const icons: Record<Page, ReactNode> = {
  learn: <Hand size={18} strokeWidth={1.8} />,
  live: <ScanLine size={18} strokeWidth={1.8} />,
  practice: <GraduationCap size={19} strokeWidth={1.8} />,
  alphabet: <BookOpen size={18} strokeWidth={1.8} />,
  progress: <ChartNoAxesColumnIncreasing size={18} strokeWidth={1.8} />,
  project: <Layers3 size={18} strokeWidth={1.8} />,
  settings: <Settings2 size={18} strokeWidth={1.8} />,
};

export function Sidebar({ page, mobileNav, navigate }: Props) {
  return (
    <aside className={"sidebar " + (mobileNav ? "sidebar--open" : "")}>
      <button
        className="brand"
        onClick={() => navigate("learn")}
        aria-label="Sinal, início"
      >
        <span className="brand-symbol">
          <Hand size={25} strokeWidth={1.6} />
        </span>
        <span>
          sinal<span className="brand-period">.</span>
        </span>
      </button>
      <p className="sidebar-mission">
        Projeto de <strong>Machine Learning</strong> que reconhece o alfabeto manual de
        Libras pela câmera, rodando inteiramente no navegador.
      </p>
      <div className="navigation">
        {navGroups.map((group) => (
          <nav key={group.label} aria-label={group.label} className="nav-group">
            <p className="nav-label">{group.label}</p>
            {group.pages.map((target) => (
              <button
                key={target}
                className={"nav-item " + (page === target ? "nav-item--active" : "")}
                onClick={() => navigate(target)}
                aria-current={page === target ? "page" : undefined}
              >
                <span className="nav-item-icon">{icons[target]}</span>
                <span className="nav-item-copy">
                  <span className="nav-item-title">{pageNames[target]}</span>
                  <span className="nav-item-desc">{pageDescriptions[target]}</span>
                </span>
              </button>
            ))}
          </nav>
        ))}
      </div>
      <div className="sidebar-bottom">
        <p className="sidebar-local">100% no seu navegador · nenhuma imagem é enviada</p>
      </div>
    </aside>
  );
}
