const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Rota para criar um novo usuário
// POST /api/users
router.post('/users', UserController.create);

module.exports = router;