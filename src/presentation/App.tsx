import { Footer } from "./components/Footer";
import { HelpDialog } from "./components/HelpDialog";
import { Sidebar } from "./components/Sidebar";
import { Toast } from "./components/Toast";
import { TopBar } from "./components/TopBar";
import { AlphabetPage } from "./pages/AlphabetPage";
import { ProgressPage } from "./pages/ProgressPage";
import { ProjectPage } from "./pages/ProjectPage";
import { SettingsPage } from "./pages/SettingsPage";
import { WorkspacePage } from "./pages/WorkspacePage";
import { useWorkspace } from "./useWorkspace";

import type { AppServices } from "../application/services";

export default function App({ services }: { services: AppServices }) {
  const {
    camera,
    copyTranslation,
    currentLetter,
    demo,
    demoIndex,
    dialogRef,
    downloadTranslation,
    finishPractice,
    mobileNav,
    navigate,
    nextPractice,
    page,
    practiceDone,
    practiceIndex,
    practiceLetter,
    preferences,
    progress,
    recognition,
    recognitionMessage,
    sampleLetter,
    selectedLetter,
    setDemo,
    setDemoIndex,
    setHelp,
    setMobileNav,
    setPracticeDone,
    setPracticeIndex,
    setPreferences,
    setProgress,
    setSelectedLetter,
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
    <div className="app-shell">
      {mobileNav && (
        <button
          className="sidebar-scrim"
          aria-label="Fechar menu"
          onClick={() => setMobileNav(false)}
        />
      )}
      <Sidebar page={page} mobileNav={mobileNav} navigate={navigate} />
      <div className="main-shell">
        <TopBar page={page} setHelp={setHelp} setMobileNav={setMobileNav} />
        <main id="main-content">
          {(page === "live" || page === "practice") && (
            <WorkspacePage
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
              setSelectedLetter={setSelectedLetter}
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
              navigate={navigate}
              selectedLetter={selectedLetter}
              setPracticeDone={setPracticeDone}
              setPracticeIndex={setPracticeIndex}
              setSelectedLetter={setSelectedLetter}
            />
          )}
          {page === "progress" && (
            <ProgressPage
              navigate={navigate}
              progress={progress}
              setPracticeDone={setPracticeDone}
              setPracticeIndex={setPracticeIndex}
              setProgress={setProgress}
              setToast={setToast}
              totalPractice={totalPractice}
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
          <Footer />
        </main>
      </div>
      {toast && <Toast setToast={setToast} toast={toast} />}
      <HelpDialog dialogRef={dialogRef} setHelp={setHelp} />
    </div>
  );
}
