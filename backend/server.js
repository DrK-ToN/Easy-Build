// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const dns = require('dns');

const componenteRoutes = require('./src/routes/componenteRoutes');
const authRoutes = require('./src/routes/authRoutes');
const buildRoutes = require('./src/routes/buildRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const chatRoutes = require('./src/routes/chatRoutes');

// Força o Node.js a usar DNS do Google para evitar ECONNREFUSED em querySrv do Atlas
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
app.use(cors());
app.use(express.json());

// Conexão ao MongoDB Atlas
mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('✅ Conectado ao MongoDB Atlas com sucesso!');
    })
    .catch((err) => {
        console.error('❌ Erro ao conectar no Atlas:', err);
    });

// Rotas originais de componentes e admin
app.use('/api', componenteRoutes);

// Rotas integradas do ecossistema Easy Build
app.use('/api/auth', authRoutes);
app.use('/api/builds', buildRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/chat', chatRoutes);

// Rota de status e verificação
app.get('/api/status', (req, res) => {
    res.json({
        status: 'API do Easy Build e Banco de Dados online!',
        version: '2.0.0',
        modules: ['auth', 'builds', 'components', 'profile', 'chat'],
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 API do Easy Build rodando em http://localhost:${PORT}`);
});
