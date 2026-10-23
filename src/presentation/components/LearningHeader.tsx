import { Hand, MoreHorizontal } from "lucide-react";
import { pageNames, type Page } from "../navigation";

type Props = { page: Page; navigate: (page: Page) => void };
export function LearningHeader({ page, navigate }: Props) {
  return (
    <header className="learning-header">
      <button
        className="learning-brand"
        onClick={() => navigate("learn")}
        aria-label="Sinal, início"
      >
        <Hand size={25} strokeWidth={1.6} />
        <span>
          sinal<span className="brand-period">.</span>
        </span>
      </button>
      <nav aria-label="Principal">
        <button
          aria-current={page === "learn" ? "page" : undefined}
          onClick={() => navigate("learn")}
        >
          Praticar
        </button>
        <button
          aria-current={page === "alphabet" ? "page" : undefined}
          onClick={() => navigate("alphabet")}
        >
          Alfabeto
        </button>
        <details className="learning-menu">
          <summary aria-label="Mais opções">
            <MoreHorizontal size={22} />
          </summary>
          <div>
            {(["live", "progress", "settings", "project"] as Page[]).map((target) => (
              <button
                key={target}
                onClick={(event) => {
                  event.currentTarget.closest("details")?.removeAttribute("open");
                  navigate(target);
                }}
              >
                {pageNames[target]}
              </button>
            ))}
          </div>
        </details>
      </nav>
    </header>
  );
}
