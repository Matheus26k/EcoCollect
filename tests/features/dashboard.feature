# language: pt

Funcionalidade: Dashboard Administrativo
  Como administrador
  Eu quero gerenciar agendamentos
  Para organizar as coletas

  Contexto:
    Dado que fiz login como admin com:
      | email                | admin@ecocollect.com |
      | senha                | admin123             |
      | token                | E3c0A2d0m2i5n9X7     |

  Cenário: Ver lista de agendamentos
    Dado que estou no dashboard
    Então vejo a tabela com colunas:
      | Protocolo   |
      | Cidadão     |
      | Data Coleta |
      | Materiais   |
      | Status      |
      | Ações       |

  Cenário: Filtrar agendamentos por status
    Dado que estou no dashboard
    Quando clico em "Mostrar Filtros"
    E seleciono status "Pendente"
    Então vejo apenas agendamentos pendentes

  Cenário: Filtrar por período
    Dado que estou no dashboard
    Quando clico em "Mostrar Filtros"
    E defino data início "2024-01-01"
    E defino data fim "2024-01-31"
    Então vejo agendamentos do período

  Cenário: Ver detalhes do agendamento
    Dado que estou no dashboard
    Quando clico em "Ver Detalhes" de um agendamento
    Então vejo página de detalhes com:
      | Protocolo        |
      | Nome completo    |
      | Endereço         |
      | Telefone         |
      | Data sugerida    |
      | Materiais        |
      | Status atual     |

  Cenário: Atualizar status do agendamento
    Dado que estou na página de detalhes
    Quando altero status para "Agendado"
    E clico em "Salvar"
    Então vejo "Status atualizado com sucesso!"

  Cenário: Limpar filtros
    Dado que apliquei filtros
    Quando clico em "Limpar Filtros"
    Então todos os filtros são removidos

  Cenário: Fazer logout
    Dado que estou no dashboard
    Quando clico em "Sair"
    Então sou redirecionado para o login