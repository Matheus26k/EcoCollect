export interface MaterialType {
  id: string;
  name: string;
  description?: string;
  category: string;
}

export interface Agendamento {
  id: string;
  protocolo: string;
  nomeCompleto: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  telefone: string;
  email?: string;
  dataSugerida: string;
  status: 'Pendente' | 'Agendado' | 'Concluído' | 'Cancelado';
  observacoes?: string;
  dataAtualizacao: string;
  createdAt: string;
  materiais: {
    material: MaterialType;
  }[];
}

export interface CreateAgendamentoData {
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

export interface UpdateStatusData {
  status: string;
  observacoes?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ListFilters {
  status?: string;
  dataInicio?: string;
  dataFim?: string;
}