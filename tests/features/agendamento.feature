# language: pt

Funcionalidade: Agendar Coleta de Recicláveis
  Como cidadão
  Eu quero agendar coleta de materiais
  Para descartar recicláveis corretamente

  Cenário: Criar agendamento com CEP válido
    Dado que estou na página inicial
    Quando preencho nome "João Silva"
    E preencho CEP "01234-567"
    E aguardo preenchimento automático do endereço
    E preencho número "123"
    E preencho telefone "(11) 99999-9999"
    E seleciono data para 5 dias no futuro
    E marco "Papel" e "Plástico"
    E clico em "Agendar Coleta"
    Então vejo "Agendamento Criado com Sucesso!"
    E recebo protocolo formato "COL-123456-ABC123"

  Cenário: CEP inválido bloqueia campos de endereço
    Dado que estou na página inicial
    Quando preencho nome "João Silva"
    E preencho CEP inválido "00000-000"
    Então campos de endereço ficam desabilitados
    E vejo placeholder "Digite um CEP válido primeiro"

  Cenário: Validação em tempo real
    Dado que estou na página inicial
    Quando preencho nome com 1 caractere
    Então vejo erro "Nome deve ter pelo menos 2 caracteres"
    E botão "Agendar Coleta" fica desabilitado

  Cenário: Telefone com formatação automática
    Dado que estou na página inicial
    Quando digito telefone "11999999999"
    Então vejo formatado "(11) 99999-9999"

  Cenário: Data muito próxima
    Dado que preencho todos os campos válidos
    Quando seleciono data de amanhã
    E clico em "Agendar Coleta"
    Então vejo erro sobre data mínima de 2 dias úteis

  Cenário: Não selecionar materiais
    Dado que preencho todos os campos válidos
    Quando não marco nenhum material
    E clico em "Agendar Coleta"
    Então vejo "Selecione pelo menos um material"

  Cenário: Fazer novo agendamento
    Dado que criei agendamento com sucesso
    Quando clico em "Fazer Novo Agendamento"
    Então volto ao formulário limpo