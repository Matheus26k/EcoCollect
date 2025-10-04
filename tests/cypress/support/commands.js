// Comandos customizados do Cypress para EcoCollect

// Comando para fazer login
Cypress.Commands.add('login', (email = 'admin@coletas.com', password = 'admin123') => {
  cy.visit('/login');
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
});

// Comando para criar agendamento
Cypress.Commands.add('createAgendamento', (agendamentoData) => {
  const defaultData = {
    nomeCompleto: 'João Silva Teste',
    endereco: 'Rua das Flores, 123',
    numero: '123',
    bairro: 'Centro',
    cidade: 'São Paulo',
    telefone: '(11) 99999-9999',
    email: 'joao@teste.com',
    ...agendamentoData
  };

  cy.visit('/');
  
  // Preencher formulário
  cy.get('input[name="nomeCompleto"]').type(defaultData.nomeCompleto);
  cy.get('input[name="endereco"]').type(defaultData.endereco);
  cy.get('input[name="numero"]').type(defaultData.numero);
  cy.get('input[name="bairro"]').type(defaultData.bairro);
  cy.get('input[name="cidade"]').type(defaultData.cidade);
  cy.get('input[name="telefone"]').type(defaultData.telefone);
  
  if (defaultData.email) {
    cy.get('input[name="email"]').type(defaultData.email);
  }

  // Selecionar data futura
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 5);
  const dateString = futureDate.toISOString().split('T')[0];
  cy.get('input[name="dataSugerida"]').type(dateString);

  // Selecionar pelo menos um material
  cy.get('input[type="checkbox"]').first().check();

  // Submeter
  cy.get('button[type="submit"]').click();
});

// Comando para aguardar carregamento
Cypress.Commands.add('waitForLoad', () => {
  cy.get('[data-testid="loading"]', { timeout: 10000 }).should('not.exist');
});

// Declarações TypeScript para os comandos customizados
declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>
      createAgendamento(agendamentoData?: any): Chainable<void>
      waitForLoad(): Chainable<void>
    }
  }
}