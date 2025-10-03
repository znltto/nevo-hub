const db = require('../database/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
    }

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.get(sql, [username], (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Erro no servidor.', error: err.message });
        }
        // Se o usuário não for encontrado
        if (!user) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
        }

        // Compara a senha enviada com a senha criptografada no banco
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
        }

        // Se a senha estiver correta, gera o token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '8h' } // Token expira em 8 horas
        );

        res.status(200).json({
            message: 'Login bem-sucedido!',
            token,
            user: { id: user.id, username: user.username, role: user.role }
        });
    });
};