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
  } catch (error) {
    console.log(error);
    console.error("Erro ao cadastrar um produto no banco de dados");
  } finally {
    connection.release();
  }

  return resultRows;
}

async function readProdutos() {
  const connection = await database.connect();
  let resultRows = null
  
  const query = 'SELECT * FROM "Produto"';
  
  try {
    const queryResult = await connection.query(query);
    resultRows = queryResult.rows;
  } catch (error) {
    console.log(error);
    console.error("Erro ao consultar os produtos no banco de dados");
  } finally {
    connection.release();
  }

  return resultRows;
}

async function readProduto(id) {
  const connection = await database.connect();
  const query = 'SELECT * FROM "Produto" WHERE "idProduto"=$1';

  let resultRow = null;
  try {
    const queryResult = await connection.query(query, [id]);
    resultRow = queryResult.rows[0];
  } catch (error) {
    console.log(error);
  } finally {
    connection.release();
  }

  return resultRow;
}

async function updateProduto(produto){
  const connection = await database.connect();
  let resultRows = null;
  const query =
    'UPDATE "Produto" SET "nomeProd" = $1, "caminhoImg" = $2 WHERE "idProduto" = $3 RETURNING *';

  try {
    const queryResult = await connection.query(query, [
      produto.nome,
      produto.arquivo,
      produto.idProduto
    ]);
    resultRows = queryResult.rows[0];
  } catch (error) {
    console.log(error);
    console.error("Erro ao modificar um produto no banco de dados");
  } finally {
    connection.release();
  }

  return resultRows;
}

export default { createProduto, readProdutos, readProduto, updateProduto };
