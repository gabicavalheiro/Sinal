# Comece por aqui — Sinal

Esta entrega corresponde ao código publicado com reconhecimento experimental de letras em Libras.
Versão de referência: 47a6380e488536b42beb15757301cc95fa7f18f3.

## Ler a explicação completa
Abra documentacao/Sinal-documentacao-completa.docx.
O Word tem 12 páginas e explica funcionamento, funções, escolhas, arquitetura, bancos,
treinamento, instalação, testes e limites da versão atual.

## Desenvolver o frontend
Requer Node.js 24 LTS e npm. Dentro desta pasta:

    npm ci
    npm run dev

Abra o endereço Local mostrado no terminal.
Para conferir e compilar:

    npm run check
    npm run format:check
    npm test
    npm run build
    npm run preview

## Apenas abrir o front já compilado
Com Python instalado:

    python -m http.server 4173 --directory dist

Abra http://localhost:4173.
Não abra dist/index.html diretamente como arquivo: a câmera e os módulos precisam de servidor.
O modelo SpellNet já está incluído. O detector MediaPipe precisa de rede no primeiro uso.

## O que está funcionando
- Webcam, landmarks e reconhecimento experimental de 21 letras estáticas.
- “Letra X confirmada” após estabilidade; limpeza ao perder a mão.
- Adição da letra ao texto por clique/Enter; copiar, editar e baixar.
- Demonstração e prática guiada A–D. A avaliação da prática continua manual.
- Preferências e contagens guardadas no próprio navegador.

## Serviços opcionais
MySQL, SQL Server, FastAPI, Pandas e NumPy têm código e configuração em services/ e compose.yaml.
Eles não são necessários para reconhecer letras e o front não os chama nesta etapa.
Copie .env.example para .env, preencha as senhas e siga README.md e o Word antes de executar:

    docker compose --env-file .env up --build

Os bancos não vêm executando nem preenchidos com dados reais. A configuração é para desenvolvimento local.
Não há dataset de treino incluído. O modelo SpellNet pré-treinado está incluído em formato ONNX.

## Organização do pacote
- src/: código do frontend e regras.
- public/: modelo ONNX, manifesto de origem, fontes, avisos e licenças.
- dist/: frontend compilado, com runtime WASM e cópia do modelo para servir.
- services/: APIs Python, repositórios, esquemas SQL, Dockerfiles e testes.
- scripts/: conversão do modelo Keras original para ONNX.
- docs/: arquitetura, ADRs, glossário, design system e evidências de verificação.
- contracts/: contratos HTTP e CSV.
- documentacao/: Word completo e seu gerador.
- MANIFESTO-SHA256.txt: hashes dos arquivos da entrega.

node_modules, .venv, caches e histórico .git não são distribuídos.
As dependências são recuperadas por npm ci e pelos arquivos requirements.
Nenhuma senha real ou credencial de publicação foi incluída.

## Regerar o Word, se quiser editar a explicação
Instale python-docx num ambiente Python e execute:

    python -m pip install python-docx
    python documentacao/gerar_documentacao.py

## Limites do reconhecimento
Modelo RAIA / SignLink SpellNet: 21 classes, sem H, J, K, X e Z.
A confirmação é temporal, não uma garantia de correção linguística.
A referência usa imagens; o pipeline próprio de coordenadas/Pandas/NumPy é separado.
A licença do modelo não estava explícita na origem consultada; veja NOTICE.txt e ADR 006.


## Organização da arquitetura
Os adaptadores são montados em src/bootstrap e injetados em main.tsx.
Os fluxos da aplicação dependem de contratos. Páginas, painéis e estilos têm arquivos próprios.
Cada API Python usa fábrica HTTP, casos de uso e repositórios substituíveis.
Veja docs/adr/007-dependency-boundaries.md.
