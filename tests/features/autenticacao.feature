# language: pt

Funcionalidade: Autenticação de Usuários
  Como um administrador
  Eu quero fazer login no sistema
  Para acessar a área administrativa

  Contexto:
    Dado que existe um usuário administrador cadastrado:
      | email              | senha    |
      | admin@coletas.com  | admin123 |

  Cenário: Login com credenciais válidas
    Dado que estou na página de login
    Quando eu preencho o email "admin@coletas.com"
    E preencho a senha "admin123"
    E clico em "Entrar"
    Então devo ser redirecionado para o dashboard
    E devo ver a mensagem "Login realizado com sucesso!"

  Cenário: Login com credenciais inválidas
    Dado que estou na página de login
    Quando eu preencho o email "admin@coletas.com"
    E preencho a senha "senha_errada"
    E clico em "Entrar"
    Então devo ver a mensagem "Credenciais inválidas"
    E devo permanecer na página de login

  Cenário: Validação de campos obrigatórios
    Dado que estou na página de login
    Quando clico em "Entrar" sem preencher os campos
    Então devo ver as mensagens de erro:
      | campo | mensagem              |
      | Email | E-mail é obrigatório  |
      | Senha | Senha é obrigatória   |

  Cenário: Validação de formato de email
    Dado que estou na página de login
    Quando preencho um email inválido "email_invalido"
    E clico em "Entrar"
    Então devo ver a mensagem "E-mail inválido"

  Cenário: Proteção de rotas administrativas
    Dado que não estou autenticado
    Quando tento acessar o dashboard diretamente
    Então devo ser redirecionado para a página de login

  Cenário: Logout do sistema
    Dado que estou autenticado como administrador
    Quando clico em "Sair"
    Então devo ser redirecionado para a página de login
    E minha sessão deve ser encerrada

  Cenário: Redirecionamento após login
    Dado que tentei acessar o dashboard sem estar autenticado
    E fui redirecionado para o login
    Quando faço login com credenciais válidas
    Então devo ser redirecionado para o dashboard

  Cenário: Persistência de sessão
    Dado que fiz login com sucesso
    Quando recarrego a página
    Então devo continuar autenticado
    E devo permanecer no dashboard