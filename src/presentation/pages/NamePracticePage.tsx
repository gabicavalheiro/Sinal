import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import type { NamePracticeModel } from "../../application/useNamePractice";
import { createNameSteps } from "../../domain/namePractice";
import { Button } from "../design-system";
import { PracticeCamera } from "../components/PracticeCamera";
import { SignReference, REFERENCE_SOURCE } from "../components/SignReference";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<
  WorkspaceModel,
  "camera" | "recognition" | "preferences" | "startCamera" | "navigate"
> & { journey: NamePracticeModel };
export function NamePracticePage({
  journey,
  camera,
  recognition,
  preferences,
  startCamera,
  navigate,
}: Props) {
  useEffect(() => {
    if (journey.phase === "session" && journey.target?.supported === false) camera.stop();
  }, [journey.phase, journey.target?.supported, camera.stop]);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
  }, [journey.phase, journey.index]);
  if (journey.phase === "setup") {
    const preview = createNameSteps(journey.name);
    const unsupported = [
      ...new Set(preview.filter((step) => !step.supported).map((step) => step.letter)),
    ];
    return (
      <section className="journey-welcome">
        <span className="journey-kicker">UM SINAL DE CADA VEZ</span>
        <h1 ref={heading} tabIndex={-1}>
          Seu nome.
          <br />
          <em>Um novo jeito de dizer.</em>
        </h1>
        <p>Pratique o alfabeto em Libras com algo que já é seu.</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            journey.start();
          }}
          className="name-form"
        >
          <label htmlFor="practice-name">Qual nome você quer praticar?</label>
          <input
            id="practice-name"
            autoComplete="off"
            maxLength={40}
            placeholder="Digite seu primeiro nome"
            value={journey.name}
            onChange={(event) => journey.setName(event.target.value)}
            aria-describedby={
              journey.error
                ? "name-error"
                : unsupported.length
                  ? "name-support"
                  : undefined
            }
            aria-invalid={!!journey.error}
          />
          {journey.error && (
            <p id="name-error" role="alert" className="journey-error">
              {journey.error}
            </p>
          )}
          {unsupported.length > 0 && (
            <p id="name-support" className="name-support">
              {unsupported.join(", ")}: vamos observar a referência. Essas letras ainda
              não têm avaliação pela câmera.
            </p>
          )}
          <Button type="submit" disabled={!journey.name.trim()}>
            Começar a praticar <ArrowRight size={17} />
          </Button>
          <span className="name-form-note">Uma letra por vez. No seu ritmo.</span>
        </form>
        {journey.saved.letters.length > 0 && (
          <button
            className="journey-text-button review-entry"
            onClick={() => journey.start(journey.saved.letters.join(""), true)}
          >
            Revisar letras que deixei para depois <RotateCcw size={14} />
          </button>
        )}
        <div className="welcome-footnote">
          Não sabe por onde começar?{" "}
          <button onClick={() => navigate("alphabet")}>
            Conheça o alfabeto <ArrowRight size={13} />
          </button>
        </div>
      </section>
    );
  }
  if (journey.phase === "summary")
    return (
      <section className="journey-summary">
        <span className="summary-symbol">
          <Check size={28} />
        </span>
        <h1 ref={heading} tabIndex={-1}>
          Uma prática de cada vez.
        </h1>
        <p>Você chegou ao fim desta sequência.</p>
        <div className="summary-result">
          {journey.steps.some((step) => step.supported) ? (
            <>
              <strong>{journey.summary.recognized}</strong>
              <span>
                de {journey.steps.filter((step) => step.supported).length} letras
                reconhecidas pela câmera
              </span>
            </>
          ) : (
            <span>
              Sequência de observação concluída. Estas letras ainda não têm avaliação pela
              câmera.
            </span>
          )}
        </div>
        {journey.summary.review.length > 0 && (
          <p>
            Para retomar com calma: <strong>{journey.summary.review.join(", ")}</strong>.
          </p>
        )}
        {journey.summary.unsupported.length > 0 && (
          <p>Sem avaliação nesta versão: {journey.summary.unsupported.join(", ")}.</p>
        )}
        <p className="summary-note">
          O reconhecimento é experimental. Este resultado registra a prática, não mede
          fluência em Libras.
        </p>
        {journey.summary.review.length > 0 ? (
          <Button onClick={() => journey.start(journey.summary.review.join(""), true)}>
            Revisar essas letras <RotateCcw size={16} />
          </Button>
        ) : (
          <Button onClick={journey.restart}>
            Praticar de novo <RotateCcw size={16} />
          </Button>
        )}
        <button className="journey-text-button" onClick={journey.exit}>
          Escolher outro nome
        </button>
      </section>
    );
  const target = journey.target;
  if (!target) return null;
  return (
    <section className="journey-session">
      <div className="journey-session-top">
        <button className="journey-text-button" onClick={journey.exit}>
          <ArrowLeft size={15} /> Sair da prática
        </button>
        <span>
          Letra {journey.index + 1} de {journey.steps.length}
        </span>
      </div>
      <div
        className="journey-progress"
        role="progressbar"
        aria-label="Progresso da prática"
        aria-valuenow={journey.index}
        aria-valuemin={0}
        aria-valuemax={journey.steps.length}
      >
        <span style={{ width: `${(journey.index / journey.steps.length) * 100}%` }} />
      </div>
      <div className="journey-task">
        <span className="journey-kicker">
          {target.supported ? "SUA VEZ" : "OBSERVE O SINAL"}
        </span>
        <h1 ref={heading} tabIndex={-1}>
          Faça a letra <strong>{target.letter}</strong>
        </h1>
      </div>
      <div className="journey-stage">
        <div className="journey-reference">
          <SignReference letter={target.letter} />
        </div>
        <PracticeCamera
          camera={camera}
          recognition={recognition}
          preferences={preferences}
          startCamera={startCamera}
          target={target.letter}
          supported={target.supported}
          confirmed={journey.confirmed}
        />
      </div>
      <div className="journey-actions">
        {journey.confirmed || !target.supported ? (
          <Button onClick={journey.advance}>
            {journey.index === journey.steps.length - 1
              ? "Concluir prática"
              : "Próxima letra"}{" "}
            <ArrowRight size={17} />
          </Button>
        ) : (
          <button className="journey-text-button" onClick={journey.advance}>
            Deixar para revisar depois <ArrowRight size={14} />
          </button>
        )}
      </div>
      <details className="journey-help">
        <summary>Precisa de uma ajuda?</summary>
        <p>
          Use boa iluminação e mantenha uma mão inteira visível. Espere o sinal ser
          reconhecido. Para uma letra repetida, solte o gesto ou retire a mão antes de
          fazê-lo novamente.
        </p>
        <p>
          Se não reconhecer, você pode deixar a letra para depois. Isso não significa que
          seu sinal está errado.
        </p>
        <a href={REFERENCE_SOURCE} target="_blank" rel="noreferrer">
          Referências do alfabeto · IF Baiano
        </a>
      </details>
    </section>
  );
}
