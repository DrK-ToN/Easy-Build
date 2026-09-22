// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // 1. Importa o Mongoose
require('dotenv').config(); // 2. Carrega as variáveis do .env
const dns = require('dns');

const componenteRoutes = require('./src/routes/componenteRoutes');

// Força o Node.js a usar o DNS do Google para evitar o erro ECONNREFUSED no querySrv
dns.setServers(['8.8.8.8', '8.8.4.4']);
const app = express();
app.use(cors());
app.use(express.json());

// 3. Conecta ao MongoDB Atlas usando a string segura
mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('✅ Conectado ao MongoDB Atlas com sucesso!');
    })
    .catch((err) => {
        console.error('❌ Erro ao conectar no Atlas:', err);
    });

// Usando as rotas da API com o prefixo /api
app.use('/api', componenteRoutes);

// Rota de teste
app.get('/api/status', (req, res) => {
    res.json({ status: 'API e Banco de Dados online!' });
});

app.listen(3000, () => {
    console.log('API do Easy Build rodando em http://localhost:3000');
});
