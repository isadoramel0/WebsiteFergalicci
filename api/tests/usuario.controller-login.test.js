import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "./index.js";

describe("UsuarioController login", () => {
  it("deve fazer login com sucesso quando as credenciais estão corretas", async () => {
    const usuario = {
      email: "user@dominio.com",
      senha: "1234567O",
    };

    // Login com usuário utilizado no primeiro teste
    const response = await request(app).post("/usuarios/login").send(usuario);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("deve impedir o login pois a senha está incorreta", async () => {
    const usuario = {
      email: "user@dominio.com",
      senha: "senhaRuim0",
    };

    // Login com o usuário do primeiro caso porém senha incorreta
    const response = await request(app).post("/usuarios/login").send(usuario);

    expect(response.status).toBe(401);
    expect(response.body.erro).toContain(
      "E-mail ou senha incorretos. Verifique e tente novamente."
    );
  });

  it("deve impedir o login pois o usuário não existe", async () => {
    const usuario = {
      email: "jq i12h3g7gadsblo@jkasbcg svd.com",
      senha: "senhaBoa0",
    };

    // Login com o usuário do primeiro caso porém senha incorreta
    const response = await request(app).post("/usuarios/login").send(usuario);

    expect(response.status).toBe(401);
    expect(response.body.erro).toContain(
      "E-mail ou senha incorretos. Verifique e tente novamente."
    );
  });
})
