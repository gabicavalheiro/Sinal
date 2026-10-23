import { MAX_TRANSLATION_LENGTH } from "../../application/useTranslation";
import { ArrowDownToLine, Copy, Eraser, ShieldCheck, Space, Trash2 } from "lucide-react";
import { Button, Tag } from "../design-system";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<
  WorkspaceModel,
  | "camera"
  | "copyTranslation"
  | "currentLetter"
  | "demo"
  | "downloadTranslation"
  | "recognition"
  | "recognitionMessage"
  | "setTranslation"
  | "translation"
>;

export function TranslationPanel({
  camera,
  copyTranslation,
  currentLetter,
  demo,
  downloadTranslation,
  recognition,
  recognitionMessage,
  setTranslation,
  translation,
}: Props) {
  return (
    <section className="translation-card" aria-label="Tradução">
      <div className="panel-title">
        <h2>Sua tradução</h2>
        <Tag variant={demo ? "orange" : "neutral"}>{demo ? "Exemplo" : "Ao vivo"}</Tag>
      </div>
      <div className="recognition-area">
        <span className="micro-label">
          {demo ? "LETRA DO EXEMPLO" : "LETRA IDENTIFICADA"}
        </span>
        <span
          className={
            "recognized-letter " + (currentLetter ? "recognized-letter--present" : "")
          }
        >
          {currentLetter || "—"}
        </span>
        <span className="recognition-hint">
          {demo ? (
            <>
              <span className="small-dot" />
              Exemplo ilustrativo
            </>
          ) : camera.status === "active" ? (
            <>
              <span
                className={
                  recognition.prediction ? "small-dot" : "small-dot small-dot--orange"
                }
              />
              {recognition.prediction
                ? `Letra ${recognition.prediction.letter} confirmada`
                : recognitionMessage}
            </>
          ) : (
            <>
              <span className="small-dot" />
              Aguardando seu primeiro gesto
            </>
          )}
        </span>
        {currentLetter && (
          <button
            className="add-letter"
            onClick={() =>
              setTranslation((t) => (t + currentLetter).slice(0, MAX_TRANSLATION_LENGTH))
            }
          >
            <span>Adicionar letra</span>
            <kbd>↵</kbd>
          </button>
        )}
      </div>
      <div className="transcript-heading">
        <span>SUAS PALAVRAS</span>
        <span>{translation.replaceAll(" ", "").length} letras</span>
      </div>
      <div
        className={"transcript-box " + (translation ? "transcript-box--filled" : "")}
        tabIndex={translation ? 0 : -1}
        aria-live="polite"
      >
        {translation || (
          <>
            <span className="text-cursor" />
            Sua conversa ganha forma aqui.
          </>
        )}
      </div>
      <div className="transcript-edit">
        <button
          onClick={() =>
            setTranslation((t) => (t + " ").slice(0, MAX_TRANSLATION_LENGTH))
          }
          disabled={!translation || translation.endsWith(" ")}
        >
          <Space size={16} />
          Espaço
        </button>
        <button
          onClick={() => setTranslation((t) => t.slice(0, -1))}
          disabled={!translation}
        >
          <Eraser size={15} />
          Apagar
        </button>
        <button
          className="clear-text icon-button"
          aria-label="Limpar texto"
          onClick={() => setTranslation("")}
          disabled={!translation}
        >
          <Trash2 size={15} />
        </button>
      </div>
      <div className="translation-actions">
        <Button
          variant="secondary"
          icon={<Copy size={15} />}
          disabled={!translation}
          onClick={() => void copyTranslation()}
        >
          Copiar texto
        </Button>
        <button
          className="icon-button export-button"
          aria-label="Baixar texto"
          disabled={!translation}
          onClick={downloadTranslation}
        >
          <ArrowDownToLine size={17} />
        </button>
      </div>
      <p className="translation-note">
        <ShieldCheck size={14} />
        {camera.status === "active"
          ? "Reconhecimento experimental · vídeo local."
          : "Seus gestos ficam só com você."}
      </p>
    </section>
  );
}
