import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LogIn, Copy, Key } from 'lucide-react';
import Logo from '../components/Logo';
import { useAuth } from '../hooks/useAuth';

interface LoginForm {
  email: string;
  password: string;
}

const ADMIN_TOKEN = 'ECO2024ADMIN';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<LoginForm>();
  const [showCredentials, setShowCredentials] = useState(false);
  const [tokenInput, setTokenInput] = useState('');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copiado!`);
  };

  const fillCredentials = () => {
    setValue('email', 'admin@ecocollect.com');
    setValue('password', 'admin123');
    toast.info('Credenciais preenchidas!');
  };

  const validateToken = () => {
    if (tokenInput === ADMIN_TOKEN) {
      setShowCredentials(true);
      toast.success('Token válido! Credenciais liberadas.');
    } else {
      toast.error('Token inválido!');
      setTokenInput('');
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      toast.error('Credenciais inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Logo size="lg" showText={false} />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Área Administrativa
          </h2>
          <div className="flex justify-center mt-2">
            <Logo size="md" />
          </div>
          <p className="mt-2 text-center text-sm text-gray-600">
            Faça login para gerenciar os agendamentos
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                {...register('email', {
                  required: 'E-mail é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'E-mail inválido'
                  }
                })}
                type="email"
                className="mt-1 input-field"
                placeholder="admin@coletas.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                {...register('password', {
                  required: 'Senha é obrigatória',
                  minLength: {
                    value: 6,
                    message: 'Senha deve ter pelo menos 6 caracteres'
                  }
                })}
                type="password"
                className="mt-1 input-field"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-primary-500 group-hover:text-primary-400" />
              </span>
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="text-primary-600 hover:text-primary-500 text-sm font-medium"
            >
              ← Voltar para página inicial
            </Link>
          </div>
        </form>

        {!showCredentials ? (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-800 mb-3 flex items-center">
              <Key className="h-4 w-4 mr-2" />
              Acesso às Credenciais
            </h3>
            <div className="flex space-x-2">
              <input
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Digite o token de acesso"
                className="flex-1 px-3 py-2 border border-yellow-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                type="button"
                onClick={validateToken}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded transition-colors"
              >
                Validar
              </button>
            </div>
            <p className="text-xs text-yellow-700 mt-2">
              Token necessário para visualizar credenciais administrativas
            </p>
          </div>
        ) : (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-sm font-medium text-green-800 mb-3">🔑 Credenciais de Acesso:</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white rounded border">
                <span className="text-sm text-gray-600">E-mail:</span>
                <div className="flex items-center space-x-2">
                  <code className="text-sm font-mono text-green-700 bg-green-100 px-2 py-1 rounded">admin@ecocollect.com</code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('admin@ecocollect.com', 'E-mail')}
                    className="p-1 text-green-600 hover:text-green-800 transition-colors"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded border">
                <span className="text-sm text-gray-600">Senha:</span>
                <div className="flex items-center space-x-2">
                  <code className="text-sm font-mono text-green-700 bg-green-100 px-2 py-1 rounded">admin123</code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('admin123', 'Senha')}
                    className="p-1 text-green-600 hover:text-green-800 transition-colors"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={fillCredentials}
              className="w-full mt-3 px-3 py-2 bg-green-100 hover:bg-green-200 text-green-800 text-sm font-medium rounded transition-colors"
            >
              ⚡ Preencher Automaticamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}