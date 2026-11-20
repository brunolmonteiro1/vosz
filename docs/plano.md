# Plano — Vosz Acompanha no Lovable

## Contexto

O Instituto Vosz quer um sistema interno ("Vosz Acompanha") para duas frentes: o percurso pedagógico (professor registra → Bruna tria → reunião de quinta → devolutiva → retorno) e a admissão (cadastro, entrevista, IVAV, fila, decisão, termo). O blueprint enviado (598 linhas; os dois arquivos são idênticos) já traz regras, telas, entidades, permissões, casos de aceite e prompts. O Bússola Social continua sendo o prontuário; a passagem para ele é manual, por síntese revisada.

Decisões desta conversa:
- Projeto **novo** no workspace "Bruno's Lovable" (Pro), separado do "Dashboard Vosz" (que está publicado como público).
- Primeiro percurso: **pedagógico** (Anexos G e H).
- **Parar a cada entrega** para aval antes de gastar mais créditos.
- Guardar blueprint e registro de entregas no repositório `vosz` (branch `claude/gracious-curie-tkpd1g`).

Estado atual: repositório vazio; nenhum projeto do Vosz Acompanha existe no Lovable.

## Como vou trabalhar

Eu envio as instruções ao agente do Lovable via MCP, leio o diff e os arquivos gerados, consulto o banco e peço correções. Cada entrega segue o mesmo ciclo:

1. `send_message` com `plan_mode=true` para o Lovable propor a abordagem; ajusto antes de ele escrever código.
2. `send_message` de implementação, com escopo de uma entrega só.
3. Conferência: `get_diff`, `read_file`/`grep_files` (RLS, funções de servidor), `query_database` (dados fictícios e políticas) e teste do percurso no preview com Playwright, entrando com cada perfil.
4. Registro em `docs/entregas/NN-nome.md`: prompt enviado, o que ficou implementado, teste executado, resultado observado, pendências — usando "especificado / implementado / testado" como pede o blueprint.
5. Paro e mostro o resultado.

Regras fixas em todas as entregas: só dados fictícios; nenhum e-mail real; sem publicar nem convidar usuários sem sua autorização; cálculo, reserva, autorização e transições no servidor; nenhuma planilha nominal passa por mim nem pelos prompts.

## Preparação (antes da entrega 1)

- Commitar no repositório: `docs/blueprint.md` (uma cópia do arquivo enviado), `docs/decisoes-pendentes.md` e `docs/entregas/`.
- `create_project` no workspace `90NNJgIn8uGBrGNni08p`, com o blueprint anexado (`get_file_upload_url`) e uma mensagem inicial curta que cria só a casca: nome, navegação, login. Visibilidade restrita.
- `set_project_knowledge` com as regras permanentes resumidas (o blueprint tem ~106 KB e não cabe inteiro): idioma, dados fictícios, permissões no servidor, regras aprovadas (50 vagas anuais, matrícula semestral, bolsa anual, +1 de irmão uma vez, exceções pela Diretoria, início sem piloto), o que está fora do escopo (CadÚnico, API do Bússola, portal familiar, Mercado Solidário, CORA).
- `enable_database` (Lovable Cloud).
- Sistema de design: tokens, tipografia, casca do app e biblioteca de componentes, com uma página interna de referência visual para você aprovar antes das telas de negócio.

Em cada entrega, o prompt cita só as seções do blueprint que ela usa, para o agente não se perder no documento inteiro.

## Design e painéis (padrão de agência)

Sim, dá para fazer. O Lovable sozinho tende ao visual genérico de shadcn; para fugir disso, eu defino a direção visual e cobro tela a tela, com captura do preview em desktop e celular a cada entrega.

