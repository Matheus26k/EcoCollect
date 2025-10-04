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

  it('deve criar agendamento quando data é válida', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5); // 5 dias no futuro
    
    const dadosAgendamento = {
      nomeCompleto: 'João Silva',
      endereco: 'Rua das Flores, 123',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      telefone: '(11) 99999-9999',
      dataSugerida: futureDate.toISOString(),
      materiais: ['material-id-1']
    };

    const resultadoEsperado = {
      id: 'agendamento-id',
      protocolo: 'COL-123456-ABC123',
      ...dadosAgendamento,
      status: 'Pendente'
    };

    mockRepository.create = jest.fn().mockResolvedValue(resultadoEsperado);

    const resultado = await agendamentoService.create(dadosAgendamento);
    expect(resultado).toEqual(resultadoEsperado);
    expect(mockRepository.create).toHaveBeenCalled();
  });

  it('deve rejeitar agendamento com data muito próxima', async () => {
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    
    const dadosAgendamento = {
      nomeCompleto: 'João Silva',
      endereco: 'Rua das Flores, 123',
      numero: '123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      telefone: '(11) 99999-9999',
      dataSugerida: amanha.toISOString(),
      materiais: ['material-id-1']
    };

    await expect(agendamentoService.create(dadosAgendamento))
      .rejects
      .toThrow('Data deve ser pelo menos 2 dias úteis após hoje');
  });

  it('deve atualizar status para Agendado', async () => {
    const agendamentoId = 'agendamento-id';
    const novoStatus = { status: 'Agendado' };
    const resultadoEsperado = { id: agendamentoId, status: 'Agendado' };

    mockRepository.updateStatus = jest.fn().mockResolvedValue(resultadoEsperado);

    const resultado = await agendamentoService.updateStatus(agendamentoId, novoStatus);

    expect(resultado).toEqual(resultadoEsperado);
    expect(mockRepository.updateStatus).toHaveBeenCalledWith(agendamentoId, novoStatus);
  });

  it('deve exigir observações para status Concluído', async () => {
    const agendamentoId = 'agendamento-id';
    const statusSemObservacao = { status: 'Concluído' };
    await expect(agendamentoService.updateStatus(agendamentoId, statusSemObservacao))
      .rejects
      .toThrow('Observações são obrigatórias para status Concluído ou Cancelado');
  });
});