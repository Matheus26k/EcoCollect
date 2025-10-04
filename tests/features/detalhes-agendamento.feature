# language: pt

Funcionalidade: Detalhes do Agendamento
  Como administrador
  Eu quero ver e atualizar agendamentos
  Para gerenciar as coletas

  Contexto:
    Dado que fiz login como admin
    E existe agendamento "COL-123456-ABC123"

  Cenário: Ver detalhes completos
    Quando acesso detalhes do agendamento
    Então vejo informações do cidadão:
      | Nome     | João Silva          |
      | Telefone | (11) 99999-9999    |
      | Email    | joao@email.com     |
    E vejo endereço da coleta:
      | CEP      | 01234-567          |
      | Endereço | Rua das Flores, 123|
      | Bairro   | Centro             |
      | Cidade   | São Paulo          |
    E vejo materiais selecionados:
      | Papel    |
      | Plástico |
    E vejo informações da coleta:
      | Data Sugerida | 15/01/2024 |
      | Status        | Pendente   |
      | Protocolo     | COL-123456-ABC123 |

  Cenário: Atualizar status para Agendado
    Dado que estou nos detalhes do agendamento
    Quando clico em "Editar Status"
    E seleciono "Agendado"
    E clico em "Salvar"
    Então vejo "Status atualizado com sucesso!"
    E status fica "Agendado"

  Cenário: Atualizar para Concluído com observações
    Dado que estou nos detalhes do agendamento
    Quando clico em "Editar Status"
    E seleciono "Concluído"
    E preencho observações "Coleta realizada"
    E clico em "Salvar"
    Então vejo "Status atualizado com sucesso!"
    E status fica "Concluído"

  Cenário: Validação de observações obrigatórias
    Dado que estou editando status
    Quando seleciono "Concluído"
    E não preencho observações
    E clico em "Salvar"
    Então vejo erro sobre observações obrigatórias

  Cenário: Voltar ao dashboard
    Dado que estou nos detalhes
    Quando clico em "Voltar ao Dashboard"
    Então volto para lista de agendamentos