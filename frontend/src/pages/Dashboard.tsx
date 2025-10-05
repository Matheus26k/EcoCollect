import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Search, Filter, Eye, Calendar, User, MapPin, Trash2, Clock, CheckCircle, XCircle, AlertCircle, RefreshCw, ChevronUp, ChevronDown } from 'lucide-react';
import { agendamentoService } from '../services/agendamentoService';
import { Agendamento, ListFilters } from '../types';

const statusColors = {
  Pendente: 'bg-yellow-100 text-yellow-800',
  Agendado: 'bg-blue-100 text-blue-800',
  Concluído: 'bg-green-100 text-green-800',
  Cancelado: 'bg-red-100 text-red-800',
};

export default function Dashboard() {
  const [filters, setFilters] = useState<ListFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showTable, setShowTable] = useState(true);

  const REFRESH_INTERVAL_MS = 30000;
  
  const { data: agendamentos = [], isLoading, refetch } = useQuery<Agendamento[]>(
    ['agendamentos', filters],
    () => agendamentoService.list(filters),
    {
      refetchInterval: REFRESH_INTERVAL_MS,
    }
  );

  const handleFilterChange = (newFilters: Partial<ListFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const deleteMutation = useMutation(agendamentoService.delete, {
    onSuccess: () => {
      toast.success('Agendamento excluído com sucesso!');
      refetch();
    },
    onError: () => {
      toast.error('Erro ao excluir agendamento');
    },
  });

  const handleDelete = (id: string, protocolo: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o agendamento ${protocolo}?`)) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard - Agendamentos
        </h1>
        <p className="text-gray-600">
          Gerencie todos os agendamentos de coleta de materiais recicláveis
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border-2 border-gray-200 hover:border-primary-200 transition-colors mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Filtros de Busca</h2>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors duration-200"
            >
              <Filter className="h-4 w-4 mr-2" />
              <span>{showFilters ? 'Ocultar' : 'Mostrar'} Filtros</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status do Agendamento
                </label>
                <select
                  value={filters.status || ''}
                  onChange={(e) => handleFilterChange({ status: e.target.value || undefined })}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-400 transition-colors"
                >
                  <option value="">Todos os status</option>
                  <option value="Pendente">Pendente</option>
                  <option value="Agendado">Agendado</option>
                  <option value="Concluído">Concluído</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Início
                </label>
                <input
                  type="date"
                  value={filters.dataInicio || ''}
                  onChange={(e) => handleFilterChange({ dataInicio: e.target.value || undefined })}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Fim
                </label>
                <input
                  type="date"
                  value={filters.dataFim || ''}
                  onChange={(e) => handleFilterChange({ dataFim: e.target.value || undefined })}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-400 transition-colors"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 font-medium border-2 border-gray-200 hover:border-gray-300"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {[
          { status: 'Pendente', icon: Clock, color: 'bg-yellow-100 text-yellow-600', borderColor: 'border-yellow-200 hover:border-yellow-300' },
          { status: 'Agendado', icon: Calendar, color: 'bg-blue-100 text-blue-600', borderColor: 'border-blue-200 hover:border-blue-300' },
          { status: 'Concluído', icon: CheckCircle, color: 'bg-green-100 text-green-600', borderColor: 'border-green-200 hover:border-green-300' },
          { status: 'Cancelado', icon: XCircle, color: 'bg-red-100 text-red-600', borderColor: 'border-red-200 hover:border-red-300' }
        ].map(({ status, icon: Icon, color, borderColor }) => {
          const count = agendamentos.filter(a => a.status === status).length;
          return (
            <div key={status} className={`card hover:shadow-md transition-all border-2 ${borderColor}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{status}</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
                <div className={`p-3 rounded-full ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Total */}
        <div className="card hover:shadow-md transition-all border-2 border-primary-200 hover:border-primary-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-600">Total</p>
              <p className="text-2xl font-bold text-primary-700">{agendamentos.length}</p>
            </div>
            <div className="p-3 rounded-full bg-primary-100 text-primary-600">
              <Calendar className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Agendamentos */}
      <div className="card border-2 border-gray-200 hover:border-primary-200 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Agendamentos
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {agendamentos.length} {agendamentos.length === 1 ? 'agendamento encontrado' : 'agendamentos encontrados'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowTable(!showTable)}
              className="btn-secondary flex items-center space-x-2"
            >
              {showTable ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              <span>{showTable ? 'Recolher' : 'Expandir'}</span>
            </button>
            <button
              onClick={() => refetch()}
              disabled={isLoading}
              className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Atualizar</span>
            </button>
          </div>
        </div>

        {showTable && (
          agendamentos.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg text-gray-500 mb-2">Nenhum agendamento encontrado</p>
              <p className="text-sm text-gray-400">Tente ajustar os filtros ou aguarde novos agendamentos</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">
                    Protocolo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">
                    Cidadão
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">
                    Datas
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">
                    Materiais
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {agendamentos.map((agendamento) => (
                  <tr key={agendamento.id} className="hover:bg-gray-50 transition-all duration-200 border-b border-gray-100">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm font-mono font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded inline-block">
                        {agendamento.protocolo}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {agendamento.nomeCompleto}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {agendamento.bairro}, {agendamento.cidade}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900 font-medium">
                          Coleta: {format(new Date(agendamento.dataSugerida), 'dd/MM/yyyy', { locale: ptBR })}
                        </div>
                        <div className="text-xs text-gray-500">
                          Criado: {format(new Date(agendamento.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-1">
                        {agendamento.materiais.slice(0, 2).map(m => (
                          <span key={m.material.id} className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">
                            {m.material.name}
                          </span>
                        ))}
                        {agendamento.materiais.length > 2 && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-200 text-gray-600 rounded-md">
                            +{agendamento.materiais.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full ${
                        statusColors[agendamento.status as keyof typeof statusColors]
                      }`}>
                        {agendamento.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-3">
                        <Link
                          to={`/agendamento/${agendamento.id}`}
                          className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 hover:bg-primary-100 rounded-lg transition-all duration-200 hover:shadow-sm"
                          title="Ver detalhes do agendamento"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">Detalhes</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(agendamento.id, agendamento.protocolo)}
                          disabled={deleteMutation.isLoading}
                          className="inline-flex items-center px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Excluir agendamento"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          <span className="text-sm font-medium">Excluir</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}