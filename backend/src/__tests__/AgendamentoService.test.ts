import { AgendamentoService } from '../services/AgendamentoService';
import { AgendamentoRepository } from '../repositories/AgendamentoRepository';

// Mock do repository
jest.mock('../repositories/AgendamentoRepository');

describe('AgendamentoService', () => {
  let agendamentoService: AgendamentoService;
  let mockRepository: jest.Mocked<AgendamentoRepository>;

  beforeEach(() => {
    agendamentoService = new AgendamentoService();
    mockRepository = new AgendamentoRepository() as jest.Mocked<AgendamentoRepository>;
  });

  describe('create', () => {
    it('deve criar agendamento com data válida', async () => {
      // Arrange
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5); // 5 dias no futuro
      
      const agendamentoData = {
        nomeCompleto: 'João Silva',
        endereco: 'Rua das Flores, 123',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        telefone: '(11) 99999-9999',
        dataSugerida: futureDate.toISOString(),
        materiais: ['material-id-1']
      };

      const expectedResult = {
        id: 'agendamento-id',
        protocolo: 'COL-123456-ABC123',
        ...agendamentoData,
        status: 'Pendente'
      };

      mockRepository.create = jest.fn().mockResolvedValue(expectedResult);

      // Act
      const result = await agendamentoService.create(agendamentoData);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          nomeCompleto: agendamentoData.nomeCompleto,
          protocolo: expect.any(String)
        })
      );
    });

    it('deve rejeitar agendamento com data muito próxima', async () => {
      // Arrange
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1); // Apenas 1 dia no futuro
      
      const agendamentoData = {
        nomeCompleto: 'João Silva',
        endereco: 'Rua das Flores, 123',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        telefone: '(11) 99999-9999',
        dataSugerida: tomorrow.toISOString(),
        materiais: ['material-id-1']
      };

      // Act & Assert
      await expect(agendamentoService.create(agendamentoData))
        .rejects
        .toThrow('Data deve ser pelo menos 2 dias úteis após hoje');
    });

    it('deve rejeitar agendamento com data no passado', async () => {
      // Arrange
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1); // 1 dia no passado
      
      const agendamentoData = {
        nomeCompleto: 'João Silva',
        endereco: 'Rua das Flores, 123',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        telefone: '(11) 99999-9999',
        dataSugerida: pastDate.toISOString(),
        materiais: ['material-id-1']
      };

      // Act & Assert
      await expect(agendamentoService.create(agendamentoData))
        .rejects
        .toThrow('Data deve ser pelo menos 2 dias úteis após hoje');
    });
  });

  describe('updateStatus', () => {
    it('deve atualizar status para Agendado sem observações', async () => {
      // Arrange
      const agendamentoId = 'agendamento-id';
      const updateData = { status: 'Agendado' };
      const expectedResult = { id: agendamentoId, status: 'Agendado' };

      mockRepository.updateStatus = jest.fn().mockResolvedValue(expectedResult);

      // Act
      const result = await agendamentoService.updateStatus(agendamentoId, updateData);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockRepository.updateStatus).toHaveBeenCalledWith(agendamentoId, updateData);
    });

    it('deve exigir observações para status Concluído', async () => {
      // Arrange
      const agendamentoId = 'agendamento-id';
      const updateData = { status: 'Concluído' };

      // Act & Assert
      await expect(agendamentoService.updateStatus(agendamentoId, updateData))
        .rejects
        .toThrow('Observações são obrigatórias para status Concluído ou Cancelado');
    });

    it('deve exigir observações para status Cancelado', async () => {
      // Arrange
      const agendamentoId = 'agendamento-id';
      const updateData = { status: 'Cancelado' };

      // Act & Assert
      await expect(agendamentoService.updateStatus(agendamentoId, updateData))
        .rejects
        .toThrow('Observações são obrigatórias para status Concluído ou Cancelado');
    });

    it('deve permitir status Concluído com observações', async () => {
      // Arrange
      const agendamentoId = 'agendamento-id';
      const updateData = { 
        status: 'Concluído', 
        observacoes: 'Coleta realizada com sucesso' 
      };
      const expectedResult = { 
        id: agendamentoId, 
        status: 'Concluído',
        observacoes: 'Coleta realizada com sucesso'
      };

      mockRepository.updateStatus = jest.fn().mockResolvedValue(expectedResult);

      // Act
      const result = await agendamentoService.updateStatus(agendamentoId, updateData);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockRepository.updateStatus).toHaveBeenCalledWith(agendamentoId, updateData);
    });
  });
});