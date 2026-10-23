import { ArrowRight, LockKeyhole, Play } from "lucide-react";
import { CameraCard } from "../components/CameraCard";
import { PracticePanel } from "../components/PracticePanel";
import { QuickGuide } from "../components/QuickGuide";
import { TranslationPanel } from "../components/TranslationPanel";
import { WorkspaceTabs } from "../components/WorkspaceTabs";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<
  WorkspaceModel,
  | "automaticWriting"
  | "setAutomaticWriting"
  | "camera"
  | "copyTranslation"
  | "currentLetter"
  | "demo"
  | "demoIndex"
  | "downloadTranslation"
  | "finishPractice"
  | "navigate"
  | "nextPractice"
  | "page"
  | "practiceDone"
  | "practiceIndex"
  | "practiceLetter"
  | "preferences"
  | "recognition"
  | "recognitionMessage"
  | "sampleLetter"
  | "setDemo"
  | "setDemoIndex"
  | "setPreferences"
  | "setTranslation"
  | "startCamera"
  | "startDemo"
  | "totalPractice"
  | "translation"
  | "videoHeight"
  | "videoWidth"
>;

export function WorkspacePage({
  automaticWriting,
  setAutomaticWriting,
  camera,
  copyTranslation,
  currentLetter,
  demo,
  demoIndex,
  downloadTranslation,
  finishPractice,
  navigate,
  nextPractice,
  page,
  practiceDone,
  practiceIndex,
  practiceLetter,
  preferences,
  recognition,
  recognitionMessage,
  sampleLetter,
  setDemo,
  setDemoIndex,
  setPreferences,
  setTranslation,
  startCamera,
  startDemo,
  totalPractice,
  translation,
  videoHeight,
  videoWidth,
}: Props) {
  return (
    <>
      <section className="page-heading workspace-heading">
        <div>
          <h1>
            {page === "live" ? "Experimente o reconhecimento." : "Pratique uma letra."}
          </h1>
          <p>
            {page === "live"
              ? "Faça o sinal. A letra confirmada entra no texto automaticamente."
              : "Um sinal de cada vez, no seu ritmo."}
          </p>
        </div>
      </section>
      <WorkspaceTabs navigate={navigate} page={page} />
      <div
        className="workspace-grid"
        id="workspace-panel"
        role="tabpanel"
        aria-labelledby={page === "live" ? "tab-live" : "tab-practice"}
      >
        <CameraCard
          camera={camera}
          demo={demo}
          demoIndex={demoIndex}
          navigate={navigate}
          preferences={preferences}
          recognition={recognition}
          recognitionMessage={recognitionMessage}
          sampleLetter={sampleLetter}
          setDemo={setDemo}
          setDemoIndex={setDemoIndex}
          setPreferences={setPreferences}
          startCamera={startCamera}
          videoHeight={videoHeight}
          videoWidth={videoWidth}
        />
        {page === "live" ? (
          <TranslationPanel
            automaticWriting={automaticWriting}
            setAutomaticWriting={setAutomaticWriting}
            copyTranslation={copyTranslation}
            currentLetter={currentLetter}
            demo={demo}
            downloadTranslation={downloadTranslation}
            setTranslation={setTranslation}
            translation={translation}
          />
        ) : (
          <PracticePanel
            finishPractice={finishPractice}
            nextPractice={nextPractice}
            practiceDone={practiceDone}
            practiceIndex={practiceIndex}
            practiceLetter={practiceLetter}
            totalPractice={totalPractice}
          />
        )}
      </div>
      <div className="under-camera">
        <span>
          <LockKeyhole size={13} />
          Nenhuma imagem é gravada ou enviada.
        </span>
        {demo ? (
          <button onClick={startCamera}>
            Pronto para experimentar?
            <ArrowRight size={14} />
          </button>
        ) : (
          <button onClick={startDemo}>
            <Play size={12} fill="currentColor" />
            Antes, ver uma demonstração
            <ArrowRight size={14} />
          </button>
        )}
      </div>
      <details className="workspace-help">
        <summary>Como usar o reconhecimento</summary>
        <p>
          Mantenha o sinal até a confirmação. Para repetir a mesma letra, retire a mão por
          cerca de um segundo e faça o sinal novamente. Use Espaço entre palavras e Apagar
          para corrigir.
        </p>
        <p>
          O reconhecimento é experimental e cobre 21 letras estáticas. Ele soletra
          palavras; não traduz a gramática da Libras.
        </p>
        <QuickGuide />
      </details>
    </>
  );
}
