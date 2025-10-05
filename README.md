# EcoCollect - Sistema de Coletas Recicláveis

Sistema web para agendamento de coletas de materiais recicláveis.

## 🚀 Tecnologias

- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express
- **Banco**: SQLite
- **Testes**: Jest + Cypress

## 📋 Funcionalidades

### Para Cidadãos (Sem Autenticação)
- ✅ Solicitar agendamento de coleta
- ✅ Preenchimento automático via CEP
- ✅ Receber número de protocolo
- ✅ Consultar status por protocolo
- ✅ Formatação automática de telefone

### Para Administradores (Com Autenticação)
- ✅ Login seguro
- ✅ Listar agendamentos com filtros
- ✅ Visualizar detalhes completos
- ✅ Atualizar status das coletas

## 📁 Estrutura

```
├── frontend/     # React + TypeScript
├── backend/      # Node.js + Express + SQLite
├── tests/        # Testes Jest + Cypress
└── docs/         # Documentação
```

## 🔧 Configuração e Execução

### Pré-requisitos
- Node.js 18+
- npm

### Execução Local

**1. Instalar dependências do backend:**
```bash
cd backend
npm install
```

**2. Configurar banco de dados:**
```bash
# Executar migrations
npx prisma migrate dev

# Executar seed (dados iniciais e credenciais admin)
npm run seed
```

⚠️ **IMPORTANTE**: O seed criará o usuário administrador com credenciais padrão.

**3. Instalar dependências do frontend:**
```bash
cd ../frontend
npm install
```

**4. Iniciar os serviços (2 terminais):**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Acessar Aplicação
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Banco SQLite**: `backend/dev.db`

### Visualizar Banco de Dados

**Opção 1 - Prisma Studio (Recomendado):**
```bash
cd backend
npx prisma studio
```
Acesse: http://localhost:5555

**Opção 2 - SQLite Browser:**
- Baixe [DB Browser for SQLite](https://sqlitebrowser.org/)
- Abra o arquivo `backend/dev.db`

**Opção 3 - Linha de Comando:**
```bash
cd backend
sqlite3 dev.db
.tables
SELECT * FROM agendamentos;
```

### Acesso Administrativo
- **Token de acesso**: `E3c0A2d0m2i5n9X7`
- Digite o token na tela de login para revelar as credenciais

## 🧪 Testes

### Testes Unitários
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### Testes E2E

**IMPORTANTE**: Inicie os serviços antes dos testes E2E:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm start

# Terminal 3 - Testes E2E
cd tests
npm install
npm run cypress:run
```



**Vídeos e Screenshots:**
- Vídeos salvos em: `tests/cypress/videos/`
- Screenshots de falhas em: `tests/cypress/screenshots/`

## 📊 Testes Implementados

### Testes Unitários (Jest) - 3 testes
- ✅ Validação de data de agendamento (2 dias úteis)
- ✅ Geração de protocolo único
- ✅ Regras de status de agendamento
- **Localização**: `backend/src/__tests__/`

### Testes E2E (Cypress) - 3 testes
- ✅ Criar agendamento de coleta (`criar-agendamento.cy.js`)
- ✅ Validação do formulário (`validacao-formulario.cy.js`)
- ✅ Navegação do sistema (`navegacao-sistema.cy.js`)
- **Localização**: `tests/cypress/e2e/`

### Especificações Gherkin
- ✅ Cenários em português simples
- ✅ Casos de uso principais
- **Localização**: `tests/features/`

## 🐛 Problemas Encontrados

### Bug #001 - Data no Frontend
**O que acontece**: Usuário pode selecionar data passada no calendário

**Como reproduzir**:
1. Abrir formulário de agendamento
2. Selecionar data de ontem
3. Clicar em "Agendar"

**O que deveria acontecer**: Bloquear datas passadas no calendário
**O que acontece**: Só dá erro depois de enviar

**Como corrigir**: Configurar calendário para só mostrar datas futuras
**Prioridade**: Média

### Bug #002 - Validação de Nome
**O que acontece**: Campo nome aceita apenas números ou caracteres especiais

**Como reproduzir**:
1. Abrir formulário de agendamento
2. Digitar apenas números no campo nome (ex: "123456")
3. Preencher outros campos obrigatórios
4. Clicar em "Agendar"

**O que deveria acontecer**: Validar se o nome contém pelo menos algumas letras
**O que acontece**: Aceita nomes inválidos como "123" ou "@#$"

**Como corrigir**: Adicionar validação para garantir que o nome contenha letras
**Prioridade**: Baixa

### Bug #003 - Feedback Visual no CEP
**O que acontece**: Não há indicação visual clara quando CEP é inválido

**Como reproduzir**:
1. Abrir formulário de agendamento
2. Digitar CEP inválido (ex: "12345-999")
3. Aguardar busca

**O que deveria acontecer**: Mostrar indicação visual clara de CEP inválido
**O que acontece**: Apenas limpa os campos sem feedback visual adequado

**Como corrigir**: Adicionar borda vermelha ou ícone de erro no campo CEP
**Prioridade**: Baixa

## 📋 Status dos Requisitos

### Requisitos Funcionais Atendidos ✅
- RF001: Solicitar Agendamento de Coleta
- RF002: Autenticação de Usuários  
- RF003: Armazenar e Listar Agendamentos
- RF004: Detalhamento do Agendamento
- RF005: Atualizar Status da Coleta

### Requisitos Não Funcionais Atendidos ✅
- RQNF1: Linguagens OO (JavaScript/TypeScript + SQLite)
- RQNF2: 3 testes unitários com regras de negócio
- RQNF3: Códigos HTTP apropriados
- RQNF4: Tratamento de erros no frontend
- RQNF5: Testes automatizados de API
- RQNF6: Testes E2E (Cypress)
- RQNF7: Documentação README
- RQNF8: Revisão de código manual
- RQNF9: Especificações Gherkin
- RQNF10: Plano de testes (`docs/plano-de-testes.md`)
- RQNF11: Relatório de bugs (`docs/relatorio-bugs.md`)
- RQNF12: Requisitos não atendidos documentados
- RQNF14: Migrations de banco

### Requisitos Não Atendidos ⚠️

**RQNF13**: Relatório SonarQube (Diferencial)
- **Motivo**: Ferramenta não disponível no ambiente de desenvolvimento
- **Impacto**: Baixo - é um diferencial opcional
- **Alternativa**: Revisão manual de código implementada

**RQNF15**: Docker containers (Opcional)
- **Motivo**: Optou-se por desenvolvimento local com SQLite para simplicidade
- **Impacto**: Baixo - SQLite atende perfeitamente aos requisitos
- **Alternativa**: Execução local implementada

**RF006**: Gerenciar Tipos de Materiais (Diferencial)
- **Motivo**: Priorização de funcionalidades core obrigatórias
- **Impacto**: Baixo - tipos estão pré-definidos no sistema
- **Status**: Funcionalidade diferencial não implementada

## 🔒 Segurança

- Autenticação JWT
- Token de acesso para credenciais administrativas
- Credenciais protegidas na interface
- Senhas criptografadas com bcrypt
- Validação de dados
- Proteção CORS
- Sanitização de inputs

## 🚀 Melhorias Futuras

- Paginação na lista de agendamentos
- Busca por nome/protocolo
- Relatórios de coletas
- Notificações em tempo real

## 👥 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

