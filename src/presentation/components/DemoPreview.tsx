import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { HandIllustration } from "../HandIllustration";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<
  WorkspaceModel,
  "demoIndex" | "preferences" | "sampleLetter" | "setDemo" | "setDemoIndex"
>;

export function DemoPreview({
  demoIndex,
  preferences,
  sampleLetter,
  setDemo,
  setDemoIndex,
}: Props) {
  return (
    <div className="demo-stage">
      <div className="demo-guide-corners" />
      <HandIllustration
        key={sampleLetter}
        letter={sampleLetter}
        landmarks={sampleLetter === "B" && preferences.points}
      />
      <span className="demo-letter-floating">{sampleLetter}</span>
      <p>Uma prévia de como vai funcionar.</p>
      <div className="demo-step">
        <button
          className="icon-button"
          onClick={() => setDemoIndex((i) => (i + 3) % 4)}
          aria-label="Exemplo anterior"
        >
          <ArrowLeft size={17} />
        </button>
        <span>Exemplo {(demoIndex % 4) + 1} de 4</span>
        <button
          className="icon-button"
          onClick={() => setDemoIndex((i) => i + 1)}
          aria-label="Próximo exemplo"
        >
          <ArrowRight size={17} />
        </button>
      </div>
      <button className="demo-exit" onClick={() => setDemo(false)}>
        <X size={14} />
        Sair da demonstração
      </button>
    </div>
  );
}
