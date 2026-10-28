# Sinal

Reconhecimento experimental do alfabeto manual em Libras no navegador.

O frontend usa React, TypeScript, MediaPipe e ONNX Runtime Web. O SpellNet reconhece 21 letras estáticas; uma confirmação é exibida após concordância entre previsões. A prática guiada A–D tem avaliação manual.

## Desenvolvimento

Node.js 24 LTS e npm.

```sh
npm ci
npm run dev
```

Use o endereço local do Vite. A webcam exige localhost ou HTTPS e só é solicitada ao ativar a câmera.

```sh
npm run check
npm run format:check
npm test
npm run build
npm run preview
```

check verifica as dependências entre camadas e os tipos. format aplica o padrão Prettier. Os testes de domínio cobrem normalização, ordem de classes e confirmação temporal.

## Estrutura

```text
src/
  bootstrap/       montagem dos adaptadores
  domain/          contratos, coordenadas e regras de reconhecimento
  application/     câmera, inferência, prática e tradução
  infrastructure/  webcam, MediaPipe, ONNX, armazenamento e exportação
  presentation/
    components/    controles e painéis
    pages/         telas da aplicação
    styles/        fundamentos, componentes e responsividade
services/
  practice/        FastAPI e MySQL
  training/        FastAPI, SQL Server, Pandas e NumPy
scripts/           verificação de arquitetura e conversão do modelo
docs/              arquitetura, design system, ADRs e glossário
```

main.tsx cria a aplicação com os adaptadores de bootstrap/services.ts. Os hooks recebem contratos por parâmetro. As camadas de domínio e aplicação não importam implementações de infraestrutura.

Cada serviço Python possui fábrica HTTP, casos de uso, contrato de repositório, adaptador SQL e montagem no main.py. As APIs podem ser testadas sem iniciar bancos ou configurar credenciais.

## Reconhecimento

1. MediaPipe detecta uma mão e seus 21 pontos.
2. O adaptador recorta a mão, redimensiona para 224×224 e prepara canais BGR e pixels normalizados.
3. SpellNet/ONNX retorna scores para A B C D E F G I L M N O P Q R S T U V W Y.
4. RecognitionGate exige score mínimo de 0,80, três observações concordantes e estabilidade de 650 ms.
5. A indicação é removida quando a mão sai, a candidata muda ou o score cai.

O modelo é carregado após ativar a câmera. Vídeo e recortes permanecem no dispositivo. Os arquivos do MediaPipe são baixados de cdn.jsdelivr.net e storage.googleapis.com. O modelo convertido acompanha o projeto.

H, J, K, X e Z não estão nas classes. A confirmação indica estabilidade, não precisão comprovada. O baseline próprio de 63 coordenadas é um pipeline separado e não substitui o SpellNet ao vivo.

## Serviços locais

O frontend armazena preferências e contagens no navegador. A integração HTTP com os serviços ainda não está habilitada.

Copie .env.example para .env e preencha as senhas. A senha do SQL Server precisa cumprir a política do banco; a senha de aplicação aceita 12–128 caracteres em A–Z, a–z, 0–9, \_ @ ! % -.

```sh
docker compose --env-file .env up --build
```

| Serviço     | Endereço                   | Banco                     |
| ----------- | -------------------------- | ------------------------- |
| Prática     | http://localhost:8001/docs | MySQL 8.4                 |
| Treinamento | http://localhost:8002/docs | SQL Server 2022 Developer |

O SQL Server exige arquitetura x86-64 e ao menos 2 GB de memória para o banco. O Compose cria esquemas e usuários de aplicação. Alterar .env não altera senhas de usuários já existentes nos volumes.

As APIs escutam apenas em loopback; os bancos não expõem portas no host. Autenticação, autorização, migrações e operação de produção ainda precisam ser definidos antes da exposição externa.

## Pipeline de coordenadas

Python 3.12 recomendado.

```sh
python -m venv .venv
. .venv/bin/activate
pip install -r requirements-dev.txt
PYTHONPATH=services/training python -m app dataset.csv --output baseline.json
PYTHONPATH=services/practice python -m unittest discover -s services/practice/tests -v
PYTHONPATH=services/training python -m unittest discover -s services/training/tests -v
python -m black --check services scripts/convert_spellnet.py
```

No PowerShell, ative .venv\Scripts\Activate.ps1 e defina $env:PYTHONPATH para o serviço antes do comando Python.

O CSV contém letter, participant_id e x0,y0,z0 até x20,y20,z20. O baseline aceita A–D, ao menos duas classes e três participantes pseudônimos; treino e teste precisam cobrir as mesmas classes, com pelo menos dez amostras de treino por letra. Não há dataset incluído.

Pandas valida a tabela. NumPy centraliza as mãos pelo punho, ajusta a escala e calcula centroides. O teste separa participantes inteiros. O JSON exportado contém métricas, SHA-256 do CSV e validatedForProduction=false.

## Documentação e origem

- [Arquitetura](docs/architecture.md)
- [Design system](docs/design-system.md)
- [Decisões arquiteturais](docs/adr/007-dependency-boundaries.md)
- [Verificação](docs/verification.md)
- [Glossário](docs/glossary.md)

SpellNet: [RAIA / SignLink](https://huggingface.co/RAIA-BRASIL/spellnet_libras). A origem, os hashes e os limites estão em public/models/spellnet/manifest.json e no ADR 006. A versão consultada não apresenta licença explícita do modelo; o aviso de origem registra essa ausência. As licenças do ONNX Runtime e das fontes acompanham os arquivos.

As referências A–D são esquemáticas e exigem revisão linguística. O projeto não traduz frases nem substitui ensino de Libras.

## Praticar um nome

A página inicial oferece prática de um nome ou palavra, uma letra por vez. O domínio namePractice valida a entrada, identifica as 21 classes suportadas e distingue letras reconhecidas, deixadas para revisão e sem avaliação. O nome fica em memória. Apenas a lista de revisão e a quantidade de sequências concluídas são gravadas no armazenamento local.

As referências fotográficas de A–Z e Ç vêm de material do IF Baiano; a fonte está em public/references/SOURCE.txt. Cada etapa pede nova confirmação da câmera, inclusive em letras repetidas. Falhas de rastreamento não são classificadas como erro do usuário. O reconhecimento livre permanece no menu secundário.