**Sistema de design, criado na preparação e aplicado desde a entrega 1**
- Identidade: parto da logo e das cores do Instituto. Se você me enviar a logo ou o manual da marca, uso; senão, leio o que já existe no "Dashboard Vosz" e proponho uma paleta.
- Tokens únicos de cor, tipografia, espaçamento, raio e sombra, em tema claro e escuro; nenhuma cor solta nas telas.
- Tipografia com hierarquia clara (uma família para títulos, outra para texto e números tabulares nos indicadores).
- Componentes próprios: casca do app com navegação lateral no desktop e barra inferior no celular, cartão de indicador, cartão de alerta, linha do tempo da criança, quadro de triagem, tabela densa com filtros, estados vazio/carregando/erro desenhados.
- Movimento discreto (transições de página, números que contam, esqueletos de carregamento) e acessibilidade AA de contraste e foco.
- Formulário do professor pensado para o polegar: uma pergunta por bloco, alvos grandes, progresso visível.

**Painéis e indicadores**

| Painel | Para quem | Conteúdo |
|---|---|---|
| Hoje | Todos, conforme o papel | Cartões de pendência que abrem a lista filtrada; alertas por prazo (vencido, vence hoje, esta semana); próxima ação e responsável |
| Minha turma | Professor | Orientações a aplicar, registros aguardando retorno, situação de cada protocolo |
| Pauta de quinta | Direção e equipe | Casos novos, reincidências, ações vencidas; por caso, "último combinado / feito / resultado / em aberto" |
| Direção | Direção | As cinco perguntas de gestão como blocos; KPIs com tendência: tempo mediano até triagem e até devolutiva, % de decisões com ação e prazo, devolutivas lidas e com retorno, ações vencidas, visitas previstas × realizadas, casos revistos após recorrência |
| Admissão (entregas 5–6) | Coordenação e Direção | Funil recebido → entrevistado → elegível → ofertado → aceito; ocupação × capacidade por turno; espera por motivo; distribuição das faixas IVAV; vencimentos de avaliação e bolsa |
| Conciliação (entrega 7) | Coordenação | 44 / 47 / 48 / 50 lado a lado, com divergências explicadas |

Gráficos com Recharts estilizado nos tokens: linhas de tendência semanais, barras empilhadas por situação, funil, medidor de ocupação e minigráficos dentro dos cartões. Todo indicador mostra período, denominador e dados ausentes.

**Alertas e insights**: os alertas são regras determinísticas (prazo, devolutiva sem ciência, visita sem retorno, encaminhamento vencido), com chave única para não repetir. Os "insights" da entrega 4 são frases calculadas a partir desses números (ex.: "3 orientações publicadas há mais de 7 dias sem ciência"). Texto gerado por IA fica para depois, como o blueprint exige.

**Limites que o blueprint impõe e que o design respeita**: volume de ocorrências por criança não vira ranking nem indicador de gravidade; professor não vê painel de direção nem classificação; recortes pequenos que identifiquem uma família são suprimidos; cada gráfico obedece às permissões no servidor.

## Facilidade de uso e ajuda na tela

Regra geral: o sistema tem de ser entendido sem treinamento longo. Cada tela responde a três perguntas — onde estou, o que faço aqui, o que acontece depois.

**Ajuda contextual (em todas as entregas)**
- **Introdução da tela**: no topo de cada página, uma ou duas frases ("Nesta página você…"), com link "Saiba mais" que abre o passo a passo. Pode ser recolhida, e o sistema lembra a escolha de cada pessoa.
- **Interrogação (?)**: ao lado de cada métrica, de cada título de seção e de cada campo que não seja óbvio. Abre ao passar o mouse, ao receber foco do teclado e ao tocar (no celular não existe "passar o mouse"). Conteúdo: o que é, como é calculado ou o que preencher, e um exemplo.
- **Métricas**: a interrogação mostra definição, fórmula, período, denominador e o que fazer quando o número está ruim.
- **Campos**: rótulo sempre visível, texto de apoio abaixo do campo quando há regra de preenchimento, exemplo dentro da ajuda, e indicação de obrigatório ou opcional.
- **Botões e menus**: o próprio rótulo explica (verbo + objeto: "Publicar devolutiva"). Botão só com ícone ganha dica com o nome. Ação irreversível ganha confirmação que diz o que vai acontecer.
- **Glossário**: página única com os termos da casa (IVAV, devolutiva, triagem, edital, rematrícula, Bússola, síntese), acessível pelo menu e pela busca.

