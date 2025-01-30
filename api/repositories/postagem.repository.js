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
    resultRows = queryResult.rows[0];
  } catch (error) {
    console.log(error);
    console.error("Erro ao cadastrar um postagem no banco de dados");
    return null;
  } finally {
    connection.release();
  }

  const relacoes = await createRelacoesProdPost(
    postagem,
    resultRows.idPostagem
  );

  if (!relacoes) {
    console.error("Erro ao cadastrar um postagem no banco de dados");
    return null;
  }

  return { resultRows, relacoes };
}

async function createRelacoesProdPost(postagem, idPostagem) {
  const connection = await database.connect();
  let resultRows = null;

  let insersoes = ``;
  postagem.produtos.map((idProduto, i, { length }) => {
    if (length - 1 === i) {
      // Primeiras inserções
      insersoes += `(${idProduto}, ${idPostagem})`;
    } else {
      // ulrima inserção
      insersoes += `(${idProduto}, ${idPostagem}),`;
    }
  });

  const query = `INSERT INTO "ProdutosDePostagem" ("idProduto", "idPostagem")
  VALUES ${insersoes} RETURNING *`;

  try {
    const queryResult = await connection.query(query);
    resultRows = queryResult.rows;
  } catch (error) {
    console.log(error);
    console.error("Erro ao cadastrar relações da postagem no banco de dados");
    return null;
  } finally {
    connection.release();
  }

  return resultRows;
}

async function readPostagens() {
  const connection = await database.connect();
  let resultRows = null;

  try {
    const result = await connection.query(`
      SELECT p.*, array_agg(pd."idProduto") AS produtos
      FROM "Postagem" p
      LEFT JOIN "ProdutosDePostagem" pd ON p."idPostagem" = pd."idPostagem"
      GROUP BY p."idPostagem"
      ORDER BY p."idPostagem" DESC
    `);
    resultRows = result.rows;
  } catch (erro) {
    console.log(erro);
    console.error("Houve um erro ao consultar postagens no banco de dados");
    return null;
  } finally {
    connection.release();
  }

  return resultRows;
}

async function readPostagem(idPostagem) {
  const connection = await database.connect();
  let resultRows = null;

  try {
    const result = await connection.query(
      `SELECT * FROM "Postagem" WHERE "idPostagem" = $1`,
      [idPostagem]
    );
    resultRows = result.rows[0];
  } catch (erro) {
    console.log(erro);
    console.error("Houve um erro ao consultar postagem no banco de dados");
    return null;
  } finally {
    connection.release();
  }

  return resultRows;
}

async function deletePostagem(idPostagem) {
  const connection = await database.connect();
  let resultRows = null;

  try {
    await connection.query(
      `DELETE FROM "ProdutosDePostagem" WHERE "idPostagem" = $1`,
      [idPostagem]
    );

    const queryResult = await connection.query(
      `DELETE FROM "Postagem" WHERE "idPostagem" = $1 RETURNING *`,
      [idPostagem]
    );
    resultRows = queryResult.rows[0];
  } catch (error) {
    console.log(error);
    console.error("Erro ao buscar a postagem no banco de dados");
    return null;
  } finally {
    connection.release();
  }

  return resultRows;
}

async function temDependencias(idProduto) {
  const connection = await database.connect();
  let resultRows = null;

  try {
    const queryResult = await connection.query(
      `SELECT * FROM "ProdutosDePostagem" WHERE "idProduto" = $1 LIMIT 1`,
      [idProduto]
    );
    return queryResult.rows;
  } catch (error) {
    console.log(error);
    console.error("Erro ao buscar dependências do produto no banco de dados");
    return [];
  } finally {
    connection.release();
  }
}

async function readDependencias() {
  const connection = await database.connect();
  let resultRows = null;

  try {
    const queryResult = await connection.query(
      `SELECT * FROM "ProdutosDePostagem"`
    );
    resultRows = queryResult.rows;
  } catch (error) {
    console.log(error);
    console.error("Erro ao buscar dependências no banco de dados");
    return null;
  } finally {
    connection.release();
  }

  return resultRows;
}

export default {
  createPostagem,
  readPostagens,
  deletePostagem,
  readPostagem,
  temDependencias,
  readDependencias,
};
