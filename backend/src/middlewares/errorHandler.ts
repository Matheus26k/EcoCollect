import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const BAD_REQUEST = 400;
  const INTERNAL_SERVER_ERROR = 500;

  if (error.message.includes('Data deve ser')) {
    return res.status(BAD_REQUEST).json({ error: error.message });
  }

  if (error.message.includes('Observações são obrigatórias')) {
    return res.status(BAD_REQUEST).json({ error: error.message });
  }

  res.status(INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
};