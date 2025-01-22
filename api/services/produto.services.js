import produtoRepository from "../repositories/produto.repository.js"

async function readProdutos(){
    return await produtoRepository.readProdutos()
}

async function readProduto(id) {
  return await produtoRepository.readProduto(id);
}

async function updateProduto(produto) {
  return await produtoRepository.updateProduto(produto);
}

export default { readProdutos, readProduto, updateProduto };
