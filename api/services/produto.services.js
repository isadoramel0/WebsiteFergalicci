import produtoRepository from "../repositories/produto.repository.js";

async function createProduto(produto) {
  // A regra de negócio 1 do RF001 é tratada com a restrição do banco de dados
  // que decide automaticamente o identificador do produto
  return await produtoRepository.createProduto(produto);
}

async function readProdutos() {
  return await produtoRepository.readProdutos();
}

async function readProduto(id) {
  return await produtoRepository.readProduto(id);
}

async function updateProduto(produto) {
  // A regra de negócio 1 do RF003 é tratada já na requisição, visto que não há
  // como fornecer mais de um identificador para editar os dados
  return await produtoRepository.updateProduto(produto);
}

export default { createProduto, readProdutos, readProduto, updateProduto };
