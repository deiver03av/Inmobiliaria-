import express from "express";
import cookieParser from "cookie-parser";

import propertyRoutes from "./routes/property.routes";
import authRoutes from "./auth/auth.routes";

import { errorMiddleware } from "./middlewares/error.middleware";
import { logger } from "./utils/logger";

const app = express();

app.use(express.json());
app.use(cookieParser());

// Registrar inicio de la aplicación
logger.info("Aplicación iniciada");

// Ruta principal
app.get("/", (_req, res) => {
  res.json({
    message: "API de Inmobiliaria funcionando"
  });
});

// Rutas de autenticación
app.use("/api/v1/auth", authRoutes);

// Rutas de propiedades
app.use("/api/v1/properties", propertyRoutes);

// Middleware global para manejar errores
app.use(errorMiddleware);

export default app;