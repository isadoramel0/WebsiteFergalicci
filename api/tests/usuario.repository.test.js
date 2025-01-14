import { describe, test, it, expect } from "vitest";
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
    console.log(result);
    expect(result).not.toBeNull();
  });
});
