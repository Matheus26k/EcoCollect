# Relatório de Bugs - EcoCollect

## 📊 Resumo Executivo

Este relatório documenta os bugs identificados no sistema EcoCollect durante o desenvolvimento e testes.

**Total de Bugs**: 3
- **Alta Prioridade**: 0
- **Média Prioridade**: 1
- **Baixa Prioridade**: 2

## 🐛 Bugs Identificados

### Bug #001 - Data no Frontend
**ID**: BUG-001  
**Título**: Usuário pode selecionar data passada no calendário  
**Prioridade**: Média  
**Status**: Aberto  
**Descoberto em**: 2024-01-15  

**Descrição**:
O campo de data no formulário de agendamento permite que o usuário selecione datas passadas, mas a validação só ocorre no backend após o envio do formulário.

**Passos para Reproduzir**:
1. Acessar a página inicial (/)
2. Preencher o formulário de agendamento
3. No campo "Data Sugerida", selecionar uma data anterior à atual
4. Clicar em "Agendar Coleta"

**Resultado Atual**:
- Usuário consegue selecionar qualquer data no calendário
- Erro só aparece após envio do formulário
- Mensagem de erro genérica do backend

**Resultado Esperado**:
- Calendário deve bloquear datas passadas
- Validação visual imediata
- Feedback claro para o usuário

**Impacto**:
- Experiência do usuário prejudicada
- Frustração ao receber erro após preenchimento completo
- Possível confusão sobre datas válidas

**Solução Proposta**:
Adicionar atributo `min` no input de data com valor dinâmico (data atual + 2 dias úteis)

**Arquivos Afetados**:
- `frontend/src/pages/Home.tsx`

---

### Bug #002 - Validação de Nome
**ID**: BUG-002  
**Título**: Campo nome aceita apenas números ou caracteres especiais  
**Prioridade**: Baixa  
**Status**: Aberto  
**Descoberto em**: 2024-01-15  

**Descrição**:
O campo "Nome Completo" no formulário de agendamento aceita entradas que contêm apenas números ou caracteres especiais, sem validar se há pelo menos algumas letras.

**Passos para Reproduzir**:
1. Acessar a página inicial (/)
2. No campo "Nome Completo", digitar apenas números (ex: "123456")
3. Preencher os demais campos obrigatórios corretamente
4. Clicar em "Agendar Coleta"

**Resultado Atual**:
- Sistema aceita nomes como "123456", "!@#$%", "999"
- Agendamento é criado normalmente
- Nenhuma validação de formato de nome

**Resultado Esperado**:
- Validação deve exigir pelo menos algumas letras
- Rejeitar nomes compostos apenas por números/símbolos
- Feedback imediato ao usuário

**Impacto**:
- Dados inconsistentes no banco
- Dificuldade para contato posterior
- Qualidade dos dados comprometida

**Solução Proposta**:
Adicionar validação regex que exija pelo menos 2 letras no nome

**Arquivos Afetados**:
- `frontend/src/pages/Home.tsx`

---

### Bug #003 - Feedback Visual no CEP
**ID**: BUG-003  
**Título**: Não há indicação visual clara quando CEP é inválido  
**Prioridade**: Baixa  
**Status**: Aberto  
**Descoberto em**: 2024-01-15  

**Descrição**:
Quando um CEP inválido é digitado, o sistema apenas limpa os campos de endereço sem fornecer feedback visual adequado sobre o erro.

**Passos para Reproduzir**:
1. Acessar a página inicial (/)
2. No campo "CEP", digitar um CEP inválido (ex: "12345-999")
3. Aguardar a busca automática
4. Observar comportamento

**Resultado Atual**:
- Campos de endereço são limpos silenciosamente
- Nenhuma indicação visual de erro
- Usuário pode não perceber que o CEP é inválido

**Resultado Esperado**:
- Borda vermelha no campo CEP
- Ícone de erro visível
- Mensagem clara sobre CEP inválido
- Toast notification informando o erro

**Impacto**:
- Confusão do usuário
- Possível frustração
- Experiência de uso prejudicada

**Solução Proposta**:
- Restaurar toast de erro para CEP inválido
- Adicionar classe CSS de erro no campo
- Incluir ícone visual de erro

**Arquivos Afetados**:
- `frontend/src/pages/Home.tsx`

## 📈 Análise de Tendências

### Por Prioridade
- **Média**: 33% (1 bug)
- **Baixa**: 67% (2 bugs)

### Por Componente
- **Frontend**: 100% (3 bugs)
- **Backend**: 0% (0 bugs)

### Por Categoria
- **Validação**: 67% (2 bugs)
- **UX/UI**: 33% (1 bug)

## 🎯 Recomendações

1. **Priorizar Bug #001**: Impacta diretamente a experiência do usuário
2. **Implementar validações mais robustas**: Melhorar validação de formulários
3. **Padronizar feedback visual**: Criar componentes reutilizáveis para erros
4. **Testes automatizados**: Adicionar testes para cenários de erro

## 📝 Notas

- Todos os bugs são reproduzíveis consistentemente
- Nenhum bug compromete a segurança do sistema
- Bugs foram mantidos intencionalmente para demonstração
- Correções são simples e de baixo risco

## 📅 Histórico de Atualizações

- **2024-01-15**: Relatório inicial com 3 bugs identificados