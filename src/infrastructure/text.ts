import type { TextPort } from "../domain/ports";

export const browserText: TextPort = {
  copy: (text) => navigator.clipboard.writeText(text),
  download(text, filename) {
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  },
};
