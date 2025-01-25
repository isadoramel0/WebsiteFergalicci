import postagemRepository from "../repositories/postagem.repository.js";

async function createPostagem(postagem) {
  return await postagemRepository.createPostagem(postagem);
}

async function readPostagens() {
  return await postagemRepository.readPostagens();
}

export default { createPostagem, readPostagens };
