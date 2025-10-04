# language: pt

Funcionalidade: Dashboard Administrativo
  Como um administrador
  Eu quero gerenciar os agendamentos de coleta
  Para organizar e acompanhar as solicitações dos cidadãos

  Contexto:
    Dado que sou um usuário administrador
    E estou autenticado no sistema

  Cenário: Visualizar lista de agendamentos
    Quando acesso o dashboard
    Então devo ver a lista de agendamentos
    E devo ver as colunas:
      | coluna      |
      | Protocolo   |
      | Cidadão     |
      | Data Coleta |
      | Materiais   |
      | Status      |
      | Ações       |

  Cenário: Filtrar agendamentos por status
    Dado que estou no dashboard
    Quando seleciono o filtro de status "Pendente"
    Então devo ver apenas agendamentos com status "Pendente"

  Cenário: Filtrar agendamentos por período
    Dado que estou no dashboard
    Quando defino o período de 01/01/2024 a 31/01/2024
    Então devo ver apenas agendamentos neste período

  Cenário: Limpar filtros
    Dado que apliquei filtros no dashboard
    Quando clico em "Limpar Filtros"
    Então todos os filtros devem ser removidos
    E devo ver todos os agendamentos

  Cenário: Visualizar estatísticas
    Quando acesso o dashboard
    Então devo ver cards com estatísticas:
      | status     | quantidade |
      | Pendente   | 2          |
      | Agendado   | 1          |
      | Concluído  | 1          |
      | Cancelado  | 0          |

  Cenário: Navegar para detalhes do agendamento
    Dado que estou visualizando a lista de agendamentos
    Quando clico em "Ver Detalhes" de um agendamento
    Então devo ser redirecionado para a página de detalhes
    E devo ver todas as informações do agendamento

  Cenário: Atualização automática da lista
    Dado que estou no dashboard
    Quando aguardo 30 segundos
    Então a lista deve ser atualizada automaticamente

  Cenário: Fazer logout
    Dado que estou autenticado
    Quando clico em "Sair"
    Então devo ser redirecionado para a página de login
    E minha sessão deve ser encerrada