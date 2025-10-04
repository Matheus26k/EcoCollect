# Plano de Testes - EcoCollect

## 📋 Visão Geral

Este documento descreve o plano de testes para o sistema EcoCollect, incluindo casos de teste para funcionalidades principais e bugs conhecidos.

## 🎯 Objetivos

- Validar funcionalidades principais do sistema
- Documentar bugs conhecidos para reprodução
- Garantir qualidade das funcionalidades críticas

## 🧪 Tipos de Teste

### Testes Funcionais
- Agendamento de coletas
- Autenticação de usuários
- Consulta de protocolos
- Dashboard administrativo

### Testes de Usabilidade
- Validação de formulários
- Feedback visual
- Experiência do usuário

### Testes de Bugs Conhecidos
- Reprodução de bugs documentados
- Validação de comportamentos incorretos

## 📝 Casos de Teste

### CT001 - Agendamento Básico
**Objetivo**: Validar criação de agendamento com dados válidos
**Passos**:
1. Acessar página inicial
2. Preencher todos os campos obrigatórios
3. Selecionar materiais
4. Clicar em "Agendar Coleta"

**Resultado Esperado**: Agendamento criado com sucesso e protocolo gerado

### CT002 - Bug de Data Passada
**Objetivo**: Reproduzir bug de seleção de data passada
**Passos**:
1. Acessar formulário de agendamento
2. Selecionar data de ontem
3. Preencher outros campos
4. Clicar em "Agendar"

**Resultado Esperado**: Erro apenas após envio (bug conhecido)

### CT003 - Bug de Validação de Nome
**Objetivo**: Reproduzir bug de nome com apenas números
**Passos**:
1. Acessar formulário de agendamento
2. Digitar apenas números no campo nome (ex: "123456")
3. Preencher outros campos válidos
4. Clicar em "Agendar"

**Resultado Esperado**: Sistema aceita nome inválido (bug conhecido)

### CT004 - Bug de Feedback CEP
**Objetivo**: Reproduzir bug de falta de feedback visual no CEP
**Passos**:
1. Acessar formulário de agendamento
2. Digitar CEP inválido (ex: "12345-999")
3. Aguardar busca

**Resultado Esperado**: Campos são limpos sem feedback visual adequado (bug conhecido)

### CT005 - Login Administrativo
**Objetivo**: Validar acesso à área administrativa
**Passos**:
1. Acessar /login
2. Inserir token: E3c0A2d0m2i5n9X7
3. Fazer login com credenciais reveladas

**Resultado Esperado**: Acesso ao dashboard administrativo

### CT006 - Consulta de Protocolo
**Objetivo**: Validar consulta de agendamento por protocolo
**Passos**:
1. Acessar /consulta
2. Inserir protocolo válido
3. Clicar em "Consultar"

**Resultado Esperado**: Dados do agendamento exibidos

## 🐛 Bugs Documentados

### Bug #001 - Data no Frontend
- **Status**: Conhecido
- **Impacto**: Médio
- **Reproduzível**: Sim

### Bug #002 - Validação de Nome
- **Status**: Conhecido
- **Impacto**: Baixo
- **Reproduzível**: Sim

### Bug #003 - Feedback Visual no CEP
- **Status**: Conhecido
- **Impacto**: Baixo
- **Reproduzível**: Sim

## 📊 Cobertura de Testes

### Testes Automatizados
- **Unitários**: 3+ testes com regras de negócio
- **API**: Testes de endpoints principais
- **E2E**: Fluxos críticos com Cypress

### Testes Manuais
- Validação de bugs conhecidos
- Testes de usabilidade
- Testes exploratórios

## 🔄 Execução dos Testes

### Testes Unitários
```bash
cd backend
npm test
```

### Testes de API
```bash
cd backend
npm run test:api
```

### Testes E2E
```bash
cd tests
npm run cypress:run
```

### Testes Manuais
Seguir casos de teste documentados neste plano

## 📈 Relatórios

- Bugs são documentados no README.md
- Resultados de testes automatizados via CI/CD
- Testes manuais documentados neste plano

## 🎯 Critérios de Aceitação

- Funcionalidades principais funcionando
- Bugs conhecidos documentados e reproduzíveis
- Cobertura de testes adequada
- Documentação atualizada