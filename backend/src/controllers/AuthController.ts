import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { loginSchema } from '../utils/validations';

export class AuthController {
  private authService = new AuthService();

  login = async (req: Request, res: Response) => {
    try {
      const { error, value } = loginSchema.validate(req.body);
      
      if (error) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: error.details.map(d => d.message)
        });
      }

      const result = await this.authService.login(value.email, value.password);
      
      if (!result) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  };
}