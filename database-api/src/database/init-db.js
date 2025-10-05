const db = require('./db');

db.serialize(() => {
    // Tabela de usuários
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

    // Tabela de clientes
    db.run(`
        CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL CHECK(type IN ('Pessoa Física', 'Pessoa Jurídica', 'Estrangeiro')),
            name TEXT NOT NULL,
            document TEXT UNIQUE NOT NULL,
            email TEXT,
            phone TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar a tabela clients', err.message);
        } else {
            console.log('Tabela "clients" criada ou já existente.');
        }
    });

    db.run(`
        CREATE TABLE IF NOT EXISTS addresses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_id INTEGER NOT NULL,
            cep TEXT NOT NULL,
            street TEXT NOT NULL,
            number TEXT,
            complement TEXT,
            neighborhood TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar a tabela addresses', err.message);
        } else {
            console.log('Tabela "addresses" criada ou já existente.');
        }
    });

    db.run('ALTER TABLE clients ADD COLUMN birth_date TEXT', () => {});
    db.run('ALTER TABLE clients ADD COLUMN fantasy_name TEXT', () => {});

});

db.close(() => {
    console.log('Conexão com o banco de dados fechada.');
});