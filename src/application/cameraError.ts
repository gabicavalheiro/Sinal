export function cameraError(error: unknown): string {
  if (error instanceof Error && error.message === "UNSUPPORTED")
    return "Este navegador precisa de HTTPS e suporte à webcam. Experimente Chrome, Edge ou Firefox atualizado.";
  const name = error instanceof DOMException ? error.name : "";
  if (name === "NotAllowedError" || name === "SecurityError")
    return "O acesso à câmera não foi permitido. Libere a câmera nas configurações do navegador e tente novamente.";
  if (name === "NotFoundError")
    return "Não encontramos uma webcam. Conecte uma câmera e tente novamente.";
  if (name === "NotReadableError")
    return "Sua câmera está ocupada. Feche o app que está usando a webcam e tente novamente.";
  return "Não foi possível iniciar a câmera. Confira a conexão da webcam e tente novamente.";
}
