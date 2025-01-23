import request from "supertest";
import { describe, it, expect, beforeAll } from "vitest";
import express from "express";
import jwt from "jsonwebtoken";
import tokenUtil from "../util/token.js"; // Ajuste o caminho conforme necessário

// Define um aplicativo para teste
const app = express();
app.use(express.json());

// Cria uma rota para teste do middleware
app.get("/teste-token", tokenUtil.authenticateAccessToken, (req, res) => {
  res.status(200).json({ mensagem: "Sucesso" });
});

describe("Token Middleware", () => {
  let tokenCorreto;

  beforeAll(() => {
    // Gera um token válido para os testes
    tokenCorreto = jwt.sign(
      { email: "test@domain.com" },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
  });

  it("deve retornar 401 se o token não for informado", async () => {
    const response = await request(app).get("/teste-token");
    expect(response.status).toBe(401);
    expect(response.body.erro).toBe("Token não informado");
  });

  it("deve retornar 403 se o token for inválido", async () => {
    const response = await request(app)
      .get("/teste-token")
      .set("Authorization", "Bearer Exemplo-de-token-muito-inválido");
    expect(response.status).toBe(403);
    expect(response.body.erro).toBe("Token inválido");
  });

  it("deve retornar 200 se o token for válido", async () => {
    const response = await request(app)
      .get("/teste-token")
      .set("Authorization", `Bearer ${tokenCorreto}`);
    expect(response.status).toBe(200);
    expect(response.body.mensagem).toBe("Sucesso");
  });
});
