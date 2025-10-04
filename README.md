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
npx prisma migrate dev --name init

# Executar seed (dados iniciais e credenciais admin)
npm run seed
```

⚠️ **IMPORTANTE**: O seed gerará credenciais aleatórias para o administrador. Anote as credenciais exibidas no console!

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

## 📊 Testes Implementados

### Testes Unitários (Jest)
- ✅ Validação de data (2 dias úteis)
- ✅ Geração de protocolo
- ✅ Regras de status
- **Localização**: `backend/src/__tests__/`

### Testes de API (Supertest)
- ✅ Login de administrador
- ✅ Criar agendamento
- ✅ Listar agendamentos
- **Localização**: `backend/src/__tests__/api/`

### Testes E2E (Cypress)
- ✅ Fluxo completo de agendamento
- ✅ Dashboard administrativo
- ✅ Consulta por protocolo
- **Localização**: `tests/cypress/`

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

## 🔒 Segurança

- Autenticação JWT
- Token de acesso para credenciais administrativas
- Credenciais protegidas na interface
- Senhas criptografadas com bcrypt
- Validação de dados
- Proteção CORS
- Sanitização de inputs

## 🚀 Melhorias Futuras

- Validação em tempo real
- Indicadores de carregamento
- Notificações por email
- Relatórios de coletas

## 👥 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

