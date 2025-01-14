import pg from 'pg'

// Retorna uma conexão com a database fergalicci
async function connect() {

    // Se pool existir, retorne a mesma conexão
    if(global.connection){
        return global.connection.connect()
    }

    // Caso contrário, crie e retorne uma nova conexão
    const pool = new pg.pool({
        connectionString: "postgres://postgres:postgres@localhost:5432/fergalicci"
    });
    global.connection = pool;

    return pool.connect();
}

export default { connect }