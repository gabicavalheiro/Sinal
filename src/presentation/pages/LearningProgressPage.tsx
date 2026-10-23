import { RotateCcw } from "lucide-react";
import type { NamePracticeModel } from "../../application/useNamePractice";
import { Button } from "../design-system";
export function LearningProgressPage({
  journey,
  onReview,
}: {
  journey: NamePracticeModel;
  onReview: () => void;
}) {
  return (
    <section className="learning-history">
      <h1>Seu ritmo, sua prática.</h1>
      <p>Este histórico fica só neste navegador.</p>
      <div className="learning-history-card">
        <strong>{journey.saved.sessions}</strong>
        <span>
          {journey.saved.sessions === 1 ? "sequência concluída" : "sequências concluídas"}
        </span>
      </div>
      {journey.saved.letters.length > 0 ? (
        <>
          <h2>Para retomar com calma</h2>
          <p>{journey.saved.letters.join(" · ")}</p>
          <Button onClick={onReview}>
            Revisar essas letras
            <RotateCcw size={16} />
          </Button>
        </>
      ) : (
        <p>Nenhuma letra na sua lista de revisão.</p>
      )}
      <p className="summary-note">
        Letras deixadas para depois entram na revisão. Esse registro não mede acertos nem
        fluência.
      </p>
    </section>
  );
}
