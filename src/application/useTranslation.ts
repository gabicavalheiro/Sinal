import { useState } from "react";
import type { TextPort } from "../domain/ports";

export const MAX_TRANSLATION_LENGTH = 200;

export function useTranslation(text: TextPort, notify: (message: string) => void) {
  const [translation, setTranslation] = useState("");
  async function copyTranslation() {
    try {
      await text.copy(translation);
      notify("Texto copiado. Pronto para compartilhar.");
    } catch {
      notify("Não foi possível copiar. Selecione o texto e use Ctrl+C.");
    }
  }
  function downloadTranslation() {
    text.download(translation, "minha-conversa-sinal.txt");
  }
  return { translation, setTranslation, copyTranslation, downloadTranslation };
}
