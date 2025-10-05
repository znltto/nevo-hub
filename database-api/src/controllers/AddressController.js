const db = require('../database/db');

// Criar um novo endereço para um cliente
exports.create = (req, res) => {
    const { client_id, cep, street, number, complement, neighborhood, city, state } = req.body;
    if (!client_id || !cep || !street || !neighborhood || !city || !state) {
        return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    const sql = 'INSERT INTO addresses (client_id, cep, street, number, complement, neighborhood, city, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.run(sql, [client_id, cep, street, number, complement, neighborhood, city, state], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, ...req.body });
    });
};

// Listar todos os endereços de um cliente específico
exports.listByClient = (req, res) => {
    const { clientId } = req.params;
    const sql = "SELECT * FROM addresses WHERE client_id = ?";
    db.all(sql, [clientId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

// UPDATE
exports.update = (req, res) => {
    const { id } = req.params;
    const { cep, street, number, complement, neighborhood, city, state } = req.body;
    const sql = `UPDATE addresses SET cep = ?, street = ?, number = ?, complement = ?, neighborhood = ?, city = ?, state = ? WHERE id = ?`;
    db.run(sql, [cep, street, number, complement, neighborhood, city, state, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Endereço não encontrado.' });
        res.status(200).json({ message: 'Endereço atualizado com sucesso.' });
    });
};

// DELETE
exports.remove = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM addresses WHERE id = ?';
    db.run(sql, [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Endereço não encontrado.' });
        res.status(200).json({ message: 'Endereço excluído com sucesso.' });
    });
};