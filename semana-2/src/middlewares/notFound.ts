// ============================================
// notFound — captura cualquier ruta que no exista
// Debe registrarse DESPUÉS de todas las rutas.
// ============================================

import type { Request, Response } from 'express';

export function notFound(req: Request, res: Response) {
  res.status(404).json({
    error: {
      message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
    },
  });
}
