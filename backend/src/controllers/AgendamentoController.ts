import { Request, Response } from 'express';
import { AgendamentoService } from '../services/AgendamentoService';
import { MaterialTypeService } from '../services/MaterialTypeService';
import { agendamentoSchema, updateStatusSchema } from '../utils/validations';

export class AgendamentoController {
  private agendamentoService = new AgendamentoService();
  private materialTypeService = new MaterialTypeService();

  create = async (req: Request, res: Response) => {
    try {
      const { error, value } = agendamentoSchema.validate(req.body);
      
      if (error) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: error.details.map(d => d.message)
        });
      }

      const agendamento = await this.agendamentoService.create(value);
      res.status(201).json(agendamento);
    } catch (error: any) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };

  list = async (req: Request, res: Response) => {
    try {
      const { status, dataInicio, dataFim } = req.query;
      
      const agendamentos = await this.agendamentoService.list({
        status: status as string,
        dataInicio: dataInicio as string,
        dataFim: dataFim as string
      });
      
      res.json(agendamentos);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const agendamento = await this.agendamentoService.getById(id);
      
      if (!agendamento) {
        return res.status(404).json({ error: 'Agendamento não encontrado' });
      }
      
      res.json(agendamento);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { error, value } = updateStatusSchema.validate(req.body);
      
      if (error) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: error.details.map(d => d.message)
        });
      }

      const agendamento = await this.agendamentoService.updateStatus(id, value);
      
      if (!agendamento) {
        return res.status(404).json({ error: 'Agendamento não encontrado' });
      }
      
      res.json(agendamento);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };

  getMaterialTypes = async (req: Request, res: Response) => {
    try {
      const tipos = await this.materialTypeService.getActive();
      res.json(tipos);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };

  getByProtocolo = async (req: Request, res: Response) => {
    try {
      const { protocolo } = req.params;
      const agendamento = await this.agendamentoService.getByProtocolo(protocolo);
      
      if (!agendamento) {
        return res.status(404).json({ error: 'Protocolo não encontrado' });
      }
      
      res.json(agendamento);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.agendamentoService.delete(id);
      res.status(204).send();
    } catch (error: any) {
      if (error.message === 'Agendamento não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };
}