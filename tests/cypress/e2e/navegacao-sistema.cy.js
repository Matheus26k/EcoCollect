describe('Navegação do Sistema', () => {
  it('deve permitir navegar entre páginas principais', () => {
    cy.visit('/');
    cy.wait(2000); // Aguardar carregamento
    
    cy.get('body').should('exist');
    cy.wait(1000);
    
    // Localizar link de consulta
    cy.contains('Consultar').should('be.visible');
    cy.wait(1500);
    
    // Clicar no link
    cy.contains('Consultar').click();
    cy.wait(2000);
    
    // Verificar navegação
    cy.url().should('include', '/consulta');
    cy.wait(1500);
    
    // Voltar para home
    cy.visit('/');
    cy.wait(2000);
    
    // Testar link administrativo
    cy.contains('Administrativa').should('be.visible');
    cy.wait(1000);
    cy.contains('Administrativa').click();
    cy.wait(2000);
  });
});