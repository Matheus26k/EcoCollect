import { generateProtocol, isBusinessDay, addBusinessDays } from '../utils/helpers';

describe('Funções Auxiliares - Testes Simples', () => {
  
  // Teste da geração de protocolo
  describe('generateProtocol', () => {
    it('deve gerar protocolo no formato correto', () => {
      const protocolo = generateProtocol();
      
      // Protocolo deve ter formato: COL-123456-ABC123
      expect(protocolo).toMatch(/^COL-\d{6}-[A-Z0-9]{6}$/);
    });

    it('deve gerar protocolos diferentes', () => {
      const protocolo1 = generateProtocol();
      const protocolo2 = generateProtocol();
      
      // Dois protocolos não podem ser iguais
      expect(protocolo1).not.toBe(protocolo2);
    });
  });

  // Teste de dia útil
  describe('isBusinessDay', () => {
    it('segunda-feira é dia útil', () => {
      const segunda = new Date(2025, 9, 6); // 6 de outubro de 2025 (segunda)
      expect(isBusinessDay(segunda)).toBe(true);
    });

    it('sexta-feira é dia útil', () => {
      const sexta = new Date(2025, 9, 10); // 10 de outubro de 2025 (sexta)
      expect(isBusinessDay(sexta)).toBe(true);
    });

    it('sábado não é dia útil', () => {
      const sabado = new Date(2025, 9, 11); // 11 de outubro de 2025 (sábado)
      expect(isBusinessDay(sabado)).toBe(false);
    });

    it('domingo não é dia útil', () => {
      const domingo = new Date(2025, 9, 12); // 12 de outubro de 2025 (domingo)
      expect(isBusinessDay(domingo)).toBe(false);
    });
  });

  // Teste de adicionar dias úteis
  describe('addBusinessDays', () => {
    it('deve adicionar 2 dias úteis corretamente', () => {
      // Começar numa segunda-feira
      const segunda = new Date(2025, 9, 6); // 6 de outubro
      const resultado = addBusinessDays(segunda, 2);
      
      // Deve dar quarta-feira (8 de outubro)
      expect(resultado.getDate()).toBe(8);
    });

    it('deve pular fim de semana', () => {
      // Começar numa sexta-feira
      const sexta = new Date(2025, 9, 10); // 10 de outubro
      const resultado = addBusinessDays(sexta, 2);
      
      // Deve dar terça-feira (14 de outubro) - pula sábado e domingo
      expect(resultado.getDate()).toBe(14);
    });
  });
});