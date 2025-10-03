const db = require('./db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL CHECK(role IN ('FUNCIONARIO', 'ADMINISTRADOR'))
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar a tabela users', err.message);
        } else {
            console.log('Tabela "users" criada ou já existente.');
        }
    });
});

db.close();