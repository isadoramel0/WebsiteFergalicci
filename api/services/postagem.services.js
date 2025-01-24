import postagemRepository from "../repositories/postagem.repository.js";

async function createPostagem(postagem) {
  return await postagemRepository.createPostagem(postagem);
}

export default { createPostagem };
