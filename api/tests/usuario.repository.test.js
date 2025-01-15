import { describe, it, expect } from "vitest";
import usuarioRepository from "../repositories/usuario.repository.js";

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
    if (usuarioRepository.existsEmail(userData.email)) {
      expect(result).toBeNull();
    } else {
      expect(result).toBeDefined();
    }
  });
});

describe("UsuarioRepository", () => {
  it("deve consultar se um email já existe no banco de dados", async () => {
    const email = "joao123@dominio.com";

    const result = await usuarioRepository.existsEmail(email);

    expect(result).toBe(true);
  });
});
