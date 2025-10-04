import request from 'supertest';
import express from 'express';
import { agendamentoRoutes } from '../../routes/agendamentoRoutes';
import { authRoutes } from '../../routes/authRoutes';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

describe('API Agendamentos', () => {
  let authToken: string;

  beforeAll(async () => {
    // Fazer login para obter token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@coletas.com',
        password: 'admin123'
      });

    if (loginResponse.status === 200) {
      authToken = loginResponse.body.token;
    }
  });

  describe('POST /api/agendamentos', () => {
    it('deve criar agendamento com dados válidos', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);

      const agendamentoData = {
        nomeCompleto: 'João Silva',
        endereco: 'Rua das Flores, 123',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        telefone: '(11) 99999-9999',
        email: 'joao@email.com',
        dataSugerida: futureDate.toISOString(),
        materiais: ['material-id-1']
      };

      const response = await request(app)
        .post('/api/agendamentos')
        .send(agendamentoData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('protocolo');
      expect(response.body.nomeCompleto).toBe(agendamentoData.nomeCompleto);
    });

    it('deve retornar erro 400 para dados inválidos', async () => {
      const agendamentoData = {
        nomeCompleto: '', // Nome vazio
        endereco: 'Rua das Flores, 123',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        telefone: 'telefone-inválido', // Formato inválido
        dataSugerida: 'data-inválida',
        materiais: []
      };

      const response = await request(app)
        .post('/api/agendamentos')
        .send(agendamentoData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/agendamentos', () => {
    it('deve retornar erro 401 sem autenticação', async () => {
      const response = await request(app)
        .get('/api/agendamentos');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    it('deve retornar lista de agendamentos com autenticação', async () => {
      if (!authToken) {
        console.log('Pulando teste - token não disponível');
        return;
      }

      const response = await request(app)
        .get('/api/agendamentos')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/agendamentos/materiais/tipos', () => {
    it('deve retornar tipos de materiais sem autenticação', async () => {
      const response = await request(app)
        .get('/api/agendamentos/materiais/tipos');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});