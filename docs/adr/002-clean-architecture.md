# ADR 002 — Camadas e portas explícitas

**Estado:** aceito.

## Contexto

React, webcam, MediaPipe e modelo evoluem em ritmos diferentes. O domínio não deve depender de bibliotecas visuais ou de visão computacional.

## Decisão

Separar domain, application, infrastructure e presentation. Portas CameraPort, HandDetectorPort e ClassifierPort definem os contratos. Tipos de landmarks e normalização são funções puras. A aplicação compõe os adaptadores atuais.

## Consequências

Normalização pode ser testada sem câmera. Substituição do detector não altera a interface. A composição explícita pode ser extraída para injeção na próxima etapa; não é necessário um contêiner de dependências.
