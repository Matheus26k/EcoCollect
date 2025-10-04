import { AgendamentoRepository } from '../repositories/AgendamentoRepository';
import { EmailService } from './EmailService';
import { generateProtocol, isBusinessDay, addBusinessDays } from '../utils/helpers';

interface CreateAgendamentoData {
  nomeCompleto: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  telefone: string;
  email?: string;
  dataSugerida: string;
  materiais: string[];
}

interface ListFilters {
  status?: string;
  dataInicio?: string;
  dataFim?: string;
}

interface UpdateStatusData {
  status: string;
  observacoes?: string;
}

export class AgendamentoService {
  private agendamentoRepository = new AgendamentoRepository();
  private emailService = new EmailService();

  async create(data: CreateAgendamentoData) {
    const dataSugerida = new Date(data.dataSugerida);
    const hoje = new Date();
    const minimaData = addBusinessDays(hoje, 2);

    if (dataSugerida < minimaData) {
      throw new Error('Data deve ser pelo menos 2 dias úteis após hoje');
    }

    const protocolo = generateProtocol();

    const agendamento = await this.agendamentoRepository.create({
      ...data,
      protocolo,
      dataSugerida
    });

    // Enviar e-mail de confirmação se email foi fornecido
    if (data.email) {
      try {
        await this.emailService.sendAgendamentoConfirmation(agendamento);
      } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        // Não falha o agendamento se o e-mail não for enviado
      }
    }

    return agendamento;
  }

  async list(filters: ListFilters) {
    return await this.agendamentoRepository.findMany(filters);
  }

  async getById(id: string) {
    return await this.agendamentoRepository.findById(id);
  }

  async updateStatus(id: string, data: UpdateStatusData) {
    if (['Concluído', 'Cancelado'].includes(data.status) && !data.observacoes) {
      throw new Error('Observações são obrigatórias para status Concluído ou Cancelado');
    }

    return await this.agendamentoRepository.updateStatus(id, data);
  }

  async getByProtocolo(protocolo: string) {
    return await this.agendamentoRepository.findByProtocolo(protocolo);
  }
}