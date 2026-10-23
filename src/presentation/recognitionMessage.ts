type RecognitionState = {
  status: "idle" | "loading" | "ready" | "error";
  candidate: boolean;
};

export function recognitionMessage(
  recognition: RecognitionState,
  detectorUnavailable: boolean,
  hasHand: boolean,
): string {
  if (recognition.status === "loading") return "Carregando reconhecimento…";
  if (recognition.status === "error")
    return "Reconhecimento indisponível. Reative a câmera para tentar de novo.";
  if (detectorUnavailable) return "Detector de mãos indisponível. Confira sua conexão.";
  if (!hasHand) return "Posicione uma mão no centro";
  if (recognition.candidate) return "Mantenha o gesto por um instante…";
  return "Ajuste o gesto e mantenha a mão bem iluminada.";
}