**Não inventar**: todo texto de ajuda, política, critério e definição vem do blueprint ou de material enviado pelo Instituto e fica num único arquivo de conteúdo, com a origem anotada. Onde a base não existe, o sistema mostra "Pendente de envio pelo Instituto" — nunca um texto plausível. A lista do que falta está em `docs/pendente-de-envio.md`; eu a reviso a cada entrega.

**Página "Políticas e documentos"**: reúne critérios de elegibilidade, regulamento, política de bolsas, reconsideração, urgência e privacidade, para quem entra na equipe saber as regras. Cada item mostra o texto recebido, com versão e data, ou o selo "Pendente de envio". Administração vê um contador de quantos itens faltam.

**Outras práticas adotadas**
- Menu por papel: cada pessoa vê só o que usa. A professora vê quatro itens, não doze.
- Uma ação principal por tela, sempre no mesmo lugar.
- Estado vazio que ensina: explica o que aparece ali e oferece o primeiro passo.
- "Próxima ação" e responsável visíveis em todo caso, pedido e tarefa.
- Formulários longos em etapas, com progresso, rascunho salvo sozinho e retomada de onde parou.
- Erro escrito em português simples, ao lado do campo, dizendo como corrigir. Nada de código de erro.
- Confirmação visível depois de salvar; desfazer quando a ação permitir.
- Mesmo nome para a mesma coisa em todas as telas (vocabulário do glossário).
- Painéis com poucos indicadores (quatro a seis), o resto um clique abaixo.
- Primeiro acesso: três ou quatro passos guiados por papel, que dá para pular e rever depois.
- Acessibilidade: contraste AA, navegação por teclado, alvos de toque de 44px, texto que aguenta zoom.

**Verificação de uso**: ao fim das entregas 2 e 5, um roteiro curto com dados fictícios para uma professora e para a Bruna executarem sozinhas (registrar uma ocorrência; fazer uma entrevista). Meço onde travam e corrijo antes de seguir. Não é piloto institucional: é teste de tela.

**Ajustes ao plano original depois desta revisão**
- Navegação: eram doze itens iguais para todos; passa a ser por papel.
- Formulário do professor: meta de concluir em até dois minutos; perguntas opcionais ficam recolhidas.
- Archivo Black só em título de página e valor de indicador; em tela densa o restante é PT Sans, para não pesar.
- Tema escuro deixa de ser obrigatório em cada tela nova; fica o claro como padrão testado.
- A casca já construída ganha, na entrega 1, os componentes de ajuda (introdução, interrogação, glossário) e o menu por papel.

## Entregas

| # | Entrega | Base no blueprint | Demonstração de aceite |
|---|---|---|---|
| 1 | **Identidade e vínculos** — login por convite, recuperação, revogação; perfis (admin técnico, direção, serviço social, coordenação, educador, profissional de apoio, revisor); famílias, crianças, oito turmas por cor, vínculo professor–turma–criança; RLS por linha; trilha de auditoria | Seções 7–8, incremental 1 | Matriz de testes por papel: educador não vê criança de outra turma (negado no servidor); usuário sem atribuição não vê nada; admin não lê casos |
| 2 | **Registro do professor** — formulário "Percebi algo hoje…" no celular com todos os campos e os três caminhos de apoio, evolução positiva, protocolo, Meus registros, complemento datado; aviso no painel para Bruna e Direção e fila de e-mail simulada com retentativa e alerta de falha | Anexo H; G passos 1–2 | Três caminhos do formulário; falha de e-mail mantém tarefa no painel; urgência segue fluxo imediato |
| 3 | **Triagem, quinta-feira e devolutiva** — entrada de ocorrências, vínculo a caso, pauta de quinta com "último combinado / o que foi feito / resultado / em aberto", contribuições por profissional com nível de acesso, decisões e ações com prazo, devolutiva publicada → lida → aplicada → resultado, recorrência | Anexo G passos 3–7 | Percurso completo até a reunião seguinte com dois professores de turmas diferentes, uma recorrência, uma urgência e um parecer restrito; caso adiado reaparece |
| 4 | **Agenda, visitas e Bússola** — contatos e visitas (agendado ≠ realizado), encaminhamentos com retorno, relatório de visita em PDF restrito, síntese rascunho → revisada → copiada → lançamento confirmado, fila "falta registrar no Bússola", painel da Direção com as cinco perguntas | Anexo G (agenda, destinos, telas) e H (painel) | Copiar não marca lançamento; síntese exclui notas privadas; consulta agendada não conta como realizada |
| 5 | **Pessoas, entrevista e IVAV** — diretório de alunos e candidatos, carteira de entrevistas da Bruna, entrevista em rascunho por seção, oito dimensões com memória de cálculo, política versionada, urgência com dados incompletos | Seção 5, Anexos D e I, incremental 2 | Família do exemplo dá 56; limites exatos de ¼, ½ e 1 salário mínimo; renda zero confirmada ≠ renda desconhecida |
| 6 | **Ofertas, fila, decisão e termos** — edital, ranking por oferta com +1 de irmão, reserva transacional da última vaga, revisão por pessoa distinta, reconsideração, rematrícula semestral com bolsa anual, contrato e termos em PDF A4 | Seção 6, Anexos A, B, E, I, incremental 3 | IVAV 56 com 0/1/3 irmãos → 56/57/57; duas confirmações simultâneas → uma vale; parcial/paga bloqueada sem edital |
| 7 | **Importação, complementares e homologação** — importador em duas etapas com planilhas fictícias no esquema dos relatórios, reconciliação, plano familiar, ciclos complementares, alertas e conferência diária, todos os casos da seção 9 | Anexos C, F, I (reconciliação), incrementais 4–5 | Reimportar lote sem duplicar; relatório de evidências por caso de aceite |

A IA assistiva (Anexo F) fica para depois da entrega 7 e só entra com fornecedor, finalidade e retenção aprovados.

## O que depende de vocês

Não bloqueia as entregas 1–4. Vou deixar parametrizável e marcado "pendente de aprovação":
- Entrega 5: perguntas padronizadas de segurança alimentar; peso de mãe solo.
- Entrega 6: ordem de desempate, valores e percentuais por edital, quem julga reconsideração ordinária, textos aprovados do contrato e dos termos.
- Saúde mental: matriz de acesso por campo — fica fora até ser validada.
- Para ir a produção: aviso de privacidade às famílias, política de retenção, responsável por incidentes, remetente de e-mail institucional e autorização para publicar e convidar a equipe.

## Riscos que vou vigiar

- **Permissões**: é o ponto onde apps gerados mais falham. Confiro cada política de RLS lendo o código e testando com cada perfil, incluindo busca, PDF e link direto.
- **Concorrência da vaga**: exijo função transacional no banco e testo com duas chamadas simultâneas.
- **Tamanho**: sete entregas num projeto só; se o agente começar a quebrar o que já funcionava, paro e corrijo antes de avançar.
- **Créditos**: o consumo cresce com retrabalho; por isso o passo de plano antes de cada implementação.

## Verificação

Por entrega: diff revisado, políticas lidas, consulta ao banco, percurso executado no preview com cada perfil e registro em `docs/entregas/`. Ao final, os dois percursos do blueprint de ponta a ponta (pedagógico e admissão) e a tabela de casos de aceite da seção 9, cada linha com evidência.

## Primeiro passo após a aprovação

Preparação (incluindo o sistema de design) + entrega 1, e paro para mostrar as capturas das telas em desktop e celular e a matriz de testes por papel.
