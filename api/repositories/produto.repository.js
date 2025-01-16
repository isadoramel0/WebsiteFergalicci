import database from "./database.js";

async function createProduto(novoproduto) {
  const connection = await database.connect();
  let resultRows = null;
  const query =
    'INSERT INTO "Produto" ("nomeProd", "caminhoImg") VALUES ($1, $2) RETURNING *';

  try {
    const queryResult = await connection.query(query, [
      novoproduto.nome,
      novoproduto.arquivo,
    ]);
    resultRows = queryResult.rows;
  } catch (error){
    console.log(error);
    console.error("Erro ao cadastrar um produto no banco de dados");
  } finally {
    connection.release()
  }

  return resultRows
}

export default { createProduto };
