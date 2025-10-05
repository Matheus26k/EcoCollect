describe('Navegação do Sistema', () => {
  const TEMPO_CARREGAMENTO = 2000;
  const TEMPO_INTERACAO = 1000;
  const TEMPO_NAVEGACAO = 1500;
  
  it('deve permitir navegar entre páginas principais', () => {
    cy.visit('/');
    cy.wait(TEMPO_CARREGAMENTO);
    
    cy.get('body').should('exist');
    cy.wait(TEMPO_INTERACAO);
    
    cy.contains('Consultar').should('be.visible');
    cy.wait(TEMPO_NAVEGACAO);
    
    cy.contains('Consultar').click();
    cy.wait(TEMPO_CARREGAMENTO);
    
    cy.url().should('include', '/consulta');
    cy.wait(TEMPO_NAVEGACAO);
    
    cy.visit('/');
    cy.wait(TEMPO_CARREGAMENTO);
    
    cy.contains('Administrativa').should('be.visible');
    cy.wait(TEMPO_INTERACAO);
    cy.contains('Administrativa').click();
    cy.wait(TEMPO_CARREGAMENTO);
  });
});