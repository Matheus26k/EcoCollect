# language: pt

Funcionalidade: Detalhes do Agendamento
  Como um administrador
  Eu quero visualizar e atualizar os detalhes de um agendamento
  Para gerenciar adequadamente as coletas

  Contexto:
    Dado que sou um administrador autenticado
    E existe um agendamento com protocolo "COL-123456-ABC"

  Cenário: Visualizar detalhes completos do agendamento
    Quando acesso os detalhes do agendamento "COL-123456-ABC"
    Então devo ver as informações do cidadão:
      | campo    | valor                |
      | Nome     | João Silva           |
      | Telefone | (11) 99999-9999     |
      | Email    | joao@email.com      |
    E devo ver o endereço da coleta:
      | campo    | valor           |
      | Endereço | Rua das Flores  |
      | Número   | 123             |
      | Bairro   | Centro          |
      | Cidade   | São Paulo       |
    E devo ver os materiais selecionados:
      | material  |
      | Papel     |
      | Plástico  |
    E devo ver as informações da coleta:
      | campo              | valor      |
      | Data Sugerida      | 15/01/2024 |
      | Status             | Pendente   |
      | Data de Criação    | 10/01/2024 |
      | Última Atualização | 10/01/2024 |

  Cenário: Atualizar status para "Agendado"
    Dado que estou visualizando um agendamento com status "Pendente"
    Quando clico em "Editar" na seção de status
    E seleciono o status "Agendado"
    E clico em "Salvar"
    Então o status deve ser atualizado para "Agendado"
    E devo ver a mensagem "Status atualizado com sucesso!"
    E a data de atualização deve ser alterada

  Cenário: Atualizar status para "Concluído" com observações
    Dado que estou visualizando um agendamento com status "Agendado"
    Quando clico em "Editar" na seção de status
    E seleciono o status "Concluído"
    E preencho as observações "Coleta realizada com sucesso"
    E clico em "Salvar"
    Então o status deve ser atualizado para "Concluído"
    E as observações devem ser salvas
    E devo ver a mensagem "Status atualizado com sucesso!"

  Cenário: Validação de observações obrigatórias
    Dado que estou editando o status de um agendamento
    Quando seleciono o status "Concluído"
    E não preencho as observações
    E clico em "Salvar"
    Então devo ver a mensagem "Observações são obrigatórias para este status"

  Cenário: Cancelar edição de status
    Dado que estou editando o status de um agendamento
    Quando clico em "Cancelar"
    Então a edição deve ser cancelada
    E o status deve permanecer inalterado
    E o formulário de edição deve ser fechado

  Cenário: Voltar ao dashboard
    Dado que estou visualizando os detalhes de um agendamento
    Quando clico em "Voltar ao Dashboard"
    Então devo ser redirecionado para o dashboard
    E devo ver a lista de agendamentos

  Cenário: Agendamento não encontrado
    Quando tento acessar um agendamento inexistente
    Então devo ver a mensagem "Agendamento não encontrado"
    E devo ver um botão "Voltar ao Dashboard"

  Esquema do Cenário: Atualizar status com diferentes valores
    Dado que estou visualizando um agendamento
    Quando atualizo o status para "<status>"
    E preencho as observações "<observacoes>"
    Então o status deve ser atualizado para "<status>"
    E as observações devem ser "<observacoes_resultado>"

    Exemplos:
      | status    | observacoes                    | observacoes_resultado          |
      | Pendente  |                                |                                |
      | Agendado  | Agendado para manhã           | Agendado para manhã           |
      | Concluído | Coleta realizada              | Coleta realizada              |
      | Cancelado | Cliente não estava presente   | Cliente não estava presente   |