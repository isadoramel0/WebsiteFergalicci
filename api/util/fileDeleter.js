// Apaga um arquivo de maneira asíncrona

import fs from "fs";

export function apagarArquivo(nomeArquivo, caminhoAlternativo=null) {
  // Para caminhoAlternativo é esperado algo do tipo:
  // "pasta/subpasta/subsubpasta/"

  let caminho = "";
  if (caminhoAlternativo) {
    caminho = caminhoAlternativo + nomeArquivo;
  } else {
    caminho = "../public/produtos/" + nomeArquivo;
  }

  fs.unlink(caminho, erro => erro);

  return { mensagem: "Imagem substituída com sucesso" };
}
