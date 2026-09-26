import express from "express";
import propertyRoutes from "./routes/property.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { logger } from "./utils/logger";

const app = express();

app.use(express.json());

// Registrar inicio de la aplicación
logger.info("Aplicación iniciada");

// Ruta principal
app.get("/", (_req, res) => {
  res.json({
    message: "API de Inmobiliaria funcionando"
  });
});

// Rutas de propiedades
app.use("/api/v1/properties", propertyRoutes);

// Middleware global para manejar errores
app.use(errorMiddleware);

export default app;