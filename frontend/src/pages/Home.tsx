import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { Calendar, MapPin, Phone, Mail, Recycle, CheckCircle, Shield, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { usePhoneFormat } from '../hooks/usePhoneFormat';
import { agendamentoService } from '../services/agendamentoService';
import { CreateAgendamentoData, MaterialType } from '../types';
import { format, addDays } from 'date-fns';

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [protocolo, setProtocolo] = useState('');
  const phoneFormat = usePhoneFormat();

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<CreateAgendamentoData>();

  const { data: materialTypes = [] } = useQuery<MaterialType[]>(
    'materialTypes',
    agendamentoService.getMaterialTypes
  );

  const createMutation = useMutation(agendamentoService.create, {
    onSuccess: (data) => {
      setProtocolo(data.protocolo);
      setShowSuccess(true);
      reset();
      toast.success('Agendamento criado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao criar agendamento');
    },
  });

  const onSubmit = (data: CreateAgendamentoData) => {
    createMutation.mutate(data);
  };

  const minDate = format(addDays(new Date(), 3), 'yyyy-MM-dd');

  if (showSuccess) {
    return (
      <div className="px-4 sm:px-0">
        <div className="max-w-2xl mx-auto">
          <div className="card text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Agendamento Criado com Sucesso!
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-700 mb-2">Número do Protocolo:</p>
              <p className="text-2xl font-mono font-bold text-green-800">{protocolo}</p>
            </div>
            <p className="text-gray-600 mb-6">
              Guarde este número para acompanhar seu agendamento. 
              Entraremos em contato em breve para confirmar a coleta.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="btn-primary"
            >
              Fazer Novo Agendamento
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <div className="flex justify-center space-x-4 mb-4">
            <Link
              to="/consulta"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg transition-colors duration-200 text-sm"
            >
              <Search className="h-4 w-4" />
              <span>Consultar Protocolo</span>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm"
            >
              <Shield className="h-4 w-4" />
              <span>Área Administrativa</span>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Agende sua Coleta Sustentável
          </h1>
          <p className="text-xl text-gray-600">
            Transforme seus recicláveis em impacto positivo para o meio ambiente
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Solicitar Agendamento
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  {...register('nomeCompleto', { 
                    required: 'Nome é obrigatório',
                    minLength: { value: 2, message: 'Nome deve ter pelo menos 2 caracteres' }
                  })}
                  className="input-field"
                  placeholder="Seu nome completo"
                />
                {errors.nomeCompleto && (
                  <p className="text-red-500 text-sm mt-1">{errors.nomeCompleto.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço *
                  </label>
                  <input
                    {...register('endereco', { required: 'Endereço é obrigatório' })}
                    className="input-field"
                    placeholder="Rua, avenida..."
                  />
                  {errors.endereco && (
                    <p className="text-red-500 text-sm mt-1">{errors.endereco.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número *
                  </label>
                  <input
                    {...register('numero', { required: 'Número é obrigatório' })}
                    className="input-field"
                    placeholder="123"
                  />
                  {errors.numero && (
                    <p className="text-red-500 text-sm mt-1">{errors.numero.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bairro *
                  </label>
                  <input
                    {...register('bairro', { required: 'Bairro é obrigatório' })}
                    className="input-field"
                    placeholder="Nome do bairro"
                  />
                  {errors.bairro && (
                    <p className="text-red-500 text-sm mt-1">{errors.bairro.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade *
                  </label>
                  <input
                    {...register('cidade', { required: 'Cidade é obrigatória' })}
                    className="input-field"
                    placeholder="Nome da cidade"
                  />
                  {errors.cidade && (
                    <p className="text-red-500 text-sm mt-1">{errors.cidade.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone *
                  </label>
                  <input
                    {...register('telefone', { 
                      required: 'Telefone é obrigatório',
                      pattern: {
                        value: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
                        message: 'Formato: (11) 99999-9999'
                      }
                    })}
                    value={phoneFormat.value}
                    onChange={(e) => {
                      const formatted = phoneFormat.onChange(e);
                      setValue('telefone', formatted);
                    }}
                    className="input-field"
                    placeholder="Digite apenas os números"
                    maxLength={15}
                  />
                  {errors.telefone && (
                    <p className="text-red-500 text-sm mt-1">{errors.telefone.message}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Formato automático: (11) 99999-9999
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail (opcional)
                  </label>
                  <input
                    {...register('email', {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'E-mail inválido'
                      }
                    })}
                    type="email"
                    className="input-field"
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Sugerida *
                </label>
                <input
                  {...register('dataSugerida', { required: 'Data é obrigatória' })}
                  type="date"
                  min={minDate}
                  className="input-field"
                />
                {errors.dataSugerida && (
                  <p className="text-red-500 text-sm mt-1">{errors.dataSugerida.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Mínimo de 2 dias úteis a partir de hoje
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipos de Materiais *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {materialTypes.map((material) => (
                    <label key={material.id} className="flex items-center space-x-2">
                      <input
                        {...register('materiais', { required: 'Selecione pelo menos um material' })}
                        type="checkbox"
                        value={material.id}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{material.name}</span>
                    </label>
                  ))}
                </div>
                {errors.materiais && (
                  <p className="text-red-500 text-sm mt-1">{errors.materiais.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={createMutation.isLoading}
                className="w-full btn-primary"
              >
                {createMutation.isLoading ? 'Agendando...' : 'Agendar Coleta'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Como Funciona
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">1. Agende</p>
                    <p className="text-sm text-gray-600">
                      Preencha o formulário com seus dados e materiais
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">2. Confirmação</p>
                    <p className="text-sm text-gray-600">
                      Entraremos em contato para confirmar a coleta
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Recycle className="h-5 w-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">3. Coleta</p>
                    <p className="text-sm text-gray-600">
                      Nossa equipe realizará a coleta no dia agendado
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Materiais Aceitos
              </h3>
              <div className="space-y-2">
                {materialTypes.map((material) => (
                  <div key={material.id} className="flex items-center space-x-2">
                    <Recycle className="h-4 w-4 text-primary-600" />
                    <div>
                      <p className="font-medium text-gray-900">{material.name}</p>
                      {material.description && (
                        <p className="text-sm text-gray-600">{material.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}