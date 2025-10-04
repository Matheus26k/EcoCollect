# language: pt

Funcionalidade: Dashboard do Administrador
  Como administrador
  Eu quero ver os agendamentos
  Para gerenciar as coletas

  Cenário: Ver lista de agendamentos
    Dado que fiz login como admin
    Quando acesso o dashboard
    Então vejo lista com:
      | Protocolo   |
      | Nome        |
      | Data        |
      | Status      |
      | Ações       |

  Cenário: Filtrar por status
    Dado que estou no dashboard
    Quando seleciono filtro "Pendente"
    Então vejo só agendamentos pendentes

  Cenário: Ver detalhes do agendamento
    Dado que estou no dashboard
    Quando clico em "Ver Detalhes"
    Então vejo página com todas as informações

  Cenário: Fazer logout
    Dado que estou logado
    Quando clico em "Sair"
    Então volto para tela de login