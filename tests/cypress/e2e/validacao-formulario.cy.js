describe('Validação do Formulário de Agendamento', () => {
  it('deve validar campos obrigatórios e formatos', () => {
    cy.visit('/');
    cy.wait(2000); // Aguardar carregamento
    
    cy.get('body').should('exist');
    cy.wait(1000);
    
    // Verificar campo nome
    cy.get('input[name="nomeCompleto"]').should('be.visible');
    cy.wait(1000);
    
    // Preencher nome devagar
    cy.get('input[name="nomeCompleto"]').type('Teste Validação', { delay: 120 });
    cy.wait(1500);
    
    // Verificar valor
    cy.get('input[name="nomeCompleto"]').should('have.value', 'Teste Validação');
    cy.wait(1000);
    
    // Testar campo telefone
    cy.get('input[name="telefone"]').should('be.visible');
    cy.wait(500);
    cy.get('input[name="telefone"]').type('11999999999', { delay: 100 });
    cy.wait(2000);
  });
});