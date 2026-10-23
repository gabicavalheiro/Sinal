# ADR 003 — MySQL e SQL Server por serviço

**Estado:** aceito por requisito de stack.

## Contexto

MySQL e SQL Server fazem parte dos requisitos. Usar ambos para a mesma entidade criaria sincronização e complexidade sem benefício.

## Decisão

O serviço de prática é dono do catálogo e sessões em MySQL. O serviço de treinamento é dono de metadados de datasets, parâmetros baseline e métricas em SQL Server. Serviços não consultam o banco do outro. Integração futura por HTTP /v1.

## Consequências

Containers e dados independentes. SQL Server adiciona custo de memória, imagem x86-64 e operação. Compose usa Developer para desenvolvimento e usuários da aplicação separados do administrador. Não há sincronização entre bancos. A hospedagem estática não inclui esses bancos; a infraestrutura atual é local e ainda não foi validada contra servidores reais.
