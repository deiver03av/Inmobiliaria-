import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    correo: string;
    rol: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {

  console.log("🔥 AUTH MIDDLEWARE EJECUTADO");

  try {
    // Obtener el encabezado Authorization
    const authHeader = req.headers.authorization;

    // Verificar que exista
    if (!authHeader) {
      res.status(401).json({
        error: "No autorizado",
        message: "No se proporcionó un token"
      });
      return;
    }

    // Verificar que tenga formato Bearer
    if (!authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        error: "No autorizado",
        message: "El token debe utilizar el formato Bearer <token>"
      });
      return;
    }

    // Obtener únicamente el token
    const token = authHeader.substring(7).trim();

    if (!token) {
      res.status(401).json({
        error: "No autorizado",
        message: "No se proporcionó un token"
      });
      return;
    }

    // Verificar el JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as {
      id: string;
      correo: string;
      rol: string;
    };

    // Guardar los datos del usuario en la petición
    req.user = decoded;

    console.log("✅ JWT válido:", decoded.correo);

    // Continuar con el controlador
    next();

  } catch (error) {

    console.log("❌ JWT inválido o expirado");

    res.status(401).json({
      error: "No autorizado",
      message: "Token inválido o expirado"
    });
  }
};