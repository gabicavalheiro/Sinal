import { MAX_TRANSLATION_LENGTH } from "../../application/useTranslation";
import { ArrowDownToLine, Copy, Eraser, Space, Trash2 } from "lucide-react";
import { Button, Tag } from "../design-system";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<
  WorkspaceModel,
  | "automaticWriting"
  | "setAutomaticWriting"
  | "copyTranslation"
  | "currentLetter"
  | "demo"
  | "downloadTranslation"
  | "setTranslation"
  | "translation"
>;

export function TranslationPanel({
  automaticWriting,
  setAutomaticWriting,
  copyTranslation,
  currentLetter,
  demo,
  downloadTranslation,
  setTranslation,
  translation,
}: Props) {
  return (
    <section className="translation-card" aria-label="Tradução">
      <div className="panel-title">
        <h2>Seu texto</h2>
        <Tag variant={demo ? "orange" : "neutral"}>{demo ? "Exemplo" : "Ao vivo"}</Tag>
      </div>
      <label className="writing-toggle">
        <input
          type="checkbox"
          checked={automaticWriting}
          onChange={(event) => setAutomaticWriting(event.target.checked)}
        />
        Escrita automática {automaticWriting ? "ativada" : "pausada"}
      </label>
      <p className="writing-guidance">
        {demo
          ? "Demonstração: adicione uma letra para experimentar."
          : automaticWriting
            ? "Para repetir uma letra, retire a mão por 1 segundo."
            : "Você controla quando cada letra entra no texto."}
      </p>
      {currentLetter && (demo || !automaticWriting) && (
        <button
          className="add-letter"
          onClick={() =>
            setTranslation((text) =>
              (text + currentLetter).slice(0, MAX_TRANSLATION_LENGTH),
            )
          }
        >
          Adicionar {currentLetter}
        </button>
      )}
      <div className="transcript-heading">
        <span>TEXTO FORMADO</span>
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
            As letras reconhecidas aparecem aqui.
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
    </section>
  );
}
