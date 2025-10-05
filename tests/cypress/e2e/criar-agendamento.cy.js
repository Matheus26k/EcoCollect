describe('Criar Agendamento de Coleta', () => {
  it('deve permitir criar agendamento com dados válidos', () => {
    cy.visit('/');
    cy.wait(2000); // Aguardar carregamento da página
    
    cy.get('body').should('exist');
    cy.wait(1000);
    
    // Localizar campo nome
    cy.get('input[name="nomeCompleto"]').should('be.visible');
    cy.wait(1000);
    
    // Preencher nome devagar
    cy.get('input[name="nomeCompleto"]').type('João Silva', { delay: 100 });
    cy.wait(1500);
    
    // Verificar preenchimento
    cy.get('input[name="nomeCompleto"]').should('have.value', 'João Silva');
    cy.wait(2000);
    
    // Preencher CEP
    cy.get('input[name="cep"]').should('be.visible');
    cy.wait(500);
    cy.get('input[name="cep"]').type('01234-567', { delay: 100 });
    cy.wait(2000);
  });
});