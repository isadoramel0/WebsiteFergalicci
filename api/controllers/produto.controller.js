import produtoRepository from "../repositories/produto.repository.js";
import produtoServices from "../services/produto.services.js";
import { apagarArquivo } from "../util/fileDeleter.js";

async function createProduto(req, res) {
  let filename = null;
  if (req.file) {
    filename = req.file.filename;
  }
  const novoProduto = {
    nome: req.body.nome,
    arquivo: filename,
  };

  // Validação de dados

  if (!novoProduto.nome || !novoProduto.arquivo) {
    return res
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
  // Na requisição, a URL se parece com:
  // /produtos?pagina=1&limite=10

  const pagina = parseInt(req.query.pagina) || 1;
  const limite = parseInt(req.query.limite) || 5;
  const offset = (pagina - 1) * limite;

  const produtos = await produtoRepository.readProdutos(limite, offset);

  if (!produtos) {
    return res.status(400).json({
      erro: "Não foi possível consultar os produtos no banco de dados",
    });
  } else if (produtos.length >= 1) {
    return res.status(200).json({ produtos });
  } else {
    return res.status(200).json({ mensagem: "Nenhum produto cadastrado" });
  }
}

async function readProduto(req, res) {
  const params = req.params;

  const id = params.id;
  if (id) {
    const produto = await produtoServices.readProduto(id);
    return res.status(200).json({ produto });
  } else {
    return res
      .status(400)
      .json({ erro: "Não foi fornecido o id do produto buscado" });
  }
}

async function updateProduto(req, res) {
  let filename = null;
  if (req.file) {
    filename = req.file.filename;
  }
  const modificacoes = {
    idProduto: req.params.id,
    nome: req.body.nome,
    arquivo: filename,
  };

  if (!modificacoes) {
    return res.status(400).json({ erro: "Produto não informado" });
  } else {
    if (!modificacoes.idProduto) {
      return res.status(400).json({ erro: "ID do produto não informado" });
    }
  }

  // Consulta se o produto existe da base de dados
  const produtoAntigo = await produtoServices.readProduto(
    modificacoes.idProduto
  );

  if (!produtoAntigo) {
    return res
      .status(400)
      .json({ erro: "Produto não encontrado na base de dados" });
  } else {
    const modificado = {
      idProduto: modificacoes.idProduto,
      nome: modificacoes.nome || produtoAntigo.nomeProd,
      arquivo: modificacoes.arquivo || produtoAntigo.caminhoImg,
    };

    // Requisitar update no banco de dados
    const dados = await produtoServices.updateProduto(modificado);

    // Apagar imagem anterior, caso seja substituída
    if (req.file) {
      await apagarArquivo(produtoAntigo.caminhoImg);
    }

    return res
      .status(201)
      .json({ mensagem: "Produto editado com sucesso", produto: dados });
  }
}

export default { createProduto, readProdutos, readProduto, updateProduto };
