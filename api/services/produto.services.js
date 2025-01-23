import produtoRepository from "../repositories/produto.repository.js"

async function readProdutos(){
    return await produtoRepository.readProdutos()
}

async function createProduto(produto){
    return await produtoRepository.createProduto(produto);
}

export default { readProdutos, createProduto }