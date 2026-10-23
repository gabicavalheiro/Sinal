import { ArrowRight, GraduationCap, Lightbulb } from "lucide-react";
import { type Letter } from "../../domain/landmarks";
import { InfoBanner, PageHeading } from "../components/shared";
import { letterGuides, letters } from "../content";
import { Button, Tag } from "../design-system";
import { HandIllustration } from "../HandIllustration";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<
  WorkspaceModel,
  | "navigate"
  | "selectedLetter"
  | "setPracticeDone"
  | "setPracticeIndex"
  | "setSelectedLetter"
>;

export function AlphabetPage({
  navigate,
  selectedLetter,
  setPracticeDone,
  setPracticeIndex,
  setSelectedLetter,
}: Props) {
  return (
    <>
      <PageHeading
        eyebrow="UMA LÍNGUA, MUITAS POSSIBILIDADES"
        title="O começo está"
        emphasis="nas suas mãos."
        description="Explore as primeiras letras. Observe o formato, a posição e o seu próprio gesto."
      />
      <div className="alphabet-layout">
        <section className="alphabet-library">
          <div className="section-title">
            <h2>Alfabeto manual</h2>
            <Tag variant="green">4 referências iniciais</Tag>
          </div>
          <div className="alphabet-selector">
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
              <button
                key={letter}
                disabled={!letters.includes(letter as Letter)}
                aria-pressed={selectedLetter === letter}
                onClick={() => setSelectedLetter(letter as Letter)}
              >
                {letter}
              </button>
            ))}
          </div>
          <p className="muted-note">
            A–D disponíveis nesta etapa. As demais referências serão revisadas e
            adicionadas.
          </p>
          <div className="alphabet-large-art">
            <HandIllustration letter={selectedLetter} />
            <span>{selectedLetter}</span>
            <span className="art-caption">Ilustração esquemática · vista frontal</span>
          </div>
        </section>
        <section className="letter-detail">
          <span className="eyebrow">CONHEÇA A LETRA {selectedLetter}</span>
          <h2>{letterGuides[selectedLetter].title}</h2>
          <p>{letterGuides[selectedLetter].description}</p>
          <div className="detail-tip">
            <Lightbulb size={21} />
            <div>
              <strong>Um detalhe que ajuda</strong>
              <p>{letterGuides[selectedLetter].tip}</p>
            </div>
          </div>
          <Button
            onClick={() => {
              setPracticeIndex(letters.indexOf(selectedLetter));
              setPracticeDone(false);
              navigate("practice");
            }}
            icon={<GraduationCap size={18} />}
          >
            Praticar a letra {selectedLetter}
            <ArrowRight size={16} />
          </Button>
          <p className="reference-note">
            Este guia introdutório não substitui aulas com profissionais de Libras. As
            ilustrações são esquemáticas e precisam de validação linguística.
          </p>
        </section>
      </div>
      <InfoBanner />
    </>
  );
}
