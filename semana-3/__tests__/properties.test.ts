import request from "supertest";
import app from "../src/app";

describe("Propiedades", () => {
  it("Debe listar propiedades", async () => {
    const res = await request(app)
      .get("/api/v1/properties");

    expect(res.status).toBe(200);

    expect(res.body).toHaveProperty("data");
  });

  it("Debe bloquear creación sin JWT", async () => {
    const res = await request(app)
      .post("/api/v1/properties")
      .send({
        title: "Casa Jest",
        city: "Bogotá",
        price: 350000000,
        bedrooms: 3,
        bathrooms: 2,
        type: "Casa"
      });

    expect(res.status).toBe(401);
  });
});