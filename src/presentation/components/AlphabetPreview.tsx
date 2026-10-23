import { MoveUpRight } from "lucide-react";
import { HandIllustration } from "../HandIllustration";
import { letters } from "../content";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<WorkspaceModel, "navigate" | "setSelectedLetter">;

export function AlphabetPreview({ navigate, setSelectedLetter }: Props) {
  return (
    <section className="alphabet-preview">
      <div className="section-title">
        <div>
          <h2>
            Todo gesto tem um começo<span>.</span>
          </h2>
          <p>Conheça as primeiras letras do alfabeto manual.</p>
        </div>
        <button className="text-link" onClick={() => navigate("alphabet")}>
          Explorar o alfabeto
          <MoveUpRight size={16} />
        </button>
      </div>
      <div className="letter-preview-grid">
        {letters.map((letter, i) => (
          <button
            className="letter-preview"
            key={letter}
            onClick={() => {
              setSelectedLetter(letter);
              navigate("alphabet");
            }}
          >
            <div className={"letter-art letter-art--" + i}>
              <HandIllustration letter={letter} />
              <span>{letter}</span>
            </div>
            <div className="letter-caption">
              <span>Letra {letter}</span>
              <MoveUpRight size={16} />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
