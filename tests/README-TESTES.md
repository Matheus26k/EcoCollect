# Testes E2E - EcoCollect

## 🚀 Pré-requisitos

**IMPORTANTE**: Os serviços devem estar rodando antes de executar os testes E2E:

### 1. Iniciar Backend
```bash
cd backend
npm run dev
```

### 2. Iniciar Frontend
```bash
cd frontend  
npm start
```

### 3. Verificar se serviços estão rodando
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## 🧪 Executar Testes



### Executar todos os testes E2E
```bash
cd tests
npm run cypress:run
```

### Abrir interface do Cypress
```bash
cd tests
npm run cypress:open
```

## 📋 Testes Disponíveis

1. **criar-agendamento.cy.js** - Testa criação de agendamento de coleta
2. **validacao-formulario.cy.js** - Testa validação de campos do formulário
3. **navegacao-sistema.cy.js** - Testa navegação entre páginas do sistema

## 🐛 Solução de Problemas

### Erro: "cy.visit() failed trying to load"
- Verifique se o frontend está rodando em http://localhost:3000
- Execute `npm start` na pasta frontend

### Testes falham imediatamente
- Verifique se ambos os serviços (frontend e backend) estão rodando
- Execute primeiro o teste de verificação do servidor

### Timeouts
- Os testes têm timeout de 10 segundos
- Se a máquina estiver lenta, aumente os timeouts no cypress.config.js