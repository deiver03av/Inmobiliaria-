import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./auth.types";

const authService = new AuthService();

export class AuthController {

  // REGISTRO
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body as RegisterDto;

      const usuario = await authService.register(data);

      res.status(201).json({
        message: "Usuario registrado correctamente",
        data: usuario
      });
    } catch (error) {
      res.status(400).json({
        error: "Error de registro",
        message: error instanceof Error
          ? error.message
          : "No se pudo registrar el usuario"
      });
    }
  };

  // LOGIN
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body as LoginDto;

      const resultado = await authService.login(data);

      // Guardar refresh token en cookie HttpOnly
      res.cookie("refreshToken", resultado.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(200).json({
        message: "Inicio de sesión exitoso",
        accessToken: resultado.accessToken,
        usuario: resultado.usuario
      });
    } catch (error) {
      res.status(401).json({
        error: "Error de autenticación",
        message: error instanceof Error
          ? error.message
          : "Correo o contraseña incorrectos"
      });
    }
  };

  // REFRESH TOKEN
  refresh = async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(401).json({
          error: "No autorizado",
          message: "No existe refresh token"
        });
        return;
      }

      const accessToken = authService.refreshToken(refreshToken);

      res.status(200).json({
        accessToken
      });
    } catch {
      res.status(401).json({
        error: "Refresh token inválido",
        message: "Debe iniciar sesión nuevamente"
      });
    }
  };

  // LOGOUT
  logout = async (_req: Request, res: Response): Promise<void> => {
    res.clearCookie("refreshToken");

    res.status(200).json({
      message: "Sesión cerrada correctamente"
    });
  };
}