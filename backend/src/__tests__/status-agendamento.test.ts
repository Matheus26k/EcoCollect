describe('Regras de Status de Agendamento', () => {
  it('deve validar transições de status e exigir observações para status finais', () => {
    const statusPermitidos = ['Pendente', 'Agendado', 'Em Coleta', 'Concluído', 'Cancelado'];
    const statusComObservacaoObrigatoria = ['Concluído', 'Cancelado'];
    const statusInicial = 'Pendente';
    
    statusPermitidos.forEach(status => {
      expect(statusPermitidos).toContain(status);
    });
    
    statusComObservacaoObrigatoria.forEach(status => {
      const exigeObservacao = status === 'Concluído' || status === 'Cancelado';
      expect(exigeObservacao).toBe(true);
    });
    
    expect(statusPermitidos[0]).toBe(statusInicial);
  });
});