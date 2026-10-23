# ADR 006 — Reconhecimento ao vivo com SpellNet no navegador

**Estado:** aceito. Complementa os ADRs 001 e 004.

## Contexto

O reconhecimento ao vivo usa o modelo RAIA-BRASIL/spellnet_libras. A entrada é uma imagem da mão, incompatível com o contrato de classificação baseado em 63 coordenadas.

## Decisão

Adicionar FrameClassifierPort e um adaptador ONNX Runtime Web. Converter o Keras 3.8.0 original para ONNX opset 17, com equivalência numérica verificada em entradas sintéticas. A inferência continua inteiramente no navegador. Nenhuma imagem é enviada aos serviços Python.

A ordem das 21 classes vem de app/video_processing.py do SpellNet: A B C D E F G I L M N O P Q R S T U V W Y. O recorte usa 100 pixels de margem, resize 224×224, conexões verdes e pontos vermelhos, canais BGR e normalização pixel/127.5−1, seguindo o pré-processamento publicado. O redimensionamento Canvas e o detector Tasks Vision podem produzir diferenças em relação ao OpenCV/MediaPipe Python originais.

Somente realizar inferência com uma mão detectada. Exigir score softmax ≥ 0,80, ao menos três observações concordantes e estabilidade por 650 ms antes de mostrar “Letra X confirmada”. Limpar a indicação ao perder a mão, mudar a classe ou cair abaixo do limiar. A confirmação é temporal; não garante correção linguística e não é uma medição de precisão.

A letra estável entra automaticamente no texto. A mesma letra só entra novamente após ausência da mão por pelo menos 800 ms; uma previsão instável não libera repetição. A escrita pode ser pausada para inserção manual. Espaço separa palavras. A prática guiada continua manual; não muda suas contagens para avaliação automática.

## Consequências

Download inicial maior: modelo ONNX de aproximadamente 17 MB e runtime WASM de aproximadamente 12 MB, carregados ao ativar a câmera. Inference serializada para não acumular frames. Sem suporte a H, J, K, X e Z. O modelo não foi revalidado com participantes independentes no Sinal. O classificador próprio de coordenadas e o pipeline Pandas/NumPy permanecem separados.

Autoria: RAIA / SignLink. Fontes:

- https://huggingface.co/RAIA-BRASIL/spellnet_libras
- https://github.com/gruporaia/SpellNet/blob/main/app/video_processing.py
- https://github.com/gruporaia/SpellNet/blob/main/app/preprocessing/signlink_preprocessing.py

A origem não apresenta licença explícita do modelo na versão consultada; registrar essa ausência e não atribuir uma licença inventada. O ONNX Runtime inclui a licença MIT separada. Origem, checksums e erro de conversão ficam em public/models/spellnet/manifest.json.

## Reprodução da conversão

Ambiente Python 3.12 com tensorflow-cpu==2.19.1, keras==3.8.0, tf2onnx==1.17.0 e onnxruntime==1.23.2. O script scripts/convert_spellnet.py recebe o arquivo .keras original e o diretório de saída. A versão do Keras deve ser mantida: versões recentes mudam o tratamento da saída do submodelo MobileNet.

O script usa safe_mode=True e compile=False, compara saídas Keras e ONNX, exige tolerância absoluta 1e-5 e igualdade do argmax, e exporta o manifesto com SHA-256. Esses testes verificam a conversão, não a qualidade do reconhecimento de Libras.
