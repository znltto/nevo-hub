const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Rota para fazer login
// POST /api/login
router.post('/login', AuthController.login);

module.exports = router;