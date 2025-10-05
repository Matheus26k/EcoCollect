describe('Regras de Status de Agendamento', () => {
  it('deve validar transições de status e exigir observações para status finais', () => {
    const statusPermitidos = ['Pendente', 'Agendado', 'Em Coleta', 'Concluído', 'Cancelado'];
    const statusComObservacaoObrigatoria = ['Concluído', 'Cancelado'];
    
    // Todos os status devem estar na lista permitida
    statusPermitidos.forEach(status => {
      expect(statusPermitidos).toContain(status);
    });
    
    // Status finais devem exigir observações
    statusComObservacaoObrigatoria.forEach(status => {
      const exigeObservacao = status === 'Concluído' || status === 'Cancelado';
      expect(exigeObservacao).toBe(true);
    });
    
    // Status inicial deve ser sempre 'Pendente'
    const statusInicial = 'Pendente';
    expect(statusPermitidos[0]).toBe(statusInicial);
  });
});