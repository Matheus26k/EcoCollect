import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Recycle,
  Clock,
  Edit3,
  Save,
  X
} from 'lucide-react';
import { agendamentoService } from '../services/agendamentoService';
import { Agendamento, UpdateStatusData } from '../types';

const statusColors = {
  Pendente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Agendado: 'bg-blue-100 text-blue-800 border-blue-200',
  Concluído: 'bg-green-100 text-green-800 border-green-200',
  Cancelado: 'bg-red-100 text-red-800 border-red-200',
};

export default function AgendamentoDetalhes() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<UpdateStatusData>();

  const { data: agendamento, isLoading } = useQuery<Agendamento>(
    ['agendamento', id],
    () => agendamentoService.getById(id!),
    {
      enabled: !!id,
    }
  );

  const updateStatusMutation = useMutation(
    (data: UpdateStatusData) => agendamentoService.updateStatus(id!, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['agendamento', id]);
        queryClient.invalidateQueries(['agendamentos']);
        setIsEditing(false);
        reset();
        toast.success('Status atualizado com sucesso!');
      },
      onError: () => {
        toast.error('Erro ao atualizar status');
      },
    }
  );

  const onSubmit = (data: UpdateStatusData) => {
    updateStatusMutation.mutate(data);
  };

  const handleEdit = () => {
    setIsEditing(true);
    reset({
      status: agendamento?.status,
      observacoes: agendamento?.observacoes || '',
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  const selectedStatus = watch('status');
  const requiresObservations = ['Concluído', 'Cancelado'].includes(selectedStatus);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!agendamento) {
    return (
      <div className="px-4 sm:px-0">
        <div className="text-center py-8">
          <p className="text-gray-500">Agendamento não encontrado</p>
          <Link to="/dashboard" className="btn-primary mt-4">
            Voltar ao Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao Dashboard</span>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Detalhes do Agendamento
              </h1>
              <p className="text-gray-600 font-mono text-lg">
                Protocolo: {agendamento.protocolo}
              </p>
            </div>
            
            <div className={`px-4 py-2 rounded-lg border ${
              statusColors[agendamento.status as keyof typeof statusColors]
            }`}>
              <span className="font-semibold">{agendamento.status}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações do Cidadão */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Informações do Cidadão
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                  <p className="mt-1 text-sm text-gray-900">{agendamento.nomeCompleto}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Telefone</label>
                  <p className="mt-1 text-sm text-gray-900 flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    {agendamento.telefone}
                  </p>
                </div>
                
                {agendamento.email && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">E-mail</label>
                    <p className="mt-1 text-sm text-gray-900 flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {agendamento.email}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Endereço */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Endereço da Coleta
              </h2>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-900">
                  <strong>Endereço:</strong> {agendamento.endereco}, {agendamento.numero}
                </p>
                <p className="text-sm text-gray-900">
                  <strong>Bairro:</strong> {agendamento.bairro}
                </p>
                <p className="text-sm text-gray-900">
                  <strong>Cidade:</strong> {agendamento.cidade}
                </p>
              </div>
            </div>

            {/* Materiais */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Recycle className="h-5 w-5 mr-2" />
                Materiais para Coleta
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {agendamento.materiais.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <Recycle className="h-4 w-4 text-primary-600" />
                    <div>
                      <p className="font-medium text-gray-900">{item.material.name}</p>
                      {item.material.description && (
                        <p className="text-sm text-gray-600">{item.material.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informações da Coleta */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Informações da Coleta
              </h2>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Data Sugerida</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {format(new Date(agendamento.dataSugerida), 'dd/MM/yyyy', { locale: ptBR })}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Data de Criação</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {format(new Date(agendamento.createdAt), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Última Atualização</label>
                  <p className="mt-1 text-sm text-gray-900 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {format(new Date(agendamento.dataAtualizacao), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </p>
                </div>
              </div>
            </div>

            {/* Atualizar Status */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Status</h2>
                {!isEditing && (
                  <button
                    onClick={handleEdit}
                    className="btn-secondary flex items-center space-x-1"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Editar</span>
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Novo Status
                    </label>
                    <select
                      {...register('status', { required: 'Status é obrigatório' })}
                      className="input-field"
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Agendado">Agendado</option>
                      <option value="Concluído">Concluído</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                    {errors.status && (
                      <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Observações {requiresObservations && '*'}
                    </label>
                    <textarea
                      {...register('observacoes', {
                        required: requiresObservations ? 'Observações são obrigatórias para este status' : false
                      })}
                      rows={3}
                      className="input-field"
                      placeholder="Adicione observações sobre a coleta..."
                    />
                    {errors.observacoes && (
                      <p className="text-red-500 text-sm mt-1">{errors.observacoes.message}</p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      disabled={updateStatusMutation.isLoading}
                      className="btn-primary flex items-center space-x-1 flex-1"
                    >
                      <Save className="h-4 w-4" />
                      <span>{updateStatusMutation.isLoading ? 'Salvando...' : 'Salvar'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn-secondary flex items-center space-x-1"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancelar</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className={`p-3 rounded-lg border ${
                    statusColors[agendamento.status as keyof typeof statusColors]
                  }`}>
                    <p className="font-semibold">{agendamento.status}</p>
                  </div>
                  
                  {agendamento.observacoes && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Observações
                      </label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">
                        {agendamento.observacoes}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}