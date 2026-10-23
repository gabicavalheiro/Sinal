# Glossário

| Termo                    | Significado no Sinal                                                        |
| ------------------------ | --------------------------------------------------------------------------- |
| Libras                   | Língua Brasileira de Sinais, com gramática e cultura próprias.              |
| Datilologia              | Soletração por meio do alfabeto manual; recorte deste projeto.              |
| Landmark                 | Ponto estimado da mão; 21 pontos com coordenadas x, y e z.                  |
| MediaPipe                | Detector pré-treinado de pontos; não é o classificador de letras.           |
| Normalização             | Centralizar no punho e dividir por uma escala da mão.                       |
| Feature                  | Valor numérico de entrada; aqui são 63 coordenadas normalizadas.            |
| Dataset                  | Exemplos rotulados com letra e identificador pseudônimo de participante.    |
| Holdout por participante | Divisão que impede que a mesma pessoa esteja em treino e teste.             |
| Baseline                 | Modelo inicial simples usado para comparação, sem garantia de qualidade.    |
| Centroide                | Média dos vetores de uma classe usada pelo baseline de distância.           |
| Inferência               | Aplicar um modelo a coordenadas novas.                                      |
| Abstenção                | Não emitir uma letra quando a evidência é insuficiente.                     |
| Pandas                   | Biblioteca Python usada para carregar e validar o CSV tabular.              |
| NumPy                    | Biblioteca Python usada para normalização vetorial, centroides e métricas.  |
| MySQL                    | Banco do serviço de prática; catálogo e sessões.                            |
| SQL Server               | Banco do serviço de treinamento; datasets e experimentos.                   |
| Porta                    | Contrato de domínio implementado por um adaptador.                          |
| Microserviço             | Unidade com responsabilidade, execução e dados próprios.                    |
| ADR                      | Architecture Decision Record; registro de uma decisão e suas consequências. |
| Design system            | Fundamentos visuais e componentes com comportamento consistente.            |
