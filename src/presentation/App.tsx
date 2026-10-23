import { Footer } from "./components/Footer";
import { HelpDialog } from "./components/HelpDialog";
import { LearningHeader } from "./components/LearningHeader";
import { NamePracticePage } from "./pages/NamePracticePage";
import { Toast } from "./components/Toast";
import { AlphabetPage } from "./pages/AlphabetPage";
import { LearningProgressPage } from "./pages/LearningProgressPage";
import { ProjectPage } from "./pages/ProjectPage";
import { SettingsPage } from "./pages/SettingsPage";
import { WorkspacePage } from "./pages/WorkspacePage";
import { useWorkspace } from "./useWorkspace";

import type { AppServices } from "../application/services";

export default function App({ services }: { services: AppServices }) {
  const {
    journey,
    automaticWriting,
    setAutomaticWriting,
    camera,
    copyTranslation,
    currentLetter,
    demo,
    demoIndex,
    dialogRef,
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
    setHelp,
    setPreferences,
    setToast,
    setTranslation,
    startCamera,
    startDemo,
    toast,
    totalPractice,
    translation,
    videoHeight,
    videoWidth,
  } = useWorkspace(services);
  return (
    <div className="app-shell learning-app">
      <LearningHeader page={page} navigate={navigate} />
      <div className="main-shell">
        <main id="main-content">
          {page === "learn" && (
            <NamePracticePage
              journey={journey}
              camera={camera}
              recognition={recognition}
              preferences={preferences}
              startCamera={startCamera}
              navigate={navigate}
            />
          )}
          {(page === "live" || page === "practice") && (
            <WorkspacePage
              automaticWriting={automaticWriting}
              setAutomaticWriting={setAutomaticWriting}
              camera={camera}
              copyTranslation={copyTranslation}
              currentLetter={currentLetter}
              demo={demo}
              demoIndex={demoIndex}
              downloadTranslation={downloadTranslation}
              finishPractice={finishPractice}
              navigate={navigate}
              nextPractice={nextPractice}
              page={page}
              practiceDone={practiceDone}
              practiceIndex={practiceIndex}
              practiceLetter={practiceLetter}
              preferences={preferences}
              recognition={recognition}
              recognitionMessage={recognitionMessage}
              sampleLetter={sampleLetter}
              setDemo={setDemo}
              setDemoIndex={setDemoIndex}
              setPreferences={setPreferences}
              setTranslation={setTranslation}
              startCamera={startCamera}
              startDemo={startDemo}
              totalPractice={totalPractice}
              translation={translation}
              videoHeight={videoHeight}
              videoWidth={videoWidth}
            />
          )}
          {page === "alphabet" && (
            <AlphabetPage
              onPractice={(letter) => {
                journey.start(letter, true);
                navigate("learn");
              }}
            />
          )}
          {page === "progress" && (
            <LearningProgressPage
              journey={journey}
              onReview={() => {
                journey.start(journey.saved.letters.join(""), true);
                navigate("learn");
              }}
            />
          )}
          {page === "project" && <ProjectPage />}
          {page === "settings" && (
            <SettingsPage
              navigate={navigate}
              preferences={preferences}
              setPreferences={setPreferences}
              setToast={setToast}
            />
          )}
          {page !== "learn" && <Footer />}
        </main>
      </div>
      {toast && <Toast setToast={setToast} toast={toast} />}
      <HelpDialog dialogRef={dialogRef} setHelp={setHelp} />
    </div>
  );
}
