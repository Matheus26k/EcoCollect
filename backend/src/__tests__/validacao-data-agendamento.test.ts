import { addBusinessDays } from '../utils/helpers';

describe('Validação de Data de Agendamento', () => {
  it('deve exigir pelo menos 2 dias úteis de antecedência', () => {
    const hoje = new Date();
    const amanha = new Date();
    amanha.setDate(hoje.getDate() + 1);
    
    const dataMinima = addBusinessDays(hoje, 2);
    
    // Data de amanhã deve ser menor que a mínima exigida
    expect(amanha.getTime()).toBeLessThan(dataMinima.getTime());
    
    // Data com 3 dias úteis deve ser aceita
    const dataValida = addBusinessDays(hoje, 3);
    expect(dataValida.getTime()).toBeGreaterThan(dataMinima.getTime());
  });
});