const mysql = require('mysql2/promise');

let db;
async function conectar() {
    try {
        db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Karvalop.2018',
            database: 'spa1'
        });
        console.log('Conectado a MySQL');
        return db;
    } catch (e) {
        console.log('Error BD:', e.message);
        throw e;
    }
}

async function query(sql, params = []) {
    const conn = await conectar();
    return await conn.execute(sql, params);
}

module.exports = { conectar, query };