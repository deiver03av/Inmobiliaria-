import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

const authController = new AuthController();

// Registrar usuario
router.post("/register", authController.register);

// Iniciar sesión
router.post("/login", authController.login);

// Renovar access token
router.post("/refresh", authController.refresh);

// Cerrar sesión
router.post("/logout", authController.logout);

export default router;