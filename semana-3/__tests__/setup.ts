import "dotenv/config";
import mongoose from "mongoose";
import { beforeAll, afterAll } from "@jest/globals";

beforeAll(async () => {
  console.log("🔄 Intentando conectar Jest a MongoDB...");

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("❌ MONGODB_URI no está definida");
  }

  console.log("📌 MONGODB_URI encontrada");

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000
  });

  console.log("✅ Jest conectado a MongoDB");
});

afterAll(async () => {
  await mongoose.disconnect();

  console.log("🔌 Jest desconectado de MongoDB");
});