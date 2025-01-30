import { apagarArquivo } from "../util/fileDeleter.js";
import produtoRepository from "../repositories/produto.repository.js";
import postagemServices from "../services/postagem.services.js";

async function createPostagem(req, res) {
  const postagem = {
    tituloPost: req.body.tituloPost,
    corpo: req.body.corpo,
    tipoConteudo: req.body.tipoConteudo === "true",
    caminhoimg: req.file ? req.file.filename : null,
    produtos: req.body.produtos ? JSON.parse(req.body.produtos) : null,
  };

  // Validação de campos
  let erros = [];
  if (!postagem.tituloPost) {
    erros.push("Título da postagem não fornecido");
  }
  if (!postagem.corpo) {
    erros.push("Corpo da postagem não fornecido");
  }
  if (postagem.tipoConteudo === null) {
    erros.push("Tipo da postagem não fornecido");
  }
  if (!postagem.produtos) {
    erros.push("Produtos da postagem não fornecidos");
  }
  if (!postagem.caminhoimg) {
    erros.push("Imagem da postagem não fornecida");
  }
  if (erros.length > 0) {
    // Apagar imagem caso haja erros
    if (postagem.caminhoimg) {
      apagarArquivo(postagem.caminhoimg);
    }
    return res.status(400).json({ erros });
  }

  // Verificar se os produtos existem no banco de dados
  const produtosExistem = await produtoRepository.functionAllExisting(
    postagem.produtos
  );

  if (!produtosExistem) {
    if (postagem.caminhoimg) {
      apagarArquivo(postagem.caminhoimg);
    }
    return res
      .status(400)
      .json({ erros: ["Um ou mais produtos fornecidos não existem"] });
  }

  const resultado = await postagemServices.createPostagem(postagem);

  if (resultado) {
    return res.status(200).json(resultado);
  } else {
    if (postagem.caminhoimg) {
      apagarArquivo(postagem.caminhoimg);
    }
    return res.status(500).json({ erro: "Erro ao criar a postagem" });
  }
}

async function readPostagens(req, res) {
  const postagens = await postagemServices.readPostagens();

  if (!postagens) {
    return res.status(400).json({
      erro: "Não foi possível consultar as postagens",
    });
  } else if (postagens.length >= 1) {
    return res.status(200).json({ postagens });
  } else {
    return res.status(200).json({ mensagem: "Nenhuma postagem cadastrada" });
  }
}

async function deletePostagem(req, res) {
  const idPostagem = req.params.idPostagem;

  if (!idPostagem) {
    return res.status(400).json({ erro: "ID da postagem não fornecido" });
  }

  const postagem = await postagemServices.readPostagem(idPostagem);
  if (!postagem) {
    return res.status(404).json({ erro: "Postagem não encontrada" });
  }

  const resultado = await postagemServices.deletePostagem(idPostagem);

  if (resultado) {
    if (postagem.caminhoimg) {
      apagarArquivo(postagem.caminhoimg);
    }
    return res.status(200).json({ mensagem: "Postagem deletada com sucesso" });
  } else {
    return res.status(500).json({ erro: "Erro ao deletar a postagem" });
  }
}

async function readDependencias(req, res) {
  const dependencias = await postagemServices.readDependencias();

  if (!dependencias) {
    return res.status(400).json({
      erro: "Não foi possível consultar as dependências",
    });
  } else if (dependencias.length >= 1) {
    return res.status(200).json({ dependencias });
  } else {
    return res.status(200).json({ mensagem: "Nenhum dependência encontrada" });
  }
  
}

export default { createPostagem, readPostagens, deletePostagem, readDependencias };
