import upload from "../util/fileHandler.js";
import produtoRepository from "../repositories/produto.repository.js";

async function createProduto(req, res) {
  upload.single("foto_produto");

  const novoProduto = {
    nome: req.body.nome,
    arquivo: req.body.filename,
  };

  // Validação de dados

  if (!novoProduto.nome || !novoProduto.arquivo) {
    res
      .status(400)
      .json({ erro: "Falha ao cadastrar produto, confira os campos" });
  }

  const produto = await produtoRepository.createProduto(novoProduto);

  if (produto) {
    res
      .status(201)
      .json({ mensagem: "Produto criado com sucesso", novoProduto });
  } else {
    res
      .status(400)
      .json({ erro: "Falha ao cadastrar produto no banco de dados" });
  }
}

async function readProdutos(req, res) {
  const produtos = await produtoRepository.readProdutos();

  if (produtos) {
    return res.status(200).json({ produtos });
  } else {
    return res.status(400).json({erro: "Não foi possível consultar os produtos no banco de dados"})
  }
}

export default { createProduto };
