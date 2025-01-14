import database from './database.js'

async function createUsuario(userData) {
    const connection = await database.connect()
    let resultRows = null;
    const query = 'INSERT INTO "Usuario" ("nomeUsuario", email, senha) VALUES ($1, $2, $3) RETURNING *';

        try {
            // Tenta fazer a query no banco de dados;
            const queryResult = await connection.query(query,
                [userData.nomeUsuario, userData.email, userData.senha]);
            resultRows = queryResult.rows;
        } catch (error) {
            // Em caso de erro, imprime no console o traceback e onde no código ocorreu o erro;
            console.log(error);
            console.error("Erro ao cadastrar um dos clientes no banco de dados");
        } finally {
            connection.release();
        }
    
        return resultRows;

}

export default { createUsuario }