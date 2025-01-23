import usuarioRepository from "../repositories/usuario.repository.js";

async function createUsuario(novoUsuario) {
  const clienteExistente = await usuarioRepository.existsEmail(
    novoUsuario.email
  );

  // Aplica a regra de negócio 1 do RF012
  if (clienteExistente) {
    return { erro: "Email já cadastrado" };
  } else {
    return await usuarioRepository.createUsuario(novoUsuario);
  }
}

async function loginUsuario(usuario) {
  await usuarioRepository.loginUsuario(usuario);
}

export default { createUsuario, loginUsuario };
