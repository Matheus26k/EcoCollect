# Plano de Testes - Sistema de Coletas Recicláveis

## 1. Introdução

Este documento define a estratégia de testes para o Sistema de Coletas Recicláveis, estabelecendo prioridades, metodologias e cronograma para garantir a qualidade e confiabilidade da aplicação.

## 2. Objetivos

- Garantir que todos os requisitos funcionais e não funcionais sejam atendidos
- Identificar e corrigir defeitos antes da produção
- Validar a experiência do usuário em diferentes cenários
- Assegurar a segurança e performance da aplicação

## 3. Escopo dos Testes

### 3.1 Funcionalidades Incluídas
- ✅ Agendamento de coleta (cidadão)
- ✅ Autenticação de usuários
- ✅ Listagem de agendamentos (admin)
- ✅ Detalhamento de agendamentos (admin)
- ✅ Atualização de status (admin)
- ✅ Validações de formulários
- ✅ Responsividade

### 3.2 Funcionalidades Excluídas
- Gerenciamento de tipos de materiais (diferencial não implementado)
- Notificações por email/SMS
- Relatórios avançados

## 4. Estratégia de Testes

### 4.1 Pirâmide de Testes

```
    /\
   /  \     E2E (20%)
  /____\    
 /      \   Integration (30%)
/________\  
          \  Unit (50%)
```

### 4.2 Tipos de Testes

#### 4.2.1 Testes Unitários (50%)
- **Objetivo**: Validar regras de negócio e funções isoladas
- **Ferramentas**: Jest (Backend), React Testing Library (Frontend)
- **Cobertura Mínima**: 80%

#### 4.2.2 Testes de Integração (30%)
- **Objetivo**: Validar comunicação entre componentes
- **Ferramentas**: Supertest (API), React Query (Frontend)
- **Foco**: Endpoints da API, fluxos de dados

#### 4.2.3 Testes E2E (20%)
- **Objetivo**: Validar fluxos completos do usuário
- **Ferramentas**: Cypress
- **Foco**: Jornadas críticas do usuário

## 5. Priorização de Testes

### 5.1 Prioridade 1 - CRÍTICA (Semana 1)

**Impacto**: Alto | **Risco**: Alto | **Frequência de Uso**: Alta

#### Testes Unitários
- [x] Validação de data mínima para agendamento
- [x] Geração de protocolo único
- [x] Validação de dias úteis
- [x] Regras de status (observações obrigatórias)
- [x] Autenticação JWT

#### Testes de API
- [x] POST /api/agendamentos (criação)
- [x] POST /api/auth/login
- [x] GET /api/agendamentos (listagem com auth)
- [x] PATCH /api/agendamentos/:id/status

#### Testes E2E
- [x] Fluxo completo de agendamento
- [x] Login e acesso ao dashboard
- [x] Visualização de detalhes do agendamento

### 5.2 Prioridade 2 - ALTA (Semana 2)

**Impacto**: Alto | **Risco**: Médio | **Frequência de Uso**: Média

#### Testes Unitários
- [x] Validações de formulário (formato telefone, email)
- [x] Helpers de data e protocolo
- [x] Filtros de agendamentos

#### Testes de API
- [x] Validações de entrada (400 errors)
- [x] Autorização (401/403 errors)
- [x] GET /api/agendamentos/materiais/tipos

#### Testes E2E
- [x] Filtros no dashboard
- [x] Atualização de status
- [x] Validações de formulário
- [x] Responsividade básica

### 5.3 Prioridade 3 - MÉDIA (Semana 3)

**Impacto**: Médio | **Risco**: Baixo | **Frequência de Uso**: Baixa

#### Testes de Performance
- [ ] Tempo de resposta da API (< 500ms)
- [ ] Carregamento da página (< 3s)
- [ ] Teste de carga (100 usuários simultâneos)

#### Testes de Segurança
- [x] Proteção de rotas administrativas
- [x] Sanitização de inputs
- [ ] Teste de SQL Injection
- [ ] Teste de XSS

#### Testes de Usabilidade
- [x] Navegação intuitiva
- [x] Mensagens de erro claras
- [ ] Acessibilidade (WCAG 2.1)

## 6. Ambientes de Teste

### 6.1 Desenvolvimento
- **URL**: http://localhost:3000
- **Banco**: PostgreSQL local
- **Dados**: Seed com dados de teste

