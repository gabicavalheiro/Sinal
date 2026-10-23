# ADR 004 — Pandas, NumPy e baseline de coordenadas

**Estado:** aceito.

## Contexto

O detector já devolve coordenadas. Treinar sobre imagens aumentaria custo sem atender ao diferencial proposto. Precisamos de um pipeline inicial reproduzível e fácil de inspecionar.

## Decisão

Pandas valida schema e dados tabulares. NumPy aplica wrist-max-radius-v1, calcula centroides por classe e distância euclidiana para um baseline. Separação de treino e teste por participante; mesma cobertura de classes nos dois conjuntos. Experimentos podem ser registrados em SQL Server e exportados como JSON.

## Consequências

Pipeline leve e transparente. O baseline ignora movimentos temporais, não tem confiança calibrada e não é modelo de produção. Letras iniciais limitadas a A–D. É obrigatório medir generalização com dados consentidos, revisar o dataset e validar com a comunidade antes de conectar o baseline ao vídeo.
