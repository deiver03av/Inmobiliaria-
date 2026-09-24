// ============================================
// APP — Configuración de la aplicación Express
// Separado de server.ts para poder testear "app" sin levantar
// un puerto real (supertest, por ejemplo).
// ============================================

import express from 'express';
import { propertyRouter } from './routes/property.routes.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const app = express();

// Middlewares globales
app.use(express.json()); // parsea application/json en req.body

// Healthcheck simple
app.get('/', (req, res) => {
  res.json({ message: '🏠 API Inmobiliaria — Semana 2 (Express)' });
});

// Rutas del recurso
app.use('/api/properties', propertyRouter);

// 404 y manejo de errores (SIEMPRE al final, en este orden)
app.use(notFound);
app.use(errorHandler);
