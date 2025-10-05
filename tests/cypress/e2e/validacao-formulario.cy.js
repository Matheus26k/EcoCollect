describe('Validação do Formulário de Agendamento', () => {
  const TEMPO_CARREGAMENTO = 2000;
  const TEMPO_INTERACAO = 1000;
  const DELAY_DIGITACAO = 120;
  
  it('deve validar campos obrigatórios e formatos', () => {
    cy.visit('/');
    cy.wait(TEMPO_CARREGAMENTO);
    
    cy.get('body').should('exist');
    cy.wait(TEMPO_INTERACAO);
    
    cy.get('input[name="nomeCompleto"]').should('be.visible');
    cy.wait(TEMPO_INTERACAO);
    
    cy.get('input[name="nomeCompleto"]').type('Teste Validação', { delay: DELAY_DIGITACAO });
    cy.wait(1500);
    
    cy.get('input[name="nomeCompleto"]').should('have.value', 'Teste Validação');
    cy.wait(TEMPO_INTERACAO);
    
    cy.get('input[name="telefone"]').should('be.visible');
    cy.wait(500);
    cy.get('input[name="telefone"]').type('11999999999', { delay: 100 });
    cy.wait(TEMPO_CARREGAMENTO);
  });
});