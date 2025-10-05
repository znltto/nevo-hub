const db = require('../database/db');
const bcrypt = require('bcryptjs');

exports.create = (req, res) => {
    const { username, password, role } = req.body;

    // Validação
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    if (!['FUNCIONARIO', 'ADMINISTRADOR'].includes(role)) {
        return res.status(400).json({ message: 'O cargo (role) é inválido.' });
    }

    // Criptografa a senha antes de salvar
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.run(sql, [username, hashedPassword, role], function(err) {
        if (err) {
            // Trata o caso de username já existir
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(409).json({ message: 'Nome de usuário já existe.' });
            }
            return res.status(500).json({ message: 'Erro ao criar usuário.', error: err.message });
        }
        res.status(201).json({ id: this.lastID, username, role });
    });
};