# Entregas 5 e 7 — Entrevista com IVAV e EBIA; importação do Bússola

Data: 20/11/2026. Código: `brunolmonteiro1/vosz-warmth-and-guidance`, no `main` (commit `04ec3ca`, que já inclui os commits do Lovable com o perfil Master).

## Banco (aplicado no banco real)

| SQL | Conteúdo |
|---|---|
| `docs/sql/2026-11-20_entrega5_entrevista_ivav.sql` | Política IVAV versionada (minuta "simulada"), EBIA, acolhida, tarefa de urgência alimentar, candidatura por criança, dado cadastral com origem e situação, fila de entrevistas |
| `docs/sql/2026-11-20_entrega7_importacao_bussola.sql` | Lote, registro do lote, fila privada de pendências, marcadores, catálogo de campos permitidos, aviso de privacidade e ciência, regras de retenção, importar, reverter |
| `docs/sql/2026-11-20_entrega5b_demonstracao.sql` | Contas de demonstração só criam e veem dados de demonstração; contas operacionais só os reais |

## Testes

| Teste | Onde | Resultado |
|---|---|---|
| SQL da entrega 4 (permissões, recusas, Bússola) | Banco real, transação desfeita | **Aprovado** |
| SQL da entrega 5 (EBIA, limites, renda, mãe solo, versões, permissões) | Cópia local do banco | **Aprovado** |
| SQL da entrega 7 (prévia, reimportação, revisão preservada, órfãos, saúde fora, reversão, retenção) | Cópia local do banco | **Aprovado** |
| Navegador, conta fictícia do Serviço Social | App local ligado ao banco real | **Aprovado** (abaixo) |
| Código | tipos, lint, 49 testes, build | **Aprovado** |

### Percursos no navegador (dados fictícios)

| Percurso | Resultado |
|---|---|
| Família nova: cadastro sem matrícula nem ID do Bússola, duas crianças com turnos diferentes | Código local `VZ-…`; dois pedidos "Nova candidatura" (vespertino e matutino) |
| Entrevista incompleta salva e retomada pela fila "Entrevistas em andamento" | Retomou com o dado salvo |
| Urgência alimentar com entrevista incompleta | Tarefa aberta; família marcada "Ação imediata" na fila |
| Família já atendida (importação fictícia): conferir dado, entrevista anual completa | IVAV 40, moderada; EBIA leve (2/14) |
| Renovação de uma criança e primeira candidatura de um irmão com a mesma entrevista | Os dois pedidos "Pronta para classificação", acompanhados separadamente |
| Irmão candidato fora da lista de alunos | Não aparece em "Minha turma"; nenhuma matrícula criada |
| Importação fictícia: prévia, aplicação, reimportação | Prévia sem gravar; reimportação com 0 criações (tudo "já existente") |
| Correção da Bruna depois de reimportar | Preservada; o valor novo da origem fica ao lado para conferência |
| Professor | Sem acesso a /importacao e /triagem |
| Demonstração fora das listas operacionais | Conta operacional vê 72 famílias, 0 fictícias |

Correções feitas durante o teste: iniciar a entrevista agora cria o rascunho no servidor e traz os moradores sugeridos pelo cadastro; o formulário de pedido volta ao estado inicial depois de salvar.

## Lote real (lote `8e0de89e`, aplicado em 20/11/2026)

Feito pela tela de Importação com uma conta operacional temporária do Serviço Social (`servico-social@vosz-acompanha.test`, criada para isto; desativar ou substituir pela conta da Bruna). Os arquivos foram lidos no navegador; só as colunas permitidas foram enviadas.

| Entidade | Lidas | Criadas | Atualizadas | Já existentes | Pendentes |
|---|---:|---:|---:|---:|---:|
| Famílias | 72 | 72 | 0 | 0 | 1 (sem membro marcado como responsável familiar) |
| Pessoas (membros) | 227 | 227 | 0 | 0 | 27 sem nascimento na origem |
| Vínculos familiares | 227 | 227 | 0 | 0 | 48 sem parentesco na origem |
| Atendidos | 116 | — | — | — | 116 de 116 conciliados com membros (ID e matrícula familiar conferidos) |
| Responsáveis familiares | — | 71 ligados | — | — | 1 família sem responsável |
| Marcadores (indícios, não matrícula) | — | 200 | — | — | conferir com a coordenação |
| Dados cadastrais por campo | — | 6.417 | 0 | 312 (iguais nas duas planilhas) | 38 divergentes entre Membros e Atendidos |

Conferido no banco: 72 famílias e 227 pessoas, sem identificador repetido; 0 pedidos de vaga, 0 matrículas, 0 campos de saúde gravados. A importação não concede bolsa nem ocupa vaga.

Colunas fora do lote: 8 de saúde (aguardam matriz de acesso) e 3 de texto livre (observações). Abas Organizações e Atividade: sem registros na origem.

Conferência com o perfil do Serviço Social: fila com 72 famílias, todas de origem Bússola; família abre com membros, dados a conferir e botão "Iniciar entrevista". Não iniciei entrevista em família real para não deixar um rascunho artificial.

## Pendências reais

- Aviso de privacidade (aprovado): transcrever texto, versão, vigência, canal e forma de ciência.
- Retenção (aprovada): transcrever prazo, evento inicial, ação e responsável das 8 categorias.
- Fila privada: 1 família sem responsável; 38 dados divergentes para a Bruna conferir.
- Matriz de acesso de saúde; campos e níveis do Bússola.
- Pesos do IVAV além da EBIA continuam como minuta "simulada".
- Conta operacional temporária a desativar ou substituir.
- O perfil Master (criado no Lovable) herda as permissões de todos os papéis e as rotas, mas não lê contato ou contribuição restritos de outra pessoa: confirmar se é o desejado.
