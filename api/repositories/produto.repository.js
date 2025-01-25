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
  let resultRows = null;

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

async function updateProduto(produto) {
  const connection = await database.connect();
  let resultRows = null;
  const query =
    'UPDATE "Produto" SET "nomeProd" = $1, "caminhoImg" = $2 WHERE "idProduto" = $3 RETURNING *';

  try {
    const queryResult = await connection.query(query, [
      produto.nome,
      produto.arquivo,
      produto.idProduto,
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

async function functionAllExisting(produtos) {
  const connection = await database.connect();
  // Soma 1 ao contador toda vez que o idProduto for igual a algum do array produtos
  const query =
    'SELECT COUNT(*) FROM "Produto" WHERE "idProduto" = ANY($1::int[])';

  try {
    const queryResult = await connection.query(query, [produtos]);
    const count = parseInt(queryResult.rows[0].count, 10);
    if (produtos.length - count === 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    console.error("Erro ao modificar um produto no banco de dados");
  } finally {
    connection.release();
  }
}

async function deleteProduto(idProduto) {
  const connection = await database.connect();
  const query = 'DELETE FROM "Produto" WHERE "idProduto" = $1 RETURNING *';

  try {
    const queryResult = await connection.query(query, [idProduto]);
    return queryResult.rows;
  } catch (error) {
    console.log(error);
    console.error("Erro ao modificar um produto no banco de dados");
    return null;
  } finally {
    connection.release();
  }
}

export default {
  createProduto,
  readProdutos,
  readProduto,
  updateProduto,
  functionAllExisting,
  deleteProduto,
};
