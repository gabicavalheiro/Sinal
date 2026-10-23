import { ArrowRight, BookOpen, Hand, LockKeyhole, Sparkle, Trash2 } from "lucide-react";
import { PageHeading, Stat } from "../components/shared";
import { letters } from "../content";
import { Button, Tag } from "../design-system";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<
  WorkspaceModel,
  | "navigate"
  | "progress"
  | "setPracticeDone"
  | "setPracticeIndex"
  | "setProgress"
  | "setToast"
  | "totalPractice"
>;

export function ProgressPage({
  navigate,
  progress,
  setPracticeDone,
  setPracticeIndex,
  setProgress,
  setToast,
  totalPractice,
}: Props) {
  return (
    <>
      <PageHeading
        eyebrow="CADA PASSO É UMA CONQUISTA"
        title="Você está criando"
        emphasis="novas conexões."
        description="Um registro dos gestos que você marcou como praticados. Só seu, só neste navegador."
      />
      <div className="stats-grid">
        <Stat
          value={totalPractice.toString().padStart(2, "0")}
          label="gestos praticados"
          icon={<Hand />}
        />
        <Stat
          value={Object.values(progress)
            .filter((n) => n > 0)
            .length.toString()
            .padStart(2, "0")}
          label="letras exploradas"
          icon={<BookOpen />}
        />
        <Stat value="∞" label="possibilidades de aprender" icon={<Sparkle />} />
      </div>
      <section className="content-card progress-list">
        <div className="section-title">
          <h2>Seu caminho, letra por letra</h2>
          <Tag>Avaliação manual</Tag>
        </div>
        {letters.map((letter) => (
          <div className="progress-row" key={letter}>
            <span className="progress-letter">{letter}</span>
            <div>
              <strong>
                {progress[letter]
                  ? "Um gesto que já faz parte do seu caminho."
                  : "Uma nova conexão para descobrir."}
              </strong>
              <small>
                {progress[letter]}{" "}
                {progress[letter] === 1 ? "prática registrada" : "práticas registradas"}
              </small>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                setPracticeIndex(letters.indexOf(letter));
                setPracticeDone(false);
                navigate("practice");
              }}
            >
              Praticar
              <ArrowRight size={15} />
            </Button>
          </div>
        ))}
        <p className="muted-note">
          As contagens indicam prática autodeclarada, sem medir precisão ou domínio da
          língua.
        </p>
      </section>
      <div className="progress-footer">
        <span>
          <LockKeyhole size={14} />
          Armazenado localmente. Sem conta, sem rastreamento.
        </span>
        <button
          className="text-link"
          disabled={!totalPractice}
          onClick={() => {
            if (
              window.confirm(
                "Apagar o histórico de prática deste navegador? Esta ação não pode ser desfeita.",
              )
            ) {
              setProgress({ A: 0, B: 0, C: 0, D: 0 });
              setToast("Histórico de prática apagado.");
            }
          }}
        >
          Apagar meu histórico
          <Trash2 size={14} />
        </button>
      </div>
    </>
  );
}
