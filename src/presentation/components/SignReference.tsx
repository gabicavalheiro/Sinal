import { useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";
export const REFERENCE_SOURCE =
  "https://www.ifbaiano.edu.br/unidades/bonfim/files/2022/07/Alfabeto-manual-em-Libras-1.pdf";
export function SignReference({ letter }: { letter: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const available = /^[A-ZÇ]$/.test(letter);
  useEffect(() => {
    dialog.current?.close();
  }, [letter]);
  const image = available ? (
    <img
      src={"/references/" + (letter === "Ç" ? "cedilla" : letter.toLowerCase()) + ".png"}
      alt={`Referência do sinal da letra ${letter}, publicada pelo IF Baiano`}
      width="340"
      height="255"
    />
  ) : (
    <span className="reference-unavailable">Referência ainda indisponível.</span>
  );
  return (
    <>
      <div className="sign-photo">{image}</div>
      <button className="journey-text-button" onClick={() => dialog.current?.showModal()}>
        Ver como fazer
      </button>
      <dialog
        className="sign-dialog"
        ref={dialog}
        aria-labelledby="sign-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="icon-button sign-dialog-close"
          aria-label="Fechar referência"
          onClick={() => dialog.current?.close()}
        >
          <X size={21} />
        </button>
        <h2 id="sign-dialog-title">Observe a letra {letter}</h2>
        {image}
        <p>
          Observe a posição da mão e as setas, quando houver movimento. Pratique no seu
          ritmo.
        </p>
        <a href={REFERENCE_SOURCE} target="_blank" rel="noreferrer">
          Material completo · IF Baiano <ExternalLink size={14} />
        </a>
        <small>
          Referência de estudo. O aplicativo não foi validado pela instituição.
        </small>
      </dialog>
    </>
  );
}
