import app from "./app";
import { connectDB } from "./config/database";

const PORT = 3000;

connectDB()
  .then(() => {
    app.listen(PORT, "127.0.0.1", () => {
      console.log(`Servidor ejecutándose en http://127.0.0.1:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("No se pudo iniciar la aplicación:", error);
  });