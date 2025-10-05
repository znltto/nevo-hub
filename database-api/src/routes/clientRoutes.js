const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');

// Rotas CRUD para /api/clients
router.post('/clients', ClientController.create);        // Criar
router.get('/clients', ClientController.list);          // Listar todos
router.get('/clients/:id', ClientController.getById);   // Buscar um
router.put('/clients/:id', ClientController.update);      // Atualizar
router.delete('/clients/:id', ClientController.remove); // Deletar

module.exports = router;