import { ArrowRight, BookOpen, Hand, X } from "lucide-react";
import { Button } from "../design-system";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<WorkspaceModel, "dialogRef" | "setHelp">;

export function HelpDialog({ dialogRef, setHelp }: Props) {
  return (
    <dialog
      ref={dialogRef}
      className="help-dialog"
      onCancel={() => setHelp(false)}
      onClick={(e) => {
        if (e.target === e.currentTarget) setHelp(false);
      }}
      aria-labelledby="help-title"
    >
      <div className="dialog-heading">
        <span className="brand-symbol">
          <Hand size={24} />
        </span>
        <button
          className="icon-button"
          onClick={() => setHelp(false)}
          aria-label="Fechar ajuda"
        >
          <X size={20} />
        </button>
      </div>
      <span className="eyebrow">BEM-VINDO AO SINAL</span>
      <h2 id="help-title">
        Uma nova conversa
        <br />
        começa por aqui.
      </h2>
      <p>
        Este é um laboratório do alfabeto manual em Libras, em sua primeira etapa de
        desenvolvimento.
      </p>
      <ol className="help-steps">
        <li>
          <span>1</span>
          <div>
            <strong>Ative sua câmera</strong>
            <p>Permita o acesso e posicione uma mão no centro, com boa iluminação.</p>
          </div>
        </li>
        <li>
          <span>2</span>
          <div>
            <strong>Encontre os pontos</strong>
            <p>O MediaPipe identifica 21 pontos. A imagem permanece no dispositivo.</p>
          </div>
        </li>
        <li>
          <span>3</span>
          <div>
            <strong>Explore sem pressa</strong>
            <p>
              Ative a câmera e mantenha o gesto. A letra aparece quando a previsão fica
              estável. O reconhecimento é experimental e não cobre letras com movimento. A
              prática guiada continua com avaliação manual.
            </p>
          </div>
        </li>
      </ol>
      <div className="dialog-note">
        <BookOpen size={18} />
        <p>
          Libras é uma língua completa. Soletrar o alfabeto é um primeiro passo, não a
          tradução de uma conversa.
        </p>
      </div>
      <Button onClick={() => setHelp(false)}>
        Vamos começar
        <ArrowRight size={16} />
      </Button>
    </dialog>
  );
}
