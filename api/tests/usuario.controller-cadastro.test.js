import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "./index.js";

describe("UsuarioController Cadastro", () => {
  it("deve cadastrar um usuário com dados válidos", async () => {
    const novoUsuario = {
      nomeUsuario: "User certo",
      email: "user@dominio.com",
      senha: "1234567O",
      confirmacaoSenha: "1234567O",
    };

    const response = await request(app)
      .post("/usuarios/cadastrar")
      .send(novoUsuario);

    expect(response.status).toBe(201);
    expect(response.body[0]).toHaveProperty("email");
  });

  it("deve retornar erro se a confirmação de senha não corresponder à senha", async () => {
    const novoUsuario = {
      nomeUsuario: "João Krasinski",
      email: "joao123@dominio.com",
      senha: "12345678",
      confirmacaoSenha: "87654321",
    };

    const response = await request(app)
      .post("/usuarios/cadastrar")
      .send(novoUsuario);

    expect(response.status).toBe(400);
    expect(response.body.erros).toContain(
      "A confirmação de senha não corresponde à senha informada"
    );
  });

  it("deve retornar erro se a senha não tiver pelo menos 8 caracteres", async () => {
    const novoUsuario = {
      nomeUsuario: "João Krasinski",
      email: "joao123@dominio.com",
      senha: "12345",
      confirmacaoSenha: "12345",
    };

    const response = await request(app)
      .post("/usuarios/cadastrar")
      .send(novoUsuario);

    expect(response.status).toBe(400);
    expect(response.body.erros).toContain(
      "A senha deve conter no mínimo 8 caracteres"
    );
  });

  it("deve retornar erro se a senha não contiver pelo menos uma letra", async () => {
    const novoUsuario = {
      nomeUsuario: "João Krasinski",
      email: "joao123@dominio.com",
      senha: "12345678",
      confirmacaoSenha: "12345678",
    };

    const response = await request(app)
      .post("/usuarios/cadastrar")
      .send(novoUsuario);

    expect(response.status).toBe(400);
    expect(response.body.erros).toContain(
      "A senha deve conter ao menos uma letra"
    );
  });

  it("deve retornar erro se a senha não contiver pelo menos um número", async () => {
    const novoUsuario = {
      nomeUsuario: "João Krasinski",
      email: "joao123@dominio.com",
      senha: "abcdefgh",
      confirmacaoSenha: "abcdefgh",
    };

    const response = await request(app)
      .post("/usuarios/cadastrar")
      .send(novoUsuario);

    expect(response.status).toBe(400);
    expect(response.body.erros).toContain(
      "A senha deve conter ao menos um número"
    );
  });
});