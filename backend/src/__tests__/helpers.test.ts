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
      // Segunda-feira, 1 de janeiro de 2024
      const monday = new Date(2024, 0, 1);
      expect(isBusinessDay(monday)).toBe(true);
    });

    it('deve retornar true para sexta-feira', () => {
      // Sexta-feira, 5 de janeiro de 2024
      const friday = new Date(2024, 0, 5);
      expect(isBusinessDay(friday)).toBe(true);
    });

    it('deve retornar false para sábado', () => {
      // Sábado, 6 de janeiro de 2024
      const saturday = new Date(2024, 0, 6);
      expect(isBusinessDay(saturday)).toBe(false);
    });

    it('deve retornar false para domingo', () => {
      // Domingo, 7 de janeiro de 2024
      const sunday = new Date(2024, 0, 7);
      expect(isBusinessDay(sunday)).toBe(false);
    });
  });

  describe('addBusinessDays', () => {
    it('deve adicionar 2 dias úteis corretamente', () => {
      // Começando numa segunda-feira
      const monday = new Date(2024, 0, 1); // 1 de janeiro de 2024
      const result = addBusinessDays(monday, 2);
      
      // Deve resultar numa quarta-feira
      const wednesday = new Date(2024, 0, 3);
      expect(result.getDate()).toBe(wednesday.getDate());
    });

    it('deve pular fins de semana ao adicionar dias úteis', () => {
      // Começando numa sexta-feira
      const friday = new Date(2024, 0, 5); // 5 de janeiro de 2024
      const result = addBusinessDays(friday, 2);
      
      // Deve resultar numa terça-feira (pulando sábado e domingo)
      const tuesday = new Date(2024, 0, 9);
      expect(result.getDate()).toBe(tuesday.getDate());
    });

    it('deve adicionar 1 dia útil corretamente', () => {
      // Começando numa quinta-feira
      const thursday = new Date(2024, 0, 4); // 4 de janeiro de 2024
      const result = addBusinessDays(thursday, 1);
      
      // Deve resultar numa sexta-feira
      const friday = new Date(2024, 0, 5);
      expect(result.getDate()).toBe(friday.getDate());
    });
  });
});