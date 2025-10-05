import { addBusinessDays } from '../utils/helpers';

describe('Validação de Data de Agendamento', () => {
  it('deve exigir pelo menos 2 dias úteis de antecedência', () => {
    const hoje = new Date();
    const amanha = new Date();
    amanha.setDate(hoje.getDate() + 1);
    
    const DIAS_UTEIS_MINIMOS = 2;
    const DIAS_UTEIS_VALIDOS = 3;
    
    const dataMinima = addBusinessDays(hoje, DIAS_UTEIS_MINIMOS);
    const dataValida = addBusinessDays(hoje, DIAS_UTEIS_VALIDOS);
    
    expect(amanha.getTime()).toBeLessThan(dataMinima.getTime());
    expect(dataValida.getTime()).toBeGreaterThan(dataMinima.getTime());
  });
});