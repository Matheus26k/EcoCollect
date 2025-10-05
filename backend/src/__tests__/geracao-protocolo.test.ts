import { generateProtocol } from '../utils/helpers';

describe('Geração de Protocolo de Agendamento', () => {
  it('deve gerar protocolo único no formato COL-XXXXXX-XXXXXX', () => {
    const protocolo1 = generateProtocol();
    const protocolo2 = generateProtocol();
    
    // Deve seguir o formato correto
    expect(protocolo1).toMatch(/^COL-\d{6}-[A-Z0-9]{6}$/);
    expect(protocolo2).toMatch(/^COL-\d{6}-[A-Z0-9]{6}$/);
    
    // Deve gerar protocolos únicos
    expect(protocolo1).not.toBe(protocolo2);
  });
});