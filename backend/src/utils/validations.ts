import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email deve ter um formato válido',
    'any.required': 'Email é obrigatório'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Senha deve ter pelo menos 6 caracteres',
    'any.required': 'Senha é obrigatória'
  })
});

export const agendamentoSchema = Joi.object({
  nomeCompleto: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Nome deve ter pelo menos 2 caracteres',
    'string.max': 'Nome deve ter no máximo 100 caracteres',
    'any.required': 'Nome completo é obrigatório'
  }),
  endereco: Joi.string().min(5).max(200).required().messages({
    'string.min': 'Endereço deve ter pelo menos 5 caracteres',
    'any.required': 'Endereço é obrigatório'
  }),
  numero: Joi.string().max(10).required().messages({
    'any.required': 'Número é obrigatório'
  }),
  bairro: Joi.string().min(2).max(50).required().messages({
    'any.required': 'Bairro é obrigatório'
  }),
  cidade: Joi.string().min(2).max(50).required().messages({
    'any.required': 'Cidade é obrigatória'
  }),
  telefone: Joi.string().pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/).required().messages({
    'string.pattern.base': 'Telefone deve estar no formato (XX) XXXXX-XXXX',
    'any.required': 'Telefone é obrigatório'
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email deve ter um formato válido'
  }),
  dataSugerida: Joi.date().iso().required().messages({
    'any.required': 'Data sugerida é obrigatória'
  }),
  materiais: Joi.array().items(Joi.string()).min(1).required().messages({
    'array.min': 'Selecione pelo menos um tipo de material',
    'any.required': 'Tipos de materiais são obrigatórios'
  })
});

export const updateStatusSchema = Joi.object({
  status: Joi.string().valid('Pendente', 'Agendado', 'Concluído', 'Cancelado').required().messages({
    'any.only': 'Status deve ser: Pendente, Agendado, Concluído ou Cancelado',
    'any.required': 'Status é obrigatório'
  }),
  observacoes: Joi.string().max(500).optional().messages({
    'string.max': 'Observações devem ter no máximo 500 caracteres'
  })
});