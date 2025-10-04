describe('Dashboard Administrativo', () => {
  beforeEach(() => {
    // Interceptar chamadas da API
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        token: 'fake-jwt-token',
        user: {
          id: 'admin-id',
          email: 'admin@coletas.com',
          name: 'Administrador'
        }
      }
    }).as('login');

    cy.intercept('GET', '/api/agendamentos', {
      fixture: 'agendamentos.json'
    }).as('getAgendamentos');
  });

  it('deve fazer login e acessar dashboard', () => {
    cy.visit('/login');
    
    // Verificar página de login
    cy.contains('Área Administrativa').should('be.visible');
    
    // Fazer login
    cy.get('input[type="email"]').type('admin@coletas.com');
    cy.get('input[type="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    // Verificar redirecionamento
    cy.wait('@login');
    cy.url().should('include', '/dashboard');
    
    // Verificar carregamento do dashboard
    cy.wait('@getAgendamentos');
    cy.contains('Dashboard - Agendamentos').should('be.visible');
  });

  it('deve exibir lista de agendamentos', () => {
    // Fazer login primeiro
    cy.login();
    
    // Verificar elementos do dashboard
    cy.contains('Dashboard - Agendamentos').should('be.visible');
    cy.contains('Filtros').should('be.visible');
    
    // Verificar estatísticas
    cy.get('[data-testid="stats"]').should('exist');
    
    // Verificar tabela de agendamentos
    cy.get('table').should('be.visible');
    cy.contains('Protocolo').should('be.visible');
    cy.contains('Cidadão').should('be.visible');
    cy.contains('Data Coleta').should('be.visible');
    cy.contains('Status').should('be.visible');
  });

  it('deve filtrar agendamentos por status', () => {
    cy.login();
    
    // Mostrar filtros
    cy.contains('Mostrar Filtros').click();
    
    // Filtrar por status "Pendente"
    cy.get('select').first().select('Pendente');
    
    // Interceptar nova chamada com filtro
    cy.intercept('GET', '/api/agendamentos?status=Pendente', {
      body: [
        {
          id: '1',
          protocolo: 'COL-123456-ABC',
          nomeCompleto: 'João Silva',
          status: 'Pendente',
          dataSugerida: '2024-01-15T00:00:00.000Z',
          materiais: [{ material: { name: 'Papel' } }]
        }
      ]
    }).as('getAgendamentosFiltrados');
    
    cy.wait('@getAgendamentosFiltrados');
    
    // Verificar que apenas agendamentos pendentes são exibidos
    cy.get('table tbody tr').should('have.length', 1);
    cy.contains('Pendente').should('be.visible');
  });

  it('deve filtrar agendamentos por data', () => {
    cy.login();
    
    // Mostrar filtros
    cy.contains('Mostrar Filtros').click();
    
    // Definir filtro de data
    cy.get('input[type="date"]').first().type('2024-01-01');
    cy.get('input[type="date"]').last().type('2024-01-31');
    
    // Interceptar chamada com filtro de data
    cy.intercept('GET', '/api/agendamentos?dataInicio=2024-01-01&dataFim=2024-01-31', {
      fixture: 'agendamentosFiltrados.json'
    }).as('getAgendamentosPorData');
    
    cy.wait('@getAgendamentosPorData');
  });

  it('deve limpar filtros', () => {
    cy.login();
    
    // Mostrar filtros
    cy.contains('Mostrar Filtros').click();
    
    // Aplicar filtros
    cy.get('select').first().select('Pendente');
    cy.get('input[type="date"]').first().type('2024-01-01');
    
    // Limpar filtros
    cy.contains('Limpar Filtros').click();
    
    // Verificar que filtros foram limpos
    cy.get('select').first().should('have.value', '');
    cy.get('input[type="date"]').first().should('have.value', '');
  });

  it('deve navegar para detalhes do agendamento', () => {
    cy.login();
    
    // Interceptar detalhes do agendamento
    cy.intercept('GET', '/api/agendamentos/1', {
      fixture: 'agendamentoDetalhes.json'
    }).as('getAgendamentoDetalhes');
    
    // Clicar em "Ver Detalhes"
    cy.contains('Ver Detalhes').first().click();
    
    // Verificar navegação
    cy.url().should('include', '/agendamento/');
    cy.wait('@getAgendamentoDetalhes');
  });

  it('deve atualizar lista automaticamente', () => {
    cy.login();
    
    // Aguardar primeira carga
    cy.wait('@getAgendamentos');
    
    // Interceptar próxima atualização automática
    cy.intercept('GET', '/api/agendamentos', {
      body: [
        {
          id: '2',
          protocolo: 'COL-789012-XYZ',
          nomeCompleto: 'Maria Santos',
          status: 'Agendado',
          dataSugerida: '2024-01-20T00:00:00.000Z',
          materiais: [{ material: { name: 'Plástico' } }]
        }
      ]
    }).as('getAgendamentosAtualizado');
    
    // Aguardar atualização automática (30 segundos)
    cy.wait('@getAgendamentosAtualizado', { timeout: 35000 });
    
    // Verificar novo conteúdo
    cy.contains('Maria Santos').should('be.visible');
  });

  it('deve fazer logout', () => {
    cy.login();
    
    // Clicar em logout
    cy.contains('Sair').click();
    
    // Verificar redirecionamento para login
    cy.url().should('include', '/login');
    cy.contains('Área Administrativa').should('be.visible');
  });

  it('deve proteger rotas sem autenticação', () => {
    // Tentar acessar dashboard sem login
    cy.visit('/dashboard');
    
    // Deve redirecionar para login
    cy.url().should('include', '/login');
    cy.contains('Área Administrativa').should('be.visible');
  });

  it('deve exibir estatísticas corretas', () => {
    cy.login();
    
    // Verificar cards de estatísticas
    cy.get('[data-testid="stats-pendente"]').should('contain', '2');
    cy.get('[data-testid="stats-agendado"]').should('contain', '1');
    cy.get('[data-testid="stats-concluido"]').should('contain', '1');
    cy.get('[data-testid="stats-cancelado"]').should('contain', '0');
  });

  it('deve ser responsivo em dispositivos móveis', () => {
    // Testar em viewport mobile
    cy.viewport('iphone-x');
    
    cy.login();
    
    // Verificar se elementos principais estão visíveis
    cy.contains('Dashboard - Agendamentos').should('be.visible');
    cy.contains('Filtros').should('be.visible');
    
    // Verificar se tabela é scrollável horizontalmente
    cy.get('table').should('be.visible');
    cy.get('.overflow-x-auto').should('exist');
  });
});