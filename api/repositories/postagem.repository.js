import database from "./database.js";

async function createPostagem(postagem) {
  const connection = await database.connect();
  let resultRows = null;
  const query = `INSERT INTO "Postagem" ("tituloPost", "corpo", "tipoConteudo", "caminhoImg")
    VALUES ($1, $2, $3, $4) RETURNING *`;

  try {
    const queryResult = await connection.query(query, [
      postagem.tituloPost,
      postagem.corpo,
      postagem.tipoConteudo,
      postagem.caminhoimg,
    ]);
    resultRows = queryResult.rows;
  } catch (error) {
    console.log(error);
    console.error("Erro ao cadastrar um postagem no banco de dados");
    return null;
  } finally {
    connection.release();
  }

  return resultRows;
}

export default { createPostagem };
