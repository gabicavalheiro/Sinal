# ADR 007 — Composição explícita e limites de responsabilidade

**Estado:** aceito.

## Contexto

O componente principal reunia layout, captura, reconhecimento, texto, prática e documentação. Os hooks importavam implementações de infraestrutura e as rotas Python criavam conexões globais, dificultando testes isolados e substituição de adaptadores.

## Decisão

Separar páginas e componentes de apresentação. Extrair os estados de prática e tradução para hooks próprios. Montar AppServices em bootstrap/services.ts e injetá-lo a partir de main.tsx.

Definir StoragePort e TextPort junto às portas de captura e reconhecimento. Impedir imports de infraestrutura nas camadas de domínio, aplicação e apresentação por uma verificação executada em npm run check.

Dividir os serviços Python em fábrica HTTP, casos de uso, protocolos de repositório, adaptadores SQL e configuração. As APIs recebem os casos de uso prontos; somente main.py cria banco e repositório. Falhas dos drivers são traduzidas para uma exceção de aplicação.

Manter arquivos CSS por responsabilidade, respeitando a ordem da cascata existente.

## Consequências

Componentes menores e contratos explícitos. Testes HTTP não exigem variáveis de conexão, drivers ou bancos ativos. A substituição do detector e do classificador não altera os hooks.

A aplicação usa hooks React; a camada de domínio permanece independente de frameworks. Os dois serviços continuam independentes, sem um pacote compartilhado de infraestrutura que acople seus ciclos de implantação.

Prettier e Black padronizam a formatação. Os limites são verificados automaticamente; mudanças de estrutura devem manter essa regra e a suíte de regressão.
