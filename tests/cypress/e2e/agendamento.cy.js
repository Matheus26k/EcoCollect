describe('Agendamento de Coleta', () => {
  beforeEach(() => {
    // Interceptar chamadas da API
    cy.intercept('GET', '/api/agendamentos/materiais/tipos', {
      fixture: 'materialTypes.json'
    }).as('getMaterialTypes');
  });

  it('deve permitir criar um agendamento com sucesso', () => {
    cy.visit('/');
    
    // Verificar se a página carregou
    cy.contains('Agende sua Coleta de Recicláveis').should('be.visible');
    
    // Aguardar carregamento dos tipos de materiais
    cy.wait('@getMaterialTypes');
    
    // Preencher formulário
    cy.get('input[name="nomeCompleto"]').type('João Silva Teste E2E');
    cy.get('input[name="endereco"]').type('Rua das Flores, 123');
    cy.get('input[name="numero"]').type('123');
    cy.get('input[name="bairro"]').type('Centro');
    cy.get('input[name="cidade"]').type('São Paulo');
    cy.get('input[name="telefone"]').type('(11) 99999-9999');
    cy.get('input[name="email"]').type('joao.teste@email.com');
    
    // Selecionar data futura (5 dias a partir de hoje)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    const dateString = futureDate.toISOString().split('T')[0];
    cy.get('input[name="dataSugerida"]').type(dateString);
    
    // Selecionar materiais
    cy.get('input[type="checkbox"]').first().check();
    cy.get('input[type="checkbox"]').eq(1).check();
    
    // Interceptar criação do agendamento
    cy.intercept('POST', '/api/agendamentos', {
      statusCode: 201,
      body: {
        id: 'test-id',
        protocolo: 'COL-123456-TEST',
        nomeCompleto: 'João Silva Teste E2E',
        status: 'Pendente'
      }
    }).as('createAgendamento');
    
    // Submeter formulário
    cy.get('button[type="submit"]').click();
    
    // Verificar chamada da API
    cy.wait('@createAgendamento').then((interception) => {
      expect(interception.request.body).to.include({
        nomeCompleto: 'João Silva Teste E2E',
        endereco: 'Rua das Flores, 123',
        telefone: '(11) 99999-9999'
      });
    });
    
    // Verificar tela de sucesso
    cy.contains('Agendamento Criado com Sucesso!').should('be.visible');
    cy.contains('COL-123456-TEST').should('be.visible');
    
    // Verificar botão para novo agendamento
    cy.contains('Fazer Novo Agendamento').should('be.visible').click();
    
    // Deve voltar ao formulário
    cy.contains('Agende sua Coleta de Recicláveis').should('be.visible');
  });

  it('deve validar campos obrigatórios', () => {
    cy.visit('/');
    
    // Tentar submeter formulário vazio
    cy.get('button[type="submit"]').click();
    
    // Verificar mensagens de erro
    cy.contains('Nome é obrigatório').should('be.visible');
    cy.contains('Endereço é obrigatório').should('be.visible');
    cy.contains('Número é obrigatório').should('be.visible');
    cy.contains('Bairro é obrigatório').should('be.visible');
    cy.contains('Cidade é obrigatória').should('be.visible');
    cy.contains('Telefone é obrigatório').should('be.visible');
  });

  it('deve validar formato do telefone', () => {
    cy.visit('/');
    
    // Inserir telefone com formato inválido
    cy.get('input[name="telefone"]').type('123456789');
    cy.get('button[type="submit"]').click();
    
    // Verificar mensagem de erro
    cy.contains('Formato: (11) 99999-9999').should('be.visible');
  });

  it('deve validar data mínima', () => {
    cy.visit('/');
    
    // Selecionar data de hoje (inválida)
    const today = new Date().toISOString().split('T')[0];
    cy.get('input[name="dataSugerida"]').type(today);
    
    // Preencher outros campos obrigatórios
    cy.get('input[name="nomeCompleto"]').type('Teste');
    cy.get('input[name="endereco"]').type('Rua Teste');
    cy.get('input[name="numero"]').type('123');
    cy.get('input[name="bairro"]').type('Bairro');
    cy.get('input[name="cidade"]').type('Cidade');
    cy.get('input[name="telefone"]').type('(11) 99999-9999');
    
    // Aguardar materiais e selecionar um
    cy.wait('@getMaterialTypes');
    cy.get('input[type="checkbox"]').first().check();
    
    // Interceptar erro da API
    cy.intercept('POST', '/api/agendamentos', {
      statusCode: 400,
      body: {
        error: 'Data deve ser pelo menos 2 dias úteis após hoje'
      }
    }).as('createAgendamentoError');
    
    cy.get('button[type="submit"]').click();
    
    // Verificar que a API foi chamada e retornou erro
    cy.wait('@createAgendamentoError');
  });

  it('deve exibir informações sobre como funciona', () => {
    cy.visit('/');
    
    // Verificar seção "Como Funciona"
    cy.contains('Como Funciona').should('be.visible');
    cy.contains('1. Agende').should('be.visible');
    cy.contains('2. Confirmação').should('be.visible');
    cy.contains('3. Coleta').should('be.visible');
    
    // Verificar seção "Materiais Aceitos"
    cy.contains('Materiais Aceitos').should('be.visible');
  });

  it('deve ser responsivo em dispositivos móveis', () => {
    // Testar em viewport mobile
    cy.viewport('iphone-x');
    cy.visit('/');
    
    // Verificar se elementos principais estão visíveis
    cy.contains('Agende sua Coleta de Recicláveis').should('be.visible');
    cy.get('input[name="nomeCompleto"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
    
    // Verificar se formulário funciona em mobile
    cy.get('input[name="nomeCompleto"]').type('Teste Mobile');
    cy.get('input[name="nomeCompleto"]').should('have.value', 'Teste Mobile');
  });
});