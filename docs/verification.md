# Verificação

## Comandos

- npm run check: limites de dependência e tipos.
- npm run format:check: formatação TypeScript, CSS e documentação.
- npm test: normalização, entradas inválidas, ordem das classes e confirmação temporal.
- npm run build: build estático.
- python -m unittest discover: contratos HTTP, domínio de prática e pipeline de treinamento.
- python -m black --check services scripts/convert_spellnet.py: formatação Python.

## Regressão da arquitetura

Tipos, formatação, build e limites de dependência aprovados. A suíte contém 9 testes de domínio TypeScript e 18 testes Python. Um import proibido foi rejeitado pela verificação de arquitetura.

O roteiro Chromium verificou navegação, diálogo, demonstração, cópia, download, persistência, prática manual, alfabeto, ADRs e preferências. Com MediaPipe e ONNX reais, a sequência A → B → ausência de mão confirmou e limpou as indicações; também foram verificados atalhos e encerramento da captura. Sem erros JavaScript ou envio de frames. Layout sem overflow horizontal em 390, 768, 1024 e 1440 px.

## Cobertura

Os testes HTTP criam a API com repositórios substituíveis. Verificam validação, resposta de sucesso, falha de persistência, identificação de experimento e separação entre liveness e readiness. Não abrem conexões com bancos.

O pipeline usa dados sintéticos para verificar normalização, divisão por participante e exportação finita de parâmetros. As métricas desses dados não representam precisão do produto.

A conversão Keras → ONNX foi comparada em duas entradas sintéticas, com argmax idêntico e erro absoluto máximo de aproximadamente 4,32 × 10⁻⁹.

O reconhecimento foi exercitado em Chromium com um stream de Canvas contendo imagens de referência A e B, MediaPipe e ONNX reais. Foram observadas a confirmação, a inclusão da letra no texto, a limpeza quando a mão sai e a liberação da câmera. As referências não são distribuídas no projeto.

## Limites

Não há avaliação independente de todas as 21 classes com novos sinalizantes. A webcam física, as condições de iluminação e as variações de mão precisam de teste no ambiente de uso.

MySQL e SQL Server têm configuração e esquemas, mas não foram iniciados como parte desta verificação. A suíte HTTP não comprova conectividade ou operação dos bancos. A prática continua com avaliação manual.

## Escrita automática e layout simplificado

Verificação com MediaPipe e ONNX reais: A → B → ausência de mão → B formou ABB automaticamente. A manutenção do sinal A por dois segundos não duplicou a letra. Pausa da escrita, inclusão manual, espaços, correção, cópia e encerramento da captura aprovados. Layout verificado em 320, 360, 390, 768, 1024 e 1440 px, sem overflow horizontal. Menu móvel e prática manual acessíveis. Nenhum erro JavaScript ou envio de frames no roteiro.

Os três novos testes cobrem composição sem duplicatas, rejeição de perdas breves de rastreamento e repetição após ausência sustentada da mão.
