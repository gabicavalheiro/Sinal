import type { Letter } from "../domain/landmarks";
import { PRACTICE_LETTERS } from "../domain/preferences";

export const letters = PRACTICE_LETTERS;
export const letterGuides: Record<
  Letter,
  { title: string; description: string; tip: string }
> = {
  A: {
    title: "Um bom começo.",
    description:
      "Feche a mão e mantenha o polegar ao lado dos dedos, apontando para cima.",
    tip: "Deixe a palma voltada para a frente e o polegar visível.",
  },
  B: {
    title: "Abra as possibilidades.",
    description: "Estenda os quatro dedos juntos e dobre o polegar sobre a palma da mão.",
    tip: "Mantenha os dedos unidos, sem tensionar a mão.",
  },
  C: {
    title: "Dê forma ao gesto.",
    description: "Curve os dedos e o polegar para formar a letra C com a mão.",
    tip: "Deixe um espaço entre o polegar e os outros dedos.",
  },
  D: {
    title: "Um gesto de cada vez.",
    description:
      "Aponte o indicador para cima. Una o polegar aos outros dedos, formando um círculo.",
    tip: "O indicador fica estendido; os demais dedos ficam curvados.",
  },
};

export const adrs = [
  {
    id: "007",
    title: "Composição explícita e componentes por responsabilidade",
    status: "Aceito",
    body: "Adaptadores montados em bootstrap e injetados nos hooks. Páginas, painéis e estilos separados. Serviços Python com fábricas HTTP, casos de uso e contratos de repositório; testes sem conexão a bancos. A verificação de arquitetura impede imports de infraestrutura nas regras e nos fluxos da aplicação.",
  },
  {
    id: "006",
    title: "Reconhecimento ao vivo com SpellNet",
    status: "Aceito",
    body: "Modelo RAIA / SignLink convertido de Keras para ONNX, com 21 letras estáticas e inferência local por imagem. A letra aparece após pelo menos três previsões concordantes por 650 ms e score acima do limiar. A indicação é apagada quando a mão sai ou a previsão muda. Confirmação indica estabilidade, sem garantia de correção. Não cobre H, J, K, X e Z. A licença do modelo não foi explicitada na origem consultada.",
  },
  {
    id: "001",
    title: "Processamento no navegador",
    status: "Aceito",
    body: "A webcam, o MediaPipe e o reconhecimento experimental SpellNet rodam no dispositivo. Nenhuma imagem é enviada aos serviços. O modelo e o detector são carregados ao ativar a câmera. O classificador próprio de coordenadas continua como evolução separada.",
  },
  {
    id: "002",
    title: "Arquitetura limpa e contratos",
    status: "Aceito",
    body: "Domínio independente de React e MediaPipe. Casos de uso na camada de aplicação; câmera, detector e APIs em adaptadores de infraestrutura. Portas CameraPort, HandDetectorPort e ClassifierPort permitem substituir implementações sem alterar a interface.",
  },
  {
    id: "003",
    title: "MySQL e SQL Server com responsabilidades próprias",
    status: "Aceito",
    body: "O serviço de prática possui o MySQL: catálogo de letras e sessões. O serviço de treinamento possui o SQL Server: versões de datasets e experimentos. Não há acesso direto entre bancos, nem consultas do navegador aos bancos. A integração usa HTTP com contratos versionados.",
  },
  {
    id: "004",
    title: "Pandas e NumPy no serviço de treinamento",
    status: "Aceito",
    body: "Pandas valida e organiza o CSV de coordenadas. NumPy centraliza a mão pelo punho e normaliza a escala. O pipeline gera um baseline de centroides em JSON para experimentação. A qualidade deve ser medida com participantes separados entre treino e teste antes de conectar à tradução.",
  },
  {
    id: "005",
    title: "Design system e acessibilidade",
    status: "Aceito",
    body: "Tokens de cor, espaço, tipografia e raio organizados por responsabilidade em CSS. Componentes Button, Tag e Toggle compartilhados. Foco visível, texto junto aos estados, alvos de toque e respeito a movimento reduzido. A demonstração e a prática manual são explicitamente identificadas.",
  },
];

export const glossary = [
  [
    "Libras",
    "Língua Brasileira de Sinais. É uma língua com gramática própria; o alfabeto manual é apenas uma parte dela.",
  ],
  [
    "Datilologia",
    "Soletração com o alfabeto manual, usada para representar letras. Este é o recorte do Sinal.",
  ],
  [
    "Landmark",
    "Um ponto estimado da mão. O MediaPipe retorna 21 pontos com coordenadas x, y e z.",
  ],
  [
    "Normalização",
    "Usar o punho como origem e ajustar as coordenadas pelo tamanho da mão, preservando sua orientação.",
  ],
  [
    "Inferência",
    "Aplicar um modelo treinado a uma nova amostra para obter uma previsão.",
  ],
  [
    "Dataset",
    "Conjunto de exemplos rotulados. Aqui, contém coordenadas, letra e identificador pseudônimo do participante.",
  ],
  [
    "ADR",
    "Registro de decisão arquitetural: contexto, escolha, consequências e estado da decisão.",
  ],
  [
    "Microserviço",
    "Serviço com responsabilidade e dados próprios, integrado aos demais por contratos explícitos.",
  ],
  ["MySQL", "Banco relacional destinado ao catálogo e às sessões de prática."],
  ["SQL Server", "Banco relacional destinado às versões de datasets e aos experimentos."],
  [
    "Pandas",
    "Biblioteca Python para leitura, organização e validação dos dados tabulares do treinamento.",
  ],
  [
    "NumPy",
    "Biblioteca Python para operações vetoriais, normalização e cálculo dos parâmetros do modelo.",
  ],
];
