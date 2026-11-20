# Entrega 4 — Agenda e visitas, encaminhamentos, síntese para o Bússola e painel da Direção

Construída fora do Lovable (workspace sem créditos), no modo automático pedido pelo responsável.
Código: `brunolmonteiro1/vosz-warmth-and-guidance`, commit `3ee6477`, já no `main`.

## Banco de dados

SQL aplicado direto no banco em 20/11/2026: `docs/sql/2026-11-20_entrega4_agenda_visitas_bussola.sql`.

- Tabelas: `contato_visita`, `contato_crianca` (um encontro, várias crianças da família), `encaminhamento`, `sintese_bussola`.
- Leitura: só Serviço Social e Direção. Contato restrito: só o responsável, quem registrou e o responsável pelo caso. Educador, coordenação e anônimo não leem nada.
- Escrita só por funções: `agendar_contato`, `registrar_contato`, `remarcar_contato`, `criar_encaminhamento`, `atualizar_encaminhamento`, `preparar_sintese`, `revisar_sintese`, `marcar_sintese_copiada`, `confirmar_lancamento`, `corrigir_sintese`, `indicadores_direcao`. `apagar_demonstracao` passou a limpar as tabelas novas.
- Regras do Anexo G garantidas no servidor: agendado ≠ realizado; remarcar cria contato novo e guarda o anterior; consulta externa só como "família informou que compareceu"; contato encerrado não muda; síntese segue rascunho → revisada → copiada → lançamento confirmado, e confirmar exige ter copiado; correção cria nova versão (retificação quando a anterior já estava lançada); a síntese nunca leva a observação técnica da equipe nem o relato de contato restrito.

### Teste do banco — NÃO EXECUTADO

O teste `supabase/tests/entrega4_agenda_bussola.sql` (transação desfeita) foi escrito, mas a execução pede aprovação a cada chamada e ficou sem resposta enquanto o responsável estava longe. As regras acima foram exercidas pelo teste de ponta a ponta abaixo, com as contas de demonstração, mas não os casos negativos em SQL (educador tentando agendar, segundo profissional lendo contato restrito, inserção direta). **Rodar o teste antes de usar com dados reais.**

## Telas

- **Agenda e visitas** (Serviço Social): abas Próximos, Falta registrar, Realizados e encerrados, Encaminhamentos. Novo contato (agendado ou "a família ligou agora"), ligado ao caso e à ação da reunião; registrar desfecho (aconteceu, ausência, tentativa sem contato, cancelado); remarcar; preparar síntese por criança; imprimir relatório com escolha de seções (a observação da equipe vem desmarcada; aviso de documento restrito).
- **Encaminhamentos**: serviço de destino, motivo, quem cobra, prazo; "A família conseguiu atendimento?" fecha o encaminhamento; vencidos primeiro.
- **Lançamentos no Bússola** (Serviço Social): fila "Falta registrar no Bússola" e lançamentos confirmados; revisar com campo e nível no Bússola; copiar; confirmar com data e referência; corrigir.
- **Gestão** (Direção): oito indicadores com período e denominador (tempo mediano até triagem e até orientação, decisões com ação e prazo, orientações lidas e com retorno, ações vencidas, visitas previstas e realizadas, casos revistos após recorrência, encaminhamentos vencidos); as cinco perguntas do Anexo H; tabela por profissional; filtros por período e pessoa responsável. Sem ranking de crianças.
- **Hoje** do Serviço Social: contatos de hoje, falta registrar, retornos vencidos, falta registrar no Bússola.

## Teste de ponta a ponta (20/11/2026, local, contas de demonstração)

| Passo | Resultado |
|---|---|
| Agendar visita passada e escuta futura | Próximos (1), Falta registrar (1) |
| Remarcar a escuta | anterior aparece como Remarcado; nova data em Próximos |
| Visita passada | aviso "Falta registrar o que aconteceu"; registro do desfecho com relato, nota técnica, acordos e próximo contato |
| Preparar síntese | botão some depois de preparar; síntese aparece na fila sem a nota técnica |
| Encaminhamento | criado e marcado como recebido pelo serviço |
| Bússola | revisar → copiar (texto copiado tem o relato e não tem a nota técnica) → continua na fila como "Copiada, falta confirmar" → confirmar → sai da fila |
| Gestão (Direção) | cinco perguntas presentes; visitas realizadas 1 de 1 prevista; Direção não abre /bussola |
| Educador | /agenda, /bussola e /gestao: Sem acesso |

Verificação do código: tipos e lint sem erros, 43 de 43 testes (7 novos), build ok. Capturas: `capturas/e4-*.png`.

## Pendências

- Rodar `supabase/tests/entrega4_agenda_bussola.sql` (aguarda aprovação).
- Lista de campos e níveis de acesso do Bússola na conta do Instituto: pendente de envio (o campo é texto livre por enquanto).
- Coleta offline em visita: fora desta entrega, como manda o Anexo G, até haver aparelho institucional e regra de sincronização.
- Regenerar os tipos do banco quando houver créditos no Lovable.
