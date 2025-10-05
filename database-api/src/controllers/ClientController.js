const db = require('../database/db');

// CREATE
exports.create = (req, res) => {
    const { type, name, document, email, phone } = req.body;
    if (!type || !name || !document) {
        return res.status(400).json({ message: 'Tipo, Nome/Razão Social e CPF/CNPJ são obrigatórios.' });
    }
    const sql = `INSERT INTO clients (type, name, document, email, phone) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [type, name, document, email, phone], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(409).json({ message: 'CPF/CNPJ já cadastrado.' });
            }
            return res.status(500).json({ message: 'Erro ao cadastrar cliente.', error: err.message });
        }
        res.status(201).json({ id: this.lastID, type, name, document, email, phone });
    });
};

// READ (Listar Todos)
exports.list = (req, res) => {
    const sql = "SELECT * FROM clients ORDER BY name";
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar clientes.', error: err.message });
        }
        res.status(200).json(rows);
    });
};

// READ (Buscar por ID)
exports.getById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM clients WHERE id = ?";
    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar cliente.', error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Cliente não encontrado.' });
        }
        res.status(200).json(row);
    });
};

// UPDATE
exports.update = (req, res) => {
    const { id } = req.params;
    // Adicione os novos campos aqui
    const { type, name, document, email, phone, birth_date, fantasy_name } = req.body;
    
    const sql = `
        UPDATE clients 
        SET type = ?, name = ?, document = ?, email = ?, phone = ?, birth_date = ?, fantasy_name = ?
        WHERE id = ?
    `;
    
    db.run(sql, [type, name, document, email, phone, birth_date, fantasy_name, id], function(err) {
        if (err) return res.status(500).json({ message: 'Erro ao atualizar cliente.', error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Cliente não encontrado.' });
        res.status(200).json({ message: 'Cliente atualizado com sucesso.' });
    });
};

// DELETE
exports.remove = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM clients WHERE id = ?';
    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Erro ao excluir cliente.', error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado.' });
        }
        res.status(200).json({ message: 'Cliente excluído com sucesso.' });
    });
};