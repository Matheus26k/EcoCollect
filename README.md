# EcoCollect - Coletas Sustentáveis

Plataforma moderna para agendamento de coletas de materiais recicláveis, conectando cidadãos conscientes com serviços de coleta sustentável.

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Banco de Dados**: SQLite (desenvolvimento)
- **Testes**: Jest (unitários), Cypress (E2E), Supertest (API)
- **Desenvolvimento**: Local com SQLite

## 📋 Funcionalidades

### Para Cidadãos (Sem Autenticação)
- ✅ Solicitar agendamento de coleta
- ✅ Receber número de protocolo
- ✅ Consultar status por protocolo
- ✅ Formatação automática de telefone

### Para Administradores (Com Autenticação)
- ✅ Login seguro
- ✅ Listar agendamentos com filtros
- ✅ Visualizar detalhes completos
- ✅ Atualizar status das coletas

## 🏗️ Estrutura do Projeto

```
├── frontend/          # Aplicação React com design moderno
├── backend/           # API Node.js/Express + SQLite
├── tests/            # Testes automatizados (Unit, API, E2E)
└── docs/             # Documentação técnica completa
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
npx prisma migrate dev --name init

# Executar seed (dados iniciais)
npm run seed
```

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
```bash
cd tests
npm install
npm run cypress:run
```

### Testes de API
```bash
cd backend
npm run test:api
```

## 📊 Cobertura de Testes

O projeto implementa uma estratégia abrangente de testes:

### Estratégia de Testes - Curto Prazo

**Prioridade 1 (Crítica)**
1. Testes unitários das regras de negócio principais
2. Testes de API para endpoints críticos (autenticação, CRUD agendamentos)
3. Testes E2E do fluxo principal (solicitar agendamento)

**Prioridade 2 (Alta)**
1. Testes de validação de formulários
2. Testes de autorização e segurança
3. Testes E2E do painel administrativo

**Prioridade 3 (Média)**
1. Testes de performance básicos
2. Testes de integração com banco de dados
3. Testes de responsividade

### Localização dos Arquivos de Teste
- **Plano de Testes**: `docs/plano-testes.md`
- **Especificações Gherkin**: `tests/features/`
- **Testes Unitários**: `backend/src/__tests__/` e `frontend/src/__tests__/`
- **Testes E2E**: `tests/cypress/`

## 🐛 Relatório de Bugs Identificados

### Bug #001 - Validação de Data no Frontend
**Descrição**: Durante teste manual, identificado que o campo de data permite seleção de datas passadas no frontend, mesmo com validação no backend.

**Passos para Reproduzir**:
1. Acessar formulário de agendamento
2. Selecionar data anterior à atual
3. Tentar submeter formulário

**Resultado Esperado**: Campo deve bloquear datas passadas
**Resultado Atual**: Permite seleção, erro só aparece após submissão

**Severidade**: Média
**Status**: Identificado
**Correção Sugerida**: Implementar validação client-side no componente DatePicker

## 📋 Status dos Requisitos

### Requisitos Funcionais Atendidos ✅
- RF001: Solicitar Agendamento de Coleta
- RF002: Autenticação de Usuários  
- RF003: Armazenar e Listar Agendamentos
- RF004: Detalhamento do Agendamento
- RF005: Atualizar Status da Coleta

### Requisitos Não Funcionais Atendidos ✅
- RQNF1: Linguagens OO (JavaScript/TypeScript + SQLite)
- RQNF2: 3+ testes unitários com regras de negócio
- RQNF3: Códigos HTTP apropriados
- RQNF4: Tratamento de erros no frontend
- RQNF5: Testes automatizados de API
- RQNF6: Testes E2E (Cypress)
- RQNF7: Documentação README
- RQNF8: Revisão de código manual
- RQNF9: Especificações Gherkin
- RQNF10: Plano de testes
- RQNF11: Relatório de bugs
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

## 🔒 Segurança Implementada

- Autenticação JWT
- Sanitização de inputs
- Validação de dados server-side
- Headers de segurança (CORS, Helmet)
- Proteção contra SQL Injection (Prisma ORM)

## 🚀 Melhorias Sugeridas

### Curto Prazo (1-2 sprints)
1. **Validação Client-side**: Melhorar validações em tempo real
2. **Loading States**: Adicionar indicadores de carregamento
3. **Error Boundaries**: Implementar tratamento global de erros React

### Médio Prazo (3-6 sprints)
1. **Cache Redis**: Implementar cache para consultas frequentes
2. **Logs Estruturados**: Sistema de logging com Winston
3. **Monitoramento**: Implementar health checks e métricas

### Longo Prazo (6+ sprints)
1. **Microserviços**: Separar domínios em serviços independentes
2. **Event Sourcing**: Implementar para auditoria completa
3. **PWA**: Transformar em Progressive Web App

## 👥 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

