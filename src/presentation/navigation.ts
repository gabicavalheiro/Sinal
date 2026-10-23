export type Page =
  | "learn"
  | "live"
  | "practice"
  | "alphabet"
  | "progress"
  | "project"
  | "settings";
export const pageNames: Record<Page, string> = {
  learn: "Praticar meu nome",
  live: "Experimentar reconhecimento",
  practice: "Prática manual A–D",
  alphabet: "Alfabeto manual",
  progress: "Seu progresso",
  project: "O projeto",
  settings: "Preferências",
};
