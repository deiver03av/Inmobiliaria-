import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const roleMiddleware = (...rolesPermitidos: string[]) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): void => {

    if (!req.user) {
      res.status(401).json({
        error: "No autorizado",
        message: "Debe iniciar sesión"
      });
      return;
    }

    if (!rolesPermitidos.includes(req.user.rol)) {
      res.status(403).json({
        error: "Acceso denegado",
        message: "No tiene permisos para realizar esta acción"
      });
      return;
    }

    next();
  };
};