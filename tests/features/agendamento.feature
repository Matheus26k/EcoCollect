# language: pt

Funcionalidade: Agendamento de Coleta de Recicláveis
  Como um cidadão
  Eu quero agendar a coleta de materiais recicláveis
  Para contribuir com o meio ambiente de forma organizada

  Contexto:
    Dado que estou na página inicial do sistema
    E os tipos de materiais estão disponíveis

  Cenário: Criar agendamento com sucesso
    Quando eu preencho o formulário com dados válidos:
      | campo         | valor                    |
      | Nome          | João Silva               |
      | Endereço      | Rua das Flores, 123     |
      | Número        | 123                      |
      | Bairro        | Centro                   |
      | Cidade        | São Paulo                |
      | Telefone      | (11) 99999-9999         |
      | Email         | joao@email.com          |
      | Data          | 5 dias no futuro         |
    E seleciono os materiais "Papel" e "Plástico"
    E clico em "Agendar Coleta"
    Então devo ver a mensagem "Agendamento Criado com Sucesso!"
    E devo receber um número de protocolo
    E o protocolo deve seguir o formato "COL-XXXXXX-XXXXXX"

  Cenário: Validação de campos obrigatórios
    Quando eu clico em "Agendar Coleta" sem preencher o formulário
    Então devo ver as mensagens de erro:
      | campo    | mensagem                |
      | Nome     | Nome é obrigatório      |
      | Endereço | Endereço é obrigatório  |
      | Número   | Número é obrigatório    |
      | Bairro   | Bairro é obrigatório    |
      | Cidade   | Cidade é obrigatória    |
      | Telefone | Telefone é obrigatório  |

  Cenário: Validação de formato de telefone
    Quando eu preencho o telefone com "123456789"
    E clico em "Agendar Coleta"
    Então devo ver a mensagem "Formato: (11) 99999-9999"

  Cenário: Validação de data mínima
    Dado que preencho todos os campos obrigatórios
    Quando eu seleciono a data de hoje
    E clico em "Agendar Coleta"
    Então devo ver uma mensagem de erro sobre data mínima

  Cenário: Validação de seleção de materiais
    Dado que preencho todos os campos obrigatórios
    Quando eu não seleciono nenhum material
    E clico em "Agendar Coleta"
    Então devo ver a mensagem "Selecione pelo menos um material"

  Cenário: Fazer novo agendamento após sucesso
    Dado que criei um agendamento com sucesso
    Quando clico em "Fazer Novo Agendamento"
    Então devo voltar ao formulário de agendamento
    E o formulário deve estar limpo