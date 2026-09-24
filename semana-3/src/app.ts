import express from "express";
import propertyRoutes from "./routes/property.routes";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "API de Inmobiliaria funcionando"
  });
});

app.use("/api/v1/properties", propertyRoutes);

export default app;