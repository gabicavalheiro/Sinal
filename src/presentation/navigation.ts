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
export const pageDescriptions: Record<Page, string> = {
  learn: "Digite seu nome e pratique cada letra com a câmera, uma de cada vez.",
  live: "Teste o modelo em tempo real: qualquer letra, sem roteiro definido.",
  practice: "Treine uma letra isolada do alfabeto, no seu próprio ritmo.",
  alphabet: "Consulte a referência completa das 26 letras do alfabeto manual.",
  progress: "Veja quais letras você já confirmou e o que falta revisar.",
  project: "Entenda o modelo, o pipeline de dados e as decisões de arquitetura.",
  settings: "Ajuste câmera, espelhamento e exibição dos pontos da mão.",
};
export const navGroups: { label: string; pages: Page[] }[] = [
  { label: "COMECE AQUI", pages: ["learn"] },
  { label: "TESTAR O MODELO", pages: ["live", "practice"] },
  { label: "APRENDER", pages: ["alphabet", "progress"] },
  { label: "SOBRE O PROJETO", pages: ["project", "settings"] },
];
