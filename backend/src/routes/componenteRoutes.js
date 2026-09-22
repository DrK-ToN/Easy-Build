// src/routes/componenteRoutes.js
const express = require('express');
const router = express.Router();
const componenteController = require('../controllers/componenteController');

// Rota GET: /api/dados
router.get('/dados', componenteController.getTodosComponentes);

module.exports = router;
