// ============================================
// SERVER — Entry point: levanta el servidor HTTP
// ============================================

import { app } from './app.js';

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📍 Endpoints disponibles en http://localhost:${PORT}/api/properties`);
});
