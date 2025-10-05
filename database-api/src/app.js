
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const addressRoutes = require('./routes/addressRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', clientRoutes);
app.use('/api', addressRoutes);

module.exports = app;