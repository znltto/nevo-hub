const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors()); // Permite requisições de outras origens (seu front-end)
app.use(express.json()); // Permite que o express entenda requisições com corpo em JSON

// Rotas
app.use('/api', userRoutes);
app.use('/api', authRoutes);

module.exports = app;