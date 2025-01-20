import { describe, it, expect } from "vitest";
import usuarioRepository from "../repositories/usuario.repository.js";
import produtoRepository from "../repositories/produto.repository.js";

describe("UsuarioRepository", () => {
  it("deve criar um usuário no banco de dados", async () => {
    // Organizar
    const userData = {
      nomeUsuario: "João Krasinski",
      email: "joao123@dominio.com",
      senha: "123456",
    };

    // Agir
    const result = await usuarioRepository.createUsuario(userData);

    // Aferir

    expect(result).toStrictEqual([
      {
        email: "joao123@dominio.com",
        nomeUsuario: "João Krasinski",
      },
    ]);

  });
});

describe("UsuarioRepository", () => {
  it("deve consultar se um email já existe no banco de dados", async () => {
    const email = "joao123@dominio.com";

    const result = await usuarioRepository.existsEmail(email);

    expect(result).toBe(true);
  });
});

describe("ProdutoRepository", () => {
  it("deve consultar todos os produtos no banco de dados", async () => {
    const result = await produtoRepository.readProdutos();

    expect(result.length).toBeGreaterThan(0);
    console.log(result)
  });
});
