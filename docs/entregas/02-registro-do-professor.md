# Entrega 2 — Registro do professor, protocolo e avisos

Construída fora do Lovable (workspace sem créditos), com autorização do responsável.
Código: branch `claude/gracious-curie-tkpd1g` de `brunolmonteiro1/vosz-warmth-and-guidance`, commit `32f8756`.

## Banco de dados

Aplicado direto no banco em 20/11/2026, pelo caminho que a documentação do Lovable prevê ("run the SQL yourself"), e guardado em `docs/sql/` do app. Não é migração do Lovable.

- 8 tabelas: `ocorrencia`, `ocorrencia_bem_estar_professor`, `ocorrencia_complemento`, `tarefa`, `evento_notificacao`, `destinatario_aviso`, `configuracao_aviso`, `protocolo_contador`.
- 5 políticas de leitura; nenhuma escrita direta. Toda escrita passa por funções que conferem o papel no servidor.
- 11 funções novas (`registrar_ocorrencia`, `acrescentar_complemento`, `processar_avisos`, `estado_fila_avisos`, `listar_destinatarios_aviso`, `salvar_destinatario_aviso`, `salvar_modo_teste_aviso`, `ocorrencias_demonstracao`, `autores_ocorrencias`, `criar_avisos`, `hoje_sp`) e 2 alteradas (`acesso_rota`, `apagar_demonstracao`).

### Teste do banco (transação desfeita antes de aplicar)

| Caso | Resultado |
|---|---|
| Protocolo e repetição com a mesma chave | `OC-2026-000001`; repetir devolve o mesmo, sem duplicar |
| Educador registra para criança de outra turma | negado |
| Data do fato futura | negada com mensagem |
| Educador B lê registro do A sobre a mesma criança | 0 registros, 0 bem-estar, 0 complementos; não complementa; não reaproveita a chave alheia |
| Coordenação e admin técnico | não leem ocorrências, bem-estar, tarefas nem avisos; não registram |
| Serviço Social | lê registro, bem-estar e complemento; tarefas certas (triagem, avaliação para SS e Direção, urgência para SS e Direção) |
| Texto do e-mail | não cita o nome da criança |
| Autor que também é da Direção | não recebe aviso de si mesmo |
| Modo de teste de falha | e-mails falham, abre tarefa de falha, triagem segue aberta; nova tentativa sem o modo de teste entrega e encerra a tarefa de falha |
| Anônimo | leitura e registro negados |
| Rotas | Direção abre Ocorrências e não abre Registrar; educador abre Registrar e não abre Ocorrências |

## Telas

- **Minha turma:** botão "Registrar ocorrência ou pedir apoio" em cada criança.
- **Registrar:** 8 etapas no celular, uma pergunta por vez, opcionais recolhidas, rascunho guardado só na aba aberta (some ao fechar, para não deixar relato no aparelho). Envio com chave única: tentar de novo após falha não duplica.
- **Confirmação:** protocolo, o que acontece agora conforme o apoio pedido e, se urgente, orientação de procurar o plantão com o selo "Fluxo de urgência: pendente de envio pelo Instituto".
- **Meus registros:** lista com protocolo e situação; "Acrescentar informação" como complemento datado.
- **Ocorrências** (Serviço Social e Direção): urgentes primeiro, filtros por período, turma, apoio e urgência; detalhe com quem enviou e o bem-estar do professor em bloco restrito.
- **Hoje:** urgências abertas, aguardando triagem, pedidos de orientação e falhas de aviso; para o professor, registros aguardando retorno; para o admin, estado da fila.
- **Configurações:** quem recebe avisos, suplentes, fila de e-mail simulada e modo de teste de falha. A demonstração cria três registros fictícios e uma falha de aviso.

## Verificação do código

Tipos sem erros, lint sem erros (15 avisos inofensivos de sempre), formatação ok, build ok, 33 de 33 testes (13 novos: regras de cada etapa, rotas, ajuda das telas novas e o fluxo completo do formulário, inclusive falha e nova tentativa).

## Correção encontrada no caminho

Turmas criadas pela tela de Turmas eram gravadas como "demonstração" e seriam apagadas junto com os dados fictícios. Corrigido.

## Não verificado

- As telas com dados reais do banco, depois do login: não há acesso de administrador criado, e não criei um para não ocupar o do responsável. A lógica foi testada no banco e o formulário em teste de componente.
- Revisão visual no celular das telas novas.

## Pendências

- Juntar a branch ao `main` para aparecer no Lovable (aguarda aval).
- Quando houver créditos: pedir ao Lovable para regenerar os tipos do banco.
- Fluxo de urgência e plantão continuam pendentes de envio pelo Instituto.
