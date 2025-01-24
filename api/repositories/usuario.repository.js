import database from "./database.js";

async function createUsuario(userData) {
  const connection = await database.connect();
  let resultRows = null;
  const query =
    'INSERT INTO "Usuario" ("nomeUsuario", email, senha) VALUES ($1, $2, $3) RETURNING *';

  try {
    // Tenta fazer a query no banco de dados;
    const queryResult = await connection.query(query, [
      userData.nomeUsuario,
      userData.email,
      userData.senha,
    ]);
    resultRows = queryResult.rows;
    delete resultRows[0].senha;
    delete resultRows[0].idUsuario;
    /* v8 ignore next 4*/
  } catch (error) {
    // Em caso de erro, imprime no console o traceback e onde no código ocorreu o erro;
    console.log(error);
    console.error("Erro ao cadastrar um dos clientes no banco de dados");
  } finally {
    connection.release();
  }

  return resultRows;
}

async function existsEmail(email) {
  const connection = await database.connect();
  let resultRows = null;
  const query =
    'SELECT EXISTS (SELECT email FROM "Usuario" WHERE email=$1 limit 1)';

  try {
    // Tenta fazer a query no banco de dados;
    const queryResult = await connection.query(query, [email]);
    resultRows = queryResult.rows[0];
    /* v8 ignore next 3*/
  } catch (error) {
    // Em caso de erro, imprime no console o traceback e onde no código ocorreu o erro;
    console.error("Erro ao consultar email no banco de dados");
  } finally {
    connection.release();
  }

  return resultRows.exists;
}

async function loginUsuario(credenciais) {
  const connection = await database.connect();
  let result = null;
  const query =
    'SELECT "idUsuario", email, senha FROM "Usuario" WHERE email=$1';

  try {
    // Tenta fazer a query no banco de dados;
    const queryResult = await connection.query(query, [credenciais.email]);
    if (queryResult.rows[0]) {
      result = queryResult.rows[0];
    }
  } catch (error) {
    // Em caso de erro, imprime no console o traceback e onde no código ocorreu o erro;
    console.log(error);
    console.error("Erro ao consultar email no banco de dados");
  } finally {
    connection.release();
  }

  return result;
}

async function updateTokenUsuario(idUsuario, token) {
  const connection = await database.connect();
  const query = 'UPDATE "Usuario" SET "token" = $1 WHERE "idUsuario" = $2';

  try {
    await connection.query(query, [token, idUsuario]);
  } catch (error) {
    console.log(error);
    console.error("Erro ao modificar um produto no banco de dados");
  } finally {
    connection.release();
  }

  return { mensagem: "Token de usuário atualizado com sucesso" };
}

export default { createUsuario, existsEmail, loginUsuario, updateTokenUsuario };
