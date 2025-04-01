import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  res: Response,
) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: 'Erro interno do servidor' });
};