import { ArrowRight, Check, ChevronRight, Hand } from "lucide-react";
import { letterGuides } from "../content";
import { Button, Tag } from "../design-system";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<
  WorkspaceModel,
  | "finishPractice"
  | "nextPractice"
  | "practiceDone"
  | "practiceIndex"
  | "practiceLetter"
  | "totalPractice"
>;

export function PracticePanel({
  finishPractice,
  nextPractice,
  practiceDone,
  practiceIndex,
  practiceLetter,
  totalPractice,
}: Props) {
  return (
    <section
      className={"practice-card " + (practiceDone ? "practice-card--done" : "")}
      aria-label="Desafio de prática"
    >
      <div className="panel-title">
        <h2>Seu próximo gesto</h2>
        <Tag variant="green">{(practiceIndex % 4) + 1} de 4</Tag>
      </div>
      <span className="micro-label">
        {practiceDone ? "MAIS UM PASSO DADO" : "VAMOS PRATICAR A LETRA"}
      </span>
      <div className="practice-letter">
        {practiceDone && (
          <span className="practice-check">
            <Check size={20} />
          </span>
        )}
        {practiceLetter}
      </div>
      <h3>{practiceDone ? "Cada gesto conta." : letterGuides[practiceLetter].title}</h3>
      <p>
        {practiceDone
          ? "Prática registrada no seu dispositivo. Continue no seu ritmo."
          : letterGuides[practiceLetter].description}
      </p>
      <div className="practice-manual">
        <Hand size={15} />
        <span>Prática guiada · avaliação manual</span>
      </div>
      <Button
        icon={practiceDone ? <ArrowRight size={16} /> : <Check size={16} />}
        onClick={practiceDone ? nextPractice : finishPractice}
      >
        {practiceDone ? "Próxima letra" : "Consegui fazer o sinal"}
      </Button>
      <button className="practice-skip" onClick={nextPractice}>
        {practiceDone ? "Continuar praticando" : "Pular por enquanto"}
        <ChevronRight size={14} />
      </button>
      <div className="practice-progress">
        <span>
          {totalPractice} {totalPractice === 1 ? "gesto praticado" : "gestos praticados"}
        </span>
        <span>Sem pressa. Sem comparação.</span>
      </div>
    </section>
  );
}
