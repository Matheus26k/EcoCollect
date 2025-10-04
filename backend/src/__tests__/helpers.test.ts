import { generateProtocol, isBusinessDay, addBusinessDays } from '../utils/helpers';

describe('Helpers', () => {
  describe('generateProtocol', () => {
    it('deve gerar protocolo no formato correto', () => {
      const protocolo = generateProtocol();
      expect(protocolo).toMatch(/^COL-\d{6}-[A-Z0-9]{6}$/);
    });

    it('deve gerar protocolos diferentes', () => {
      const protocolo1 = generateProtocol();
      const protocolo2 = generateProtocol();
      expect(protocolo1).not.toBe(protocolo2);
    });
  });

  describe('isBusinessDay', () => {
    it('segunda-feira é dia útil', () => {
      const segunda = new Date(2025, 9, 6);
      expect(isBusinessDay(segunda)).toBe(true);
    });

    it('sexta-feira é dia útil', () => {
      const sexta = new Date(2025, 9, 10);
      expect(isBusinessDay(sexta)).toBe(true);
    });

    it('sábado não é dia útil', () => {
      const sabado = new Date(2025, 9, 11);
      expect(isBusinessDay(sabado)).toBe(false);
    });

    it('domingo não é dia útil', () => {
      const domingo = new Date(2025, 9, 12);
      expect(isBusinessDay(domingo)).toBe(false);
    });
  });

  describe('addBusinessDays', () => {
    it('deve adicionar 2 dias úteis corretamente', () => {
      const segunda = new Date(2025, 9, 6);
      const resultado = addBusinessDays(segunda, 2);
      expect(resultado.getDate()).toBe(8);
    });

    it('deve pular fim de semana', () => {
      const sexta = new Date(2025, 9, 10);
      const resultado = addBusinessDays(sexta, 2);
      expect(resultado.getDate()).toBe(14);
    });
  });
});