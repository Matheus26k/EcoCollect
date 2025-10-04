describe('Detalhes do Agendamento', () => {
  beforeEach(() => {
    // Interceptar login
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        token: 'fake-jwt-token',
        user: { id: 'admin-id', email: 'admin@coletas.com', name: 'Admin' }
      }
    }).as('login');

    // Interceptar detalhes do agendamento
    cy.intercept('GET', '/api/agendamentos/1', {
      fixture: 'agendamentoDetalhes.json'
    }).as('getAgendamentoDetalhes');
  });

  it('deve exibir detalhes completos do agendamento', () => {
    cy.login();
    cy.visit('/agendamento/1');
    
    cy.wait('@getAgendamentoDetalhes');
    
    // Verificar informações básicas
    cy.contains('COL-123456-ABC').should('be.visible');
    cy.contains('João Silva').should('be.visible');
    cy.contains('(11) 99999-9999').should('be.visible');
    cy.contains('joao@email.com').should('be.visible');
    
    // Verificar endereço
    cy.contains('Rua das Flores, 123').should('be.visible');
    cy.contains('Centro').should('be.visible');
    cy.contains('São Paulo').should('be.visible');
    
    // Verificar materiais
    cy.contains('Papel').should('be.visible');
    cy.contains('Plástico').should('be.visible');
    
    // Verificar status
    cy.contains('Pendente').should('be.visible');
  });

  it('deve permitir atualizar status', () => {
    cy.login();
    cy.visit('/agendamento/1');
    
    cy.wait('@getAgendamentoDetalhes');
    
    // Interceptar atualização de status
    cy.intercept('PATCH', '/api/agendamentos/1/status', {
      statusCode: 200,
      body: {
        id: '1',
        status: 'Agendado',
        observacoes: 'Agendado para manhã'
      }
    }).as('updateStatus');
    
    // Clicar em editar
    cy.contains('Editar').click();
    
    // Alterar status
    cy.get('select').select('Agendado');
    cy.get('textarea').type('Agendado para manhã');
    
    // Salvar
    cy.contains('Salvar').click();
    
    cy.wait('@updateStatus');
    
    // Verificar sucesso
    cy.contains('Status atualizado com sucesso!').should('be.visible');
  });

  it('deve validar observações obrigatórias para status Concluído', () => {
    cy.login();
    cy.visit('/agendamento/1');
    
    cy.wait('@getAgendamentoDetalhes');
    
    // Editar status
    cy.contains('Editar').click();
    cy.get('select').select('Concluído');
    
    // Tentar salvar sem observações
    cy.contains('Salvar').click();
    
    // Verificar erro
    cy.contains('Observações são obrigatórias').should('be.visible');
  });

  it('deve voltar ao dashboard', () => {
    cy.login();
    cy.visit('/agendamento/1');
    
    cy.wait('@getAgendamentoDetalhes');
    
    // Clicar em voltar
    cy.contains('Voltar ao Dashboard').click();
    
    // Verificar redirecionamento
    cy.url().should('include', '/dashboard');
  });
});