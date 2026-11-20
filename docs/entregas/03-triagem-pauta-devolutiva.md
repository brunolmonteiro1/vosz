# Entrega 3 — Triagem, pauta de quinta e orientação ao professor

Construída fora do Lovable (workspace sem créditos), com autorização do responsável, que pediu para seguir no automático.
Código: `brunolmonteiro1/vosz-warmth-and-guidance`, commits `f1e42e3` (SQL) e `0a7298b` (telas), já no `main`.

## Banco de dados

SQL aplicado direto no banco em 20/11/2026 e guardado em `docs/sql/2026-11-20_entrega3_triagem_pauta_devolutiva.sql`.

- Tabelas novas: `caso`, `caso_ocorrencia`, `triagem`, `pedido_informacao`, `reuniao`, `item_pauta`, `decisao_caso`, `acao_caso`, `contribuicao_profissional`, `devolutiva`.
- Toda escrita passa por funções que conferem o papel: `triar_ocorrencia`, `responder_pedido`, `montar_pauta`, `incluir_na_pauta`, `marcar_item_pauta`, `salvar_ata`, `registrar_decisao`, `concluir_acao`, `registrar_contribuicao`, `encerrar_caso`, `publicar_devolutiva`, `responder_devolutiva`.
- A pauta da próxima quinta se monta sozinha com: casos novos da triagem (urgentes sempre), casos adiados ou não discutidos na reunião anterior, casos com ação vencida e casos em que o professor informou resultado.

### Teste do banco (`supabase/tests/entrega3_fluxo.sql`, transação desfeita)

| Caso | Resultado |
|---|---|
| Educador tenta triar | negado |
| Triar duas vezes o mesmo registro | negado |
| Novo caso, vínculo a caso aberto, registrar sem acompanhamento | ok |
| Pedido de informação → resposta do professor | resposta vira complemento datado; registro volta a aguardar triagem |
| Decisão com ações, responsável e prazo | ok |
| Caso adiado | reaparece na quinta seguinte |
| Contribuição restrita | Direção e outro membro do Serviço Social não leem |
| Orientação | só o professor destinatário lê; ele não lê decisões nem contribuições |
| Resultado com pedido de nova conversa | caso volta à pauta e abre tarefa de retorno |
| Coordenação e anônimo | negados |

## Telas

- **Ocorrências → triagem** (Serviço Social): quatro destinos, responsável, levar à pauta, nota. A Direção vê o aviso "A triagem deste registro é feita pelo Serviço Social".
- **Meus registros:** perguntas da equipe e campo para responder.
- **Pauta de quinta** (Serviço Social e Direção): por caso, os quatro quadros — último combinado, o que foi feito, resultado, o que segue aberto; registrar decisão e ações; publicar orientação (só o Serviço Social); contribuição para a equipe ou restrita; marcar como discutido; adiar; encerrar; histórico; ata. Aba "Casos em acompanhamento".
- **Orientações** (professor): o que fazer, o que observar, andamento em quatro passos, "Marcar como lida", "Já apliquei", "Contar como foi" com pedido de nova conversa.
- **Hoje:** casos na próxima pauta, ações vencidas, orientações sem ciência; para o professor, orientações a aplicar.
- Ajuda com origem no blueprint para cada tela e quadro novo. O "?" dos campos passou a ficar alinhado ao rótulo em todos os formulários.

## Teste de ponta a ponta (20/11/2026, local, contas de demonstração)

| Passo | Resultado |
|---|---|
| Serviço Social abre caso pelo registro urgente OC-000001 | caso aberto, entra na pauta |
| Serviço Social pede informação sobre OC-000003 | Educador B vê a pergunta no celular e responde |
| Serviço Social abre caso para OC-000003 e vincula OC-000004 ao caso da mesma criança | ok |
| Pauta | 2 casos; decisão com ação, orientação e contribuição restrita registradas; 1 discutido; o outro adiado sai da pauta desta quinta |
| Direção na pauta | vê os 2 casos; não tem o botão de publicar orientação; não vê a contribuição restrita |
| Educador A | Hoje mostra 1 orientação a aplicar; não vê a decisão interna; marca lida, aplicada e conta o resultado |
| Educador B | não vê a orientação do Educador A |
| Volta à pauta | o quadro Resultado mostra o que o professor contou |
| Educador e Coordenação abrem /pauta | Sem acesso |

Verificação do código: tipos e lint sem erros, 36 de 36 testes (3 novos), build ok.

Capturas: `capturas/e3-*.png`.

## Observações

- Na primeira rodada o roteiro de teste falhou depois de gravar a decisão, então o caso de teste tem a mesma decisão duas vezes. São dados fictícios e saem com "Apagar demonstração".
- O professor que recebe a orientação vem preenchido com o autor do último registro do caso; o Serviço Social pode trocar.

## Pendências

- Quando houver créditos no Lovable: regenerar os tipos do banco (as tabelas novas estão tipadas à mão).
- Publicar uma orientação não gera e-mail ao professor nesta entrega: ele a vê em Orientações e no Hoje. Aviso por e-mail depende de remetente institucional (pendente).
