import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateAgendamentoData {
  protocolo: string;
  nomeCompleto: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  telefone: string;
  email?: string;
  dataSugerida: Date;
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

export class AgendamentoRepository {
  async create(data: CreateAgendamentoData) {
    const { materiais, ...agendamentoData } = data;

    return await prisma.agendamento.create({
      data: {
        ...agendamentoData,
        materiais: {
          create: materiais.map(materialId => ({
            materialId
          }))
        }
      },
      include: {
        materiais: {
          include: {
            material: true
          }
        }
      }
    });
  }

  async findMany(filters: ListFilters) {
    const where: any = {
      deletedAt: null
    };

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.dataInicio || filters.dataFim) {
      where.dataSugerida = {};
      if (filters.dataInicio) {
        where.dataSugerida.gte = new Date(filters.dataInicio);
      }
      if (filters.dataFim) {
        where.dataSugerida.lte = new Date(filters.dataFim);
      }
    }

    return await prisma.agendamento.findMany({
      where,
      include: {
        materiais: {
          include: {
            material: true
          }
        }
      },
      orderBy: {
        dataSugerida: 'asc'
      }
    });
  }

  async findById(id: string) {
    return await prisma.agendamento.findFirst({
      where: { 
        id,
        deletedAt: null
      },
      include: {
        materiais: {
          include: {
            material: true
          }
        }
      }
    });
  }

  async updateStatus(id: string, data: UpdateStatusData) {
    return await prisma.agendamento.update({
      where: { id },
      data: {
        ...data,
        dataAtualizacao: new Date()
      },
      include: {
        materiais: {
          include: {
            material: true
          }
        }
      }
    });
  }

  async findByProtocolo(protocolo: string) {
    return await prisma.agendamento.findFirst({
      where: { 
        protocolo,
        deletedAt: null
      },
      include: {
        materiais: {
          include: {
            material: true
          }
        }
      }
    });
  }

  async softDelete(id: string) {
    return await prisma.agendamento.update({
      where: { id },
      data: {
        deletedAt: new Date()
      }
    });
  }
}