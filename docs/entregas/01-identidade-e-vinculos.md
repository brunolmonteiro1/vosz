# Entrega 1 — Identidade, vínculos, permissões e ajuda na tela

Projeto Lovable `b4854b10-fd34-4469-8c6a-4e50a5a2e39a`. Mensagem de implementação `umsg_01m7v506j8f3tsr3gr14n01j7h`; relatório do agente em `docs/relatorio-entrega1.md` do projeto.

## Implementado (segundo o código e o relatório do agente)

- Login por e-mail e senha, sem cadastro público; convite e redefinição por link de uso único (só o hash é guardado; nenhum e-mail é enviado).
- `/configuracao-inicial` para criar o primeiro administrador; bloqueada depois.
- 13 tabelas com RLS: `perfil_usuario`, `atribuicao_papel`, `convite`, `link_redefinicao`, `turma`, `educador_turma`, `familia`, `pessoa`, `vinculo_familiar`, `contato_pessoa`, `crianca_turma`, `evento_auditoria`, `preferencia_ajuda`. Migrações em `drizzle/migrations/0000`–`0006`.
- Funções de autorização (`usuario_ativo`, `tem_papel`, `educador_da_turma`, `educador_ve_crianca`) e RPCs de escrita sensível, todas `SECURITY DEFINER` com `search_path` fixo e verificação de papel no início.
- Auditoria por trigger, com bloqueio de alteração e exclusão.
- Menu por papel; telas de Usuários e convites, Turmas, Pessoas e famílias (com aviso de duplicidade), Minha turma, Auditoria, Ajuda/Glossário, Políticas e documentos, Configurações (semear e apagar demonstração).
- Ajuda na tela: `PageIntro`, `HelpTip` e `src/content/ajuda.ts` com origem por entrada.

## Testado por mim

Teste no banco, com dados fictícios criados e desfeitos na mesma transação, simulando cada papel (`set local role authenticated` + `request.jwt.claims`):

| Papel | Crianças | Turmas | Família / vínculos / contato | Perfis | Auditoria | Inserir papel | Alterar ou apagar auditoria |
|---|---|---|---|---|---|---|---|
| Educador A | só a da turma A | 1 | nenhum | só o próprio | 0 | negado | 0 linhas |
| Educador B | só a da turma B | 1 | nenhum | só o próprio | 0 | negado | 0 linhas |
| Serviço Social | as 2 | 2 | lê | só o próprio | 0 | negado | 0 linhas |
| Admin técnico | nenhuma | 2 | nenhum | todos | só eventos administrativos | negado | 0 linhas |
| Sem papel | nada | 0 | nada | 0 | 0 | negado | 0 linhas |
| Usuário inativo | nada | 0 | nada | 0 | 0 | negado | 0 linhas |
| Direção | as 2 | 2 | lê | todos | todos | negado | 0 linhas |
| Anônimo | nada | — | nada | 0 | 0 | — | — |

Também conferi: educador e direção não alteram pessoa (0 linhas); ninguém altera o próprio perfil por update direto; as RPCs de convite, papel, redefinição e vínculos recusam quem não tem o papel exigido.

Conteúdo de ajuda: todas as entradas citam seção do blueprint; os 6 termos e os 12 documentos sem base aparecem como "Pendente de envio pelo Instituto". Nada inventado encontrado.

## Correções pedidas ao Lovable (`umsg_01m7v72tnaf0vvyt3ka5dwsjmx`)

1. Trocar 6 `window.confirm` por confirmação contextual.
2. Erros de formulário ao lado do campo.
3. Pessoa, vínculo e contato gravados juntos (hoje o contato vai em operação separada).
4. Revogar `TRUNCATE` e privilégios de tabela de `anon`, e `EXECUTE` de `anon` nas funções que não são usadas antes do login. Não é falha explorável pela API hoje, é endurecimento.
5. Turma: o campo "cor" aceitava só tokens visuais; separar nome real da turma do destaque visual.
6. Remover "Bolsas por parceiro" (não está no blueprint) da lista de itens futuros.
7. Manter o nome "Vosz Acompanha" na interface.

## Limitações registradas pelo agente

- Criação da conta no provedor e gravação do perfil não são uma transação única; há limpeza compensatória, mas falta reconciliação antes de produção.
- O script `supabase/tests/entrega1_rls.sql` foi escrito mas não executado pelo agente; o teste equivalente acima foi executado por mim.
- Revisão completa de contraste e teclado em todos os formulários não foi feita.

## Pendências

- Conferir as correções acima.
- Criar o primeiro administrador em `/configuracao-inicial` (responsável).
- Repositório GitHub do código: o Lovable não liga a um repositório existente; aguarda conexão pelo editor.

## Verificação no código (repositório `brunolmonteiro1/vosz-warmth-and-guidance`)

Clone do commit `fffb469`, rodado aqui:

| Verificação | Resultado |
|---|---|
| Tipagem (`tsc --noEmit`) | sem erros |
| Testes (`vitest run`) | 6 de 6 passaram |
| Build de produção | concluído |
| Lint | 15 avisos de recarga em desenvolvimento (inofensivos) e 1.356 erros só de formatação: o agente grava código em linhas muito longas. Não afeta o funcionamento; dificulta revisão. |
| Chave administrativa do banco | não está no repositório (o `.env` só tem as chaves públicas) — correto |

Capturas da tela de entrada: `capturas/e1-entrar-desktop.png` e `capturas/e1-entrar-celular.png`. As telas internas exigem login; não criei o primeiro administrador para não ocupar o acesso do responsável.

Ajustes visuais notados no celular: botão "Entrar" não ocupa a largura toda e "Esqueci minha senha" está desalinhado à direita do formulário. Localmente, `/configuracao-inicial` fica em "Conferindo configuração…" sem mensagem de erro quando o servidor falha — falta estado de erro.
