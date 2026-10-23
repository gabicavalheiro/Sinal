import { ArrowRight, LockKeyhole, Play } from "lucide-react";
import { AlphabetPreview } from "../components/AlphabetPreview";
import { CameraCard } from "../components/CameraCard";
import { PracticePanel } from "../components/PracticePanel";
import { QuickGuide } from "../components/QuickGuide";
import { TranslationPanel } from "../components/TranslationPanel";
import { WorkspaceTabs } from "../components/WorkspaceTabs";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<
  WorkspaceModel,
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
  | "setSelectedLetter"
  | "setTranslation"
  | "startCamera"
  | "startDemo"
  | "totalPractice"
  | "translation"
  | "videoHeight"
  | "videoWidth"
>;

export function WorkspacePage({
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
  setSelectedLetter,
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
      <section className="page-heading">
        <div>
          <div className="eyebrow">
            <span />
            {page === "practice"
              ? "UM POUCO A CADA DIA"
              : "MAIS CONEXÃO, MENOS BARREIRAS"}
          </div>
          <h1>
            {page === "practice" ? (
              <>
                Todo aprendizado começa
                <br />
                <em>com a prática.</em>
              </>
            ) : (
              <>
                A conversa começa
                <br />
                <em>com um gesto.</em>
              </>
            )}
          </h1>
          <p>
            {page === "practice"
              ? "Escolha uma letra, encontre seu ritmo e celebre cada avanço."
              : "Explore o alfabeto em Libras. Dê voz às suas mãos, no seu tempo."}
          </p>
        </div>
        <div className="heading-decoration" aria-hidden="true">
          <span>
            mãos que
            <br />
            conectam
          </span>
          <svg viewBox="0 0 100 75">
            <path
              d="M9 17C37 4 79 13 64 38C53 57 29 47 44 31C58 17 84 35 81 61M70 54L81 64L91 54"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
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
            camera={camera}
            copyTranslation={copyTranslation}
            currentLetter={currentLetter}
            demo={demo}
            downloadTranslation={downloadTranslation}
            recognition={recognition}
            recognitionMessage={recognitionMessage}
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
      <QuickGuide />
      <AlphabetPreview navigate={navigate} setSelectedLetter={setSelectedLetter} />
    </>
  );
}
