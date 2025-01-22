import produtoRepository from "../repositories/produto.repository.js"

async function readProdutos(){
    return await produtoRepository.readProdutos()
}

export default { readProdutos }