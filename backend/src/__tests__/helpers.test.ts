import { generateProtocol, isBusinessDay, addBusinessDays } from '../utils/helpers';

describe('Helpers', () => {
  describe('generateProtocol', () => {
    it('deve gerar protocolo com formato correto', () => {
      const protocol = generateProtocol();
      
      expect(protocol).toMatch(/^COL-\d{6}-[A-Z0-9]{6}$/);
    });

    it('deve gerar protocolos únicos', () => {
      const protocol1 = generateProtocol();
      const protocol2 = generateProtocol();
      
      expect(protocol1).not.toBe(protocol2);
    });
  });

  describe('isBusinessDay', () => {
    it('deve retornar true para segunda-feira', () => {
      // Segunda-feira, 6 de janeiro de 2025
      const monday = new Date(2025, 0, 6);
      expect(isBusinessDay(monday)).toBe(true);
    });

    it('deve retornar true para sexta-feira', () => {
      // Sexta-feira, 10 de janeiro de 2025
      const friday = new Date(2025, 0, 10);
      expect(isBusinessDay(friday)).toBe(true);
    });

    it('deve retornar false para sábado', () => {
      // Sábado, 11 de janeiro de 2025
      const saturday = new Date(2025, 0, 11);
      expect(isBusinessDay(saturday)).toBe(false);
    });

    it('deve retornar false para domingo', () => {
      // Domingo, 12 de janeiro de 2025
      const sunday = new Date(2025, 0, 12);
      expect(isBusinessDay(sunday)).toBe(false);
    });
  });

  describe('addBusinessDays', () => {
    it('deve adicionar 2 dias úteis corretamente', () => {
      // Começando numa segunda-feira
      const monday = new Date(2025, 0, 6); // 6 de janeiro de 2025
      const result = addBusinessDays(monday, 2);
      
      // Deve resultar numa quarta-feira
      const wednesday = new Date(2025, 0, 8);
      expect(result.getDate()).toBe(wednesday.getDate());
    });

    it('deve pular fins de semana ao adicionar dias úteis', () => {
      // Começando numa sexta-feira
      const friday = new Date(2025, 0, 10); // 10 de janeiro de 2025
      const result = addBusinessDays(friday, 2);
      
      // Deve resultar numa terça-feira (pulando sábado e domingo)
      const tuesday = new Date(2025, 0, 14);
      expect(result.getDate()).toBe(tuesday.getDate());
    });

    it('deve adicionar 1 dia útil corretamente', () => {
      // Começando numa quinta-feira
      const thursday = new Date(2025, 0, 9); // 9 de janeiro de 2025
      const result = addBusinessDays(thursday, 1);
      
      // Deve resultar numa sexta-feira
      const friday = new Date(2025, 0, 10);
      expect(result.getDate()).toBe(friday.getDate());
    });
  });
});