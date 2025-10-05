describe('Criar Agendamento de Coleta', () => {
  const TEMPO_CARREGAMENTO = 2000;
  const TEMPO_INTERACAO = 1000;
  const DELAY_DIGITACAO = 100;
  
  it('deve permitir criar agendamento com dados válidos', () => {
    cy.visit('/');
    cy.wait(TEMPO_CARREGAMENTO);
    
    cy.get('body').should('exist');
    cy.wait(TEMPO_INTERACAO);
    
    cy.get('input[name="nomeCompleto"]').should('be.visible');
    cy.wait(TEMPO_INTERACAO);
    
    cy.get('input[name="nomeCompleto"]').type('João Silva', { delay: DELAY_DIGITACAO });
    cy.wait(1500);
    
    cy.get('input[name="nomeCompleto"]').should('have.value', 'João Silva');
    cy.wait(TEMPO_CARREGAMENTO);
    
    cy.get('input[name="cep"]').should('be.visible');
    cy.wait(500);
    cy.get('input[name="cep"]').type('01234-567', { delay: DELAY_DIGITACAO });
    cy.wait(TEMPO_CARREGAMENTO);
  });
});