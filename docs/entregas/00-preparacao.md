# Entrega 0 — Preparação e sistema de design

Projeto Lovable: Vosz Acompanha (`b4854b10-fd34-4469-8c6a-4e50a5a2e39a`), workspace "Bruno's Lovable".
Editor: https://lovable.dev/projects/b4854b10-fd34-4469-8c6a-4e50a5a2e39a

## Enviado ao agente do Lovable

1. Mensagem inicial, com o blueprint anexado: casca do app, tela de entrada, componentes em `src/components/vosz/` (KpiCard, AlertCard, InsightCard, StatusBadge, Timeline, KanbanBoard, DataTable, StepForm, gráficos) e página `/design` com Painel da Direção de exemplo. Sem banco, sem autenticação real, sem regras de negócio. A paleta desta primeira versão (petróleo e âmbar) era proposta e foi descartada.
2. Troca de identidade para a marca oficial (`docs/design-system/`): roxo `#4200ac`, magenta `#ff00a7`, Archivo Black + PT Sans, cinco logos anexados. Estados semânticos, paleta de gráficos e tema escuro pedidos como extensão, fora da marca institucional.
3. Remoção do padrão decorativo de fileiras de V, a pedido do responsável, que viu a prévia e não gostou. Regra daqui em diante: superfícies lisas, sem padrões.

Conhecimento do projeto gravado com as regras permanentes (idioma, marca, segurança, perfis, regras aprovadas, fora do escopo, pendências).

## Situação

| Item | Situação | Evidência |
|---|---|---|
| Projeto criado, não publicado | implementado | `get_project`: `is_published: false` |
| Marca oficial nos tokens | implementado | `src/styles.css` define `--roxo: #4200ac` e demais tokens |
| Fontes Archivo Black e PT Sans | implementado | carregadas em `src/routes/__root.tsx`; busca por "Fraunces" sem resultado |
| Padrão de V removido | implementado | busca por "Pattern" sem resultado; captura de `/entrar` com painel roxo liso |
| Tela `/entrar` | implementado (apenas visual) | captura devolvida pelo Lovable |
| `/hoje`, `/design`, tema escuro, celular | implementado pelo agente; não conferido visualmente | o preview exige login do Lovable; só o responsável consegue abrir |
| Banco de dados (Lovable Cloud) | não habilitado | entra na entrega 1 |

## Pendências

- Aprovação visual do responsável para `/hoje`, `/design`, tema escuro e celular.
- Visibilidade "restrita" exige plano Business; o projeto está como `workspace_edit`.
- Para capturas automáticas das demais telas, conectar o projeto ao GitHub pelo editor do Lovable.
