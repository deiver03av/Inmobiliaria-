// ============================================
// errorHandler — middleware centralizado de errores
// Debe registrarse AL FINAL, con 4 parámetros (firma que Express
// reconoce como error-handling middleware).
// ============================================

import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        details: err.details,
      },
    });
  }

  // Error no controlado: no exponemos el stack al cliente, solo lo logueamos
  console.error('❌ Error inesperado:', err);
  return res.status(500).json({
    error: { message: 'Error interno del servidor.' },
  });
}
