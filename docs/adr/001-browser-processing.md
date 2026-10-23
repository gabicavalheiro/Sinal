# ADR 001 — Processamento da mão no navegador

**Estado:** aceito.

## Contexto

A câmera captura dados sensíveis. O objetivo é reconhecer letras com baixo custo, latência curta e sem backend no caminho da inferência.

## Decisão

Captura, MediaPipe, normalização e futura classificação permanecem no navegador. Detector carregado sob demanda, com download de WASM/modelo. Não há endpoint de upload de imagem.

## Consequências

Menos tráfego e imagens preservadas no dispositivo. Exige HTTPS/localhost e hardware compatível. Detector pode não carregar sem rede. O serviço Python treina e exporta artefatos; não recebe frames. O classificador de letras ainda precisa ser treinado, validado e implementado via ClassifierPort.