### 6.2 Homologação
- **URL**: https://coletas-homolog.exemplo.com
- **Banco**: PostgreSQL (ambiente isolado)
- **Dados**: Dados similares à produção (anonimizados)

### 6.3 Produção
- **Testes**: Apenas smoke tests
- **Monitoramento**: Health checks automáticos

## 7. Critérios de Aceite

### 7.1 Cobertura de Código
- **Backend**: Mínimo 80%
- **Frontend**: Mínimo 70%
- **Regras de Negócio**: 100%

### 7.2 Performance
- **Tempo de Resposta API**: < 500ms (95% das requisições)
- **Carregamento Inicial**: < 3 segundos
- **Disponibilidade**: > 99%

### 7.3 Funcional
- **Todos os cenários críticos**: 100% passando
- **Cenários de alta prioridade**: 100% passando
- **Cenários de média prioridade**: 95% passando

## 8. Cronograma de Execução

### Semana 1 - Testes Críticos
- **Dias 1-2**: Testes unitários (regras de negócio)
- **Dias 3-4**: Testes de API (endpoints críticos)
- **Dia 5**: Testes E2E (fluxos principais)

### Semana 2 - Testes de Alta Prioridade
- **Dias 1-2**: Testes de validação e segurança
- **Dias 3-4**: Testes E2E (cenários secundários)
- **Dia 5**: Testes de responsividade

### Semana 3 - Testes de Média Prioridade
- **Dias 1-2**: Testes de performance
- **Dias 3-4**: Testes de usabilidade
- **Dia 5**: Documentação e relatórios

## 9. Ferramentas e Tecnologias

### 9.1 Automação de Testes
- **Jest**: Testes unitários (Backend/Frontend)
- **Cypress**: Testes E2E
- **Supertest**: Testes de API
- **React Testing Library**: Testes de componentes

### 9.2 Relatórios e Métricas
- **Jest Coverage**: Cobertura de código
- **Cypress Dashboard**: Resultados E2E
- **GitHub Actions**: CI/CD e execução automática

### 9.3 Dados de Teste
- **Fixtures**: Dados estáticos para testes
- **Factories**: Geração dinâmica de dados
- **Mocks**: Simulação de serviços externos

## 10. Riscos e Mitigações

### 10.1 Riscos Identificados

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Dados de teste inconsistentes | Média | Alto | Usar factories e seeds padronizados |
| Testes E2E instáveis | Alta | Médio | Implementar retry e waits adequados |
| Baixa cobertura de código | Baixa | Alto | Code review obrigatório com cobertura |
| Ambiente de teste indisponível | Baixa | Alto | Backup de ambiente local |

### 10.2 Plano de Contingência
- **Falha em ambiente**: Execução local com Docker
- **Testes instáveis**: Análise de logs e retry automático
- **Prazo apertado**: Priorização rigorosa dos testes críticos

## 11. Métricas e KPIs

### 11.1 Métricas de Qualidade
- **Defeitos por funcionalidade**: < 2
- **Taxa de regressão**: < 5%
- **Tempo médio de correção**: < 4 horas

### 11.2 Métricas de Processo
- **Tempo de execução dos testes**: < 15 minutos
- **Taxa de automação**: > 90%
- **Frequência de execução**: A cada commit

## 12. Entregáveis

### 12.1 Documentação
- [x] Plano de testes (este documento)
- [x] Especificações Gherkin
- [x] Casos de teste automatizados
- [ ] Relatório de execução
- [ ] Relatório de cobertura

### 12.2 Artefatos de Teste
- [x] Suite de testes unitários
- [x] Suite de testes de API
- [x] Suite de testes E2E
- [x] Dados de teste (fixtures/seeds)

## 13. Aprovação e Revisão

### 13.1 Critérios de Aprovação
- Todos os testes críticos passando
- Cobertura mínima atingida
- Performance dentro dos limites
- Documentação completa

### 13.2 Responsáveis
- **Desenvolvimento**: Implementação dos testes
- **QA**: Revisão e validação
- **Product Owner**: Aprovação dos critérios
- **DevOps**: Configuração de CI/CD

---

**Versão**: 1.0  
**Data**: Janeiro 2024  
**Próxima Revisão**: Fevereiro 2024