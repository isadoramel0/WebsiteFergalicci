import postagemRepository from "../repositories/postagem.repository.js";

async function createPostagem(postagem) {
  return await postagemRepository.createPostagem(postagem);
}

async function readPostagens() {
  return await postagemRepository.readPostagens();
}

async function deletePostagem(idPostagem){
  return await postagemRepository.deletePostagem(idPostagem);
}

async function readPostagem(idPostagem) {
  return await postagemRepository.readPostagem(idPostagem);
}

async function updatePostagem(postagem){
  return await postagemRepository.updatePostagem(postagem);
}
async function readDependencias() {
  return await postagemRepository.readDependencias();
}

export default { createPostagem, readPostagens, deletePostagem, readPostagem, readDependencias, updatePostagem};
