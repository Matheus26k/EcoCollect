# language: pt

Funcionalidade: Agendar Coleta de Recicláveis
  Como cidadão
  Eu quero agendar coleta de materiais
  Para descartar recicláveis corretamente

  Cenário: Criar agendamento com dados corretos
    Dado que estou na página inicial
    Quando eu preencho:
      | Nome     | João Silva           |
      | Endereço | Rua das Flores, 123  |
      | Número   | 123                  |
      | Bairro   | Centro               |
      | Cidade   | São Paulo            |
      | Telefone | (11) 99999-9999     |
    E seleciono data para 5 dias no futuro
    E marco "Papel" e "Plástico"
    E clico em "Agendar Coleta"
    Então vejo "Agendamento Criado com Sucesso!"
    E recebo um protocolo formato "COL-123456-ABC123"

  Cenário: Não preencher campos obrigatórios
    Dado que estou na página inicial
    Quando clico em "Agendar Coleta" sem preencher nada
    Então vejo mensagens de erro:
      | Nome é obrigatório     |
      | Endereço é obrigatório |
      | Telefone é obrigatório |

  Cenário: Data muito próxima
    Dado que preencho todos os campos
    Quando seleciono data de amanhã
    E clico em "Agendar Coleta"
    Então vejo erro sobre data mínima

  Cenário: Não selecionar materiais
    Dado que preencho todos os campos
    Quando não marco nenhum material
    E clico em "Agendar Coleta"
    Então vejo "Selecione pelo menos um material"