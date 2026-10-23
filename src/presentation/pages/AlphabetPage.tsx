import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SPELLNET_LABELS } from "../../domain/recognition";
import { SignReference } from "../components/SignReference";
import { Button } from "../design-system";

export function AlphabetPage({ onPractice }: { onPractice: (letter: string) => void }) {
  const [selected, setSelected] = useState("A");
  const supported = SPELLNET_LABELS.some((letter) => letter === selected);
  return (
    <section className="learning-alphabet">
      <h1>Conheça o alfabeto.</h1>
      <p>Escolha uma letra para observar o sinal.</p>
      <div className="learning-alphabet-layout">
        <div
          className="learning-letter-picker"
          role="group"
          aria-label="Escolha uma letra"
        >
          {Array.from("ABCÇDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => (
            <button
              key={letter}
              aria-pressed={selected === letter}
              onClick={() => setSelected(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="learning-letter-reference">
          <h2>Letra {selected}</h2>
          <SignReference letter={selected} />
          <p>
            {supported
              ? "Disponível para praticar com a câmera."
              : "Referência de estudo. Sem avaliação pela câmera nesta versão."}
          </p>
          <Button onClick={() => onPractice(selected)}>
            Praticar {selected}
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
