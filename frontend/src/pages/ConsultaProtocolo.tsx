import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Search, Calendar, MapPin, Recycle, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { agendamentoService } from '../services/agendamentoService';
import { Agendamento } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ConsultaForm {
  protocolo: string;
}

const statusIcons = {
  Pendente: <Clock className="h-5 w-5 text-yellow-600" />,
  Agendado: <Calendar className="h-5 w-5 text-blue-600" />,
  Concluído: <CheckCircle className="h-5 w-5 text-green-600" />,
  Cancelado: <XCircle className="h-5 w-5 text-red-600" />
};

const statusColors = {
  Pendente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Agendado: 'bg-blue-100 text-blue-800 border-blue-200',
  Concluído: 'bg-green-100 text-green-800 border-green-200',
  Cancelado: 'bg-red-100 text-red-800 border-red-200'
};

export default function ConsultaProtocolo() {
  const [agendamento, setAgendamento] = useState<Agendamento | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ConsultaForm>();

  const onSubmit = async (data: ConsultaForm) => {
    setLoading(true);
    setNotFound(false);
    setAgendamento(null);

    try {
      const result = await agendamentoService.getByProtocolo(data.protocolo);
      setAgendamento(result);
    } catch (error) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Consultar Status da Coleta
          </h1>
          <p className="text-gray-600">
            Digite o número do protocolo para verificar o status da sua solicitação
          </p>
        </div>

        {/* Formulário de Consulta */}
        <div className="card mb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número do Protocolo
              </label>
              <div className="flex space-x-4">
                <input
                  {...register('protocolo', {
                    required: 'Protocolo é obrigatório',
                    pattern: {
                      value: /^COL-\d{6}-[A-Z0-9]{6}$/,
                      message: 'Formato: COL-123456-ABC123'
                    }
                  })}
                  className="input-field flex-1"
                  placeholder="COL-123456-ABC123"
                  maxLength={17}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center space-x-2 px-6"
                >
                  <Search className="h-4 w-4" />
                  <span>{loading ? 'Consultando...' : 'Consultar'}</span>
                </button>
              </div>
              {errors.protocolo && (
                <p className="text-red-500 text-sm mt-1">{errors.protocolo.message}</p>
              )}
            </div>
          </form>
        </div>

        {/* Resultado Não Encontrado */}
        {notFound && (
          <div className="card text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Protocolo não encontrado
            </h3>
            <p className="text-gray-600">
              Verifique se o número do protocolo está correto e tente novamente.
            </p>
          </div>
        )}

        {/* Resultado da Consulta */}
        {agendamento && (
          <div className="space-y-6">
            {/* Status Card */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Status da Coleta
                </h2>
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                  statusColors[agendamento.status as keyof typeof statusColors]
                }`}>
                  {statusIcons[agendamento.status as keyof typeof statusIcons]}
                  <span className="font-semibold">{agendamento.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Protocolo</label>
                  <p className="text-lg font-mono text-gray-900">{agendamento.protocolo}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Data Solicitada</label>
                  <p className="text-gray-900">
                    {format(new Date(agendamento.dataSugerida), 'dd/MM/yyyy', { locale: ptBR })}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Data da Solicitação</label>
                  <p className="text-gray-900">
                    {format(new Date(agendamento.createdAt), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Última Atualização</label>
                  <p className="text-gray-900">
                    {format(new Date(agendamento.dataAtualizacao), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </p>
                </div>
              </div>

              {agendamento.observacoes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                  <p className="text-gray-900">{agendamento.observacoes}</p>
                </div>
              )}
            </div>

            {/* Detalhes da Coleta */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Endereço */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Endereço da Coleta
                </h3>
                <div className="space-y-2">
                  <p><strong>Nome:</strong> {agendamento.nomeCompleto}</p>
                  <p><strong>Endereço:</strong> {agendamento.endereco}, {agendamento.numero}</p>
                  <p><strong>Bairro:</strong> {agendamento.bairro}</p>
                  <p><strong>Cidade:</strong> {agendamento.cidade}</p>
                  <p><strong>Telefone:</strong> {agendamento.telefone}</p>
                </div>
              </div>

              {/* Materiais */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Recycle className="h-5 w-5 mr-2" />
                  Materiais para Coleta
                </h3>
                <div className="space-y-2">
                  {agendamento.materiais.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <Recycle className="h-4 w-4 text-primary-600" />
                      <span>{item.material.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}