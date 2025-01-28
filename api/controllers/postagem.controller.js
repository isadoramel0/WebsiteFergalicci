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

async function updatePostagem(req, res) {
  const { idPostagem } = req.params;
  const postagem = {
    tituloPost: req.body.tituloPost,
    corpo: req.body.corpo,
    tipoConteudo: req.body.tipoConteudo === "true",
    caminhoimg: req.file ? req.file.filename : null,
    produtos: req.body.produtos ? JSON.parse(req.body.produtos) : [],
  };

  // Confirmar que o ID da postagem existe no banco de dados
  const postagemAntiga = await postagemServices.readPostagem(idPostagem);
  if (!postagemAntiga) {
    return res.status(404).json({ erro: "Postagem não encontrada" });
  }

  // Verificar se os produtos existem no banco de dados
  if (postagem.produtos.lenght > 0) {
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
  }

  // Atualizar as informações da postagem no banco de dados
  const postagemAtualizada = {
    idPostagem,
    tituloPost: postagem.tituloPost || postagemAntiga.tituloPost,
    tipoConteudo: postagem.tipoConteudo || postagemAntiga.tipoConteudo,
    corpo: postagem.corpo || postagemAntiga.corpo,
    caminhoimg: postagem.caminhoimg || postagemAntiga.caminhoimg,
    produtos: postagem.produtos || postagemAntiga.produtos,
  };
  console.log(postagemAntiga)
  console.log(postagemAtualizada)

  const resultado = await postagemServices.updatePostagem(postagemAtualizada);

  if (resultado) {
    return res
      .status(200)
      .json({
        mensagem: "Postagem atualizada com sucesso",
        postagem: resultado,
      });
  } else {
    return res.status(500).json({ erro: "Erro ao atualizar a postagem" });
  }
}

export default {
  createPostagem,
  readPostagens,
  deletePostagem,
  updatePostagem,
};
