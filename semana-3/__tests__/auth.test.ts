import request from "supertest";
import app from "../src/app";

describe("Autenticación", () => {
  it("Debe registrar un usuario", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({
        nombre: "Jest",
        correo: `jest${Date.now()}@test.com`,
        password: "123456"
      });

    expect(res.status).toBe(201);

    expect(res.body.message).toBe(
      "Usuario registrado correctamente"
    );
  });
});