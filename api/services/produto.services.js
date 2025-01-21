import produtoRepository from "../repositories/produto.repository.js";

async function readProduto(id) {
  return await produtoRepository.readProduto(id);
}

export default { readProduto };
