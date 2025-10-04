# language: pt

Funcionalidade: Autenticação de Usuários
  Como administrador
  Eu quero fazer login no sistema
  Para acessar a área administrativa

  Contexto:
    Dado que existe um usuário administrador:
      | email                  | senha    |
      | admin@ecocollect.com   | admin123 |

  Cenário: Login com credenciais válidas
    Dado que estou na página de login
    E insiro o token "E3c0A2d0m2i5n9X7" para ver as credenciais
    Quando preencho o email "admin@ecocollect.com"
    E preencho a senha "admin123"
    E clico em "Entrar"
    Então sou redirecionado para o dashboard
    E vejo "Login realizado com sucesso!"

  Cenário: Login com credenciais inválidas
    Dado que estou na página de login
    E insiro o token "E3c0A2d0m2i5n9X7" para ver as credenciais
    Quando preencho o email "admin@ecocollect.com"
    E preencho a senha "senha_errada"
    E clico em "Entrar"
    Então vejo "Credenciais inválidas"

  Cenário: Token inválido para ver credenciais
    Dado que estou na página de login
    Quando insiro o token "TOKEN_ERRADO"
    E clico em "Validar"
    Então vejo "Token inválido!"
    E as credenciais não aparecem

  Cenário: Proteção de rotas administrativas
    Dado que não estou autenticado
    Quando acesso o dashboard diretamente
    Então sou redirecionado para o login

  Cenário: Logout do sistema
    Dado que estou autenticado
    Quando clico em "Sair"
    Então sou redirecionado para o login