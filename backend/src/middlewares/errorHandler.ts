import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  if (error.message.includes('Data deve ser')) {
    return res.status(400).json({ error: error.message });
  }

  if (error.message.includes('Observações são obrigatórias')) {
    return res.status(400).json({ error: error.message });
  }

  res.status(500).json({ error: 'Erro interno do servidor' });
};