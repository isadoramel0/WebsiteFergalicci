import { apagarArquivo } from "../util/fileDeleter.js";

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

  return res.send(postagem);
}

export default { createPostagem };
