# ADR 008 — Prática personalizada como fluxo principal

Estado: aceito.

## Contexto

Reconhecer letras e montar texto demonstra visão computacional, mas não apresenta uma vantagem clara sobre digitar. A tela anterior misturava tradução, aprendizado, demonstração e documentação, sem orientar a primeira ação.

## Decisão

A página inicial oferece uma prática do nome ou de uma palavra escolhida, com até 40 caracteres. Uma letra por vez, com referência visual, câmera opcional e avanço explícito. O nome fica em memória e não é enviado nem persistido.

O domínio cria a sequência, identifica cobertura e resume resultados. O hook de aplicação administra etapas e persistência de uma lista de revisão e quantidade de sequências concluídas. A apresentação não decide cobertura ou pontuação.

A previsão já estabilizada por RecognitionGate só confirma a letra-alvo. Cada etapa exige uma previsão nova, precedida de um estado sem confirmação; isso impede que uma letra repetida seja aprovada pelo sinal da etapa anterior. O avanço é explícito para dar tempo de observar a referência.

Letras sem cobertura não são avaliadas nem contadas como reconhecidas. A câmera é desligada ao entrar nessa etapa. As referências de A–Z e Ç vêm do material do IF Baiano, Campus Senhor do Bonfim, com origem preservada em public/references/SOURCE.txt. Não há alegação de validação do aplicativo pela instituição.

Letras deixadas para depois entram na revisão. Falta de detecção e baixa confiança não são registradas como erro do sinalizante. O resumo separa reconhecidas, revisão e ausência de suporte. Nenhum resultado representa avaliação de fluência ou precisão linguística.

A navegação principal contém Praticar e Alfabeto. Reconhecimento livre, histórico, preferências e documentação ficam em um menu secundário. A câmera não inicia na entrada nem ao digitar o nome; depende de ação explícita e é liberada ao sair ou terminar.

## Consequências

Objetivo de uso concreto e uma ação principal por etapa. O reconhecimento continua experimental e depende das condições da câmera. Não substitui aulas, avaliação linguística nem intérpretes. A prática manual anterior permanece no código como recurso legado; seus registros são separados do novo histórico de sequências.
