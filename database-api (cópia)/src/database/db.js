const sqlite3 = require('sqlite3').verbose();

// O ':memory:' cria um banco em memória. Para salvar em arquivo, use o caminho:
const dbPath = './src/database/hub_database.db';

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

module.exports = db;