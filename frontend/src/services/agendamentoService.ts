import { api } from './api';
import { Agendamento, CreateAgendamentoData, UpdateStatusData, ListFilters, MaterialType } from '../types';

export const agendamentoService = {
  async create(data: CreateAgendamentoData): Promise<Agendamento> {
    const response = await api.post('/agendamentos', data);
    return response.data;
  },

  async list(filters?: ListFilters): Promise<Agendamento[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.dataInicio) params.append('dataInicio', filters.dataInicio);
    if (filters?.dataFim) params.append('dataFim', filters.dataFim);

    const response = await api.get(`/agendamentos?${params.toString()}`);
    return response.data;
  },

  async getById(id: string): Promise<Agendamento> {
    const response = await api.get(`/agendamentos/${id}`);
    return response.data;
  },

  async updateStatus(id: string, data: UpdateStatusData): Promise<Agendamento> {
    const response = await api.patch(`/agendamentos/${id}/status`, data);
    return response.data;
  },

  async getMaterialTypes(): Promise<MaterialType[]> {
    const response = await api.get('/agendamentos/materiais/tipos');
    return response.data;
  },

  async getByProtocolo(protocolo: string): Promise<Agendamento> {
    const response = await api.get(`/agendamentos/protocolo/${protocolo}`);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/agendamentos/${id}`);
  },
};