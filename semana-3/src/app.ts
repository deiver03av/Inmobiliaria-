
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import mongoSanitize from "@exortek/express-mongo-sanitize";

import propertyRoutes from "./routes/property.routes";
import authRoutes from "./auth/auth.routes";

import { errorMiddleware } from "./middlewares/error.middleware";
import { logger } from "./utils/logger";
import { apiRateLimiter } from "./middlewares/rate-limit.middleware";

const app = express();

// ==========================================
// MIDDLEWARES DE SEGURIDAD
// ==========================================

app.use(helmet());
app.use(apiRateLimiter);

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

// ==========================================
// MIDDLEWARES GENERALES
// ==========================================

app.use(express.json());
app.use(cookieParser());

// Sanitización de datos para MongoDB
app.use(mongoSanitize());

// Registrar inicio de la aplicación
logger.info("Aplicación iniciada");

// ==========================================
// RUTA PRINCIPAL
// ==========================================

app.get("/", (_req, res) => {
  res.json({
    message: "API de Inmobiliaria funcionando"
  });
});

// ==========================================
// RUTAS DE AUTENTICACIÓN
// ==========================================

app.use("/api/v1/auth", authRoutes);

// ==========================================
// RUTAS DE PROPIEDADES
// ==========================================

app.use("/api/v1/properties", propertyRoutes);

// ==========================================
// MANEJO GLOBAL DE ERRORES
// ==========================================

app.use(errorMiddleware);

export default app;

