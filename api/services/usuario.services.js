import usuarioRepository from "../repositories/usuario.repository.js";

async function createUsuario(novoUsuario) {
    const clienteExistente = await usuarioRepository.existsEmail(novoUsuario.email);

    // Aplica a regra de negócio: "Um usuário já cadastrado não pode se cadastrar novamente."
    if (clienteExistente) {
        return { erro: "Email já cadastrado" };
    } else {
        return await usuarioRepository.createUsuario(novoUsuario);
    }
}

export default { createUsuario }