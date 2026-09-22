// src/routes/componenteRoutes.js
const express = require('express');
const router = express.Router();
const componenteController = require('../controllers/componenteController');

// Middleware de autenticação para rotas admin
const autenticarAdmin = (req, res, next) => {
    const senha = req.headers['x-admin-password'];
    if (!senha || senha !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ erro: 'Acesso não autorizado' });
    }
    next();
};

// Rota pública GET: /api/dados
router.get('/dados', componenteController.getTodosComponentes);

// Rotas protegidas admin — Componentes
router.post('/admin/componente', autenticarAdmin, componenteController.criarComponente);
router.put('/admin/componente/:id', autenticarAdmin, componenteController.atualizarComponente);
router.delete('/admin/componente/:id', autenticarAdmin, componenteController.deletarComponente);

// Rotas protegidas admin — LearnCards (sub-documentos)
router.post('/admin/componente/:id/card', autenticarAdmin, componenteController.adicionarLearnCard);
router.put('/admin/componente/:compId/card/:cardId', autenticarAdmin, componenteController.atualizarLearnCard);
router.delete('/admin/componente/:compId/card/:cardId', autenticarAdmin, componenteController.deletarLearnCard);

module.exports = router;

