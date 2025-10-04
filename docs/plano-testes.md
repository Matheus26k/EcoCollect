# Plano de Testes - EcoCollect

## O que vamos testar

✅ **Funcionalidades principais**
- Criar agendamento de coleta
- Login do administrador
- Listar agendamentos
- Ver detalhes do agendamento
- Atualizar status da coleta
- Consultar por protocolo

## Tipos de Testes

### 1. Testes Unitários (Jest)
**Onde**: `backend/src/__tests__/`
**O que testa**: Funções básicas do sistema

- Validação de data (2 dias úteis)
- Geração de protocolo
- Formatação de telefone

### 2. Testes de API (Supertest)
**Onde**: `backend/src/__tests__/api/`
**O que testa**: Comunicação com o servidor

- Login funciona
- Criar agendamento funciona
- Listar agendamentos funciona

### 3. Testes E2E (Cypress)
**Onde**: `tests/cypress/`
**O que testa**: Sistema completo funcionando

- Usuário consegue agendar coleta
- Admin consegue fazer login
- Admin consegue ver agendamentos

## Como executar

```bash
# Testes do backend
cd backend
npm test

# Testes E2E
cd tests
npm run cypress:run
```

## Dados para teste

- **Protocolo exemplo**: ECO-2024-001
- **Materiais**: Papel, Plástico, Metal, Vidro
- **Admin**: Credenciais criadas durante o seed

## O que esperamos

- ✅ Todos os testes passam
- ✅ Sistema funciona no navegador
- ✅ Formulários validam dados
- ✅ Login funciona corretamente