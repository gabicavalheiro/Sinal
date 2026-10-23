import { recognitionMessage as describeRecognition } from "./recognitionMessage";
import { useEffect, useRef, useState } from "react";
import { useCamera } from "../application/useCamera";
import { useNamePractice } from "../application/useNamePractice";
import { usePractice } from "../application/usePractice";
import { useRecognition } from "../application/useRecognition";
import { useStoredState } from "../application/useStoredState";
import { useAutomaticWriting } from "../application/useAutomaticWriting";
import { useTranslation } from "../application/useTranslation";
import type { AppServices } from "../application/services";
import type { Letter } from "../domain/landmarks";
import { validPreferences, type Preferences } from "../domain/preferences";
import { letters } from "./content";
import type { Page } from "./navigation";
import { useTranslationShortcuts } from "./useTranslationShortcuts";

export function useWorkspace(services: AppServices) {
  const [automaticWriting, setAutomaticWriting] = useState(true);
  const [page, setPage] = useState<Page>("learn");
  const [mobileNav, setMobileNav] = useState(false);
  const [help, setHelp] = useState(false);
  const [demo, setDemo] = useState(false);
  const [demoIndex, setDemoIndex] = useState(1);
  const [toast, setToast] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<Letter>("A");
  const [preferences, setPreferences] = useStoredState<Preferences>(
    services.storage,
    "sinal.preferences.v1",
    { points: false, mirror: true },
    validPreferences,
  );
  const {
    practiceIndex,
    setPracticeIndex,
    practiceDone,
    setPracticeDone,
    progress,
    setProgress,
    practiceLetter,
    totalPractice,
    finishPractice,
    nextPractice,
  } = usePractice(services.storage);
  const { translation, setTranslation, copyTranslation, downloadTranslation } =
    useTranslation(services.text, setToast);
  const camera = useCamera(services.camera, services.createDetector);
  const recognition = useRecognition(
    camera.status === "active",
    camera.videoRef,
    camera.landmarks,
    services.createClassifier,
  );
  const journey = useNamePractice(
    services.storage,
    page === "learn" ? recognition.prediction?.letter : undefined,
    camera.stop,
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const sampleLetter = letters[demoIndex % letters.length];
  const currentLetter = demo ? sampleLetter : recognition.prediction?.letter;
  const recognitionMessage = describeRecognition(
    recognition,
    camera.detectorStatus === "unavailable",
    !!camera.landmarks,
  );

  useAutomaticWriting(
    page === "live" && camera.status === "active" && !demo && automaticWriting,
    recognition.prediction?.letter,
    !!camera.landmarks,
    setTranslation,
  );

  function navigate(next: Page) {
    if (next !== page) {
      camera.stop();
      setDemo(false);
    }
    setPage(next);
    setMobileNav(false);
  }
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    if (help) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [help]);
  useTranslationShortcuts(page === "live" && !help, currentLetter, setTranslation);

  function startCamera() {
    setDemo(false);
    void camera.start();
  }
  function startDemo() {
    camera.stop();
    setDemo(true);
    setDemoIndex(1);
  }
  const videoWidth = camera.videoRef.current?.videoWidth || 1280;
  const videoHeight = camera.videoRef.current?.videoHeight || 720;
  return {
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
  };
}
export type WorkspaceModel = ReturnType<typeof useWorkspace>;
