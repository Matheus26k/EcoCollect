import { generateProtocol } from '../utils/helpers';

describe('Geração de Protocolo de Agendamento', () => {
  it('deve gerar protocolo único no formato COL-XXXXXX-XXXXXX', () => {
    const protocolo1 = generateProtocol();
    const protocolo2 = generateProtocol();
    
    const formatoEsperado = /^COL-\d{6}-[A-Z0-9]{6}$/;
    
    expect(protocolo1).toMatch(formatoEsperado);
    expect(protocolo2).toMatch(formatoEsperado);
    expect(protocolo1).not.toBe(protocolo2);
  });
});