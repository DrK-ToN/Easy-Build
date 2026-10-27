const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
const Build = require('../models/Build');
const { verifyCompatibility } = require('../utils/compatibility');

const KB_PATH = path.join(__dirname, '..', 'kb', 'components.json');

// Função auxiliar para carregar componentes
function loadKB() {
    try {
        const raw = fs.readFileSync(KB_PATH, 'utf8');
        return JSON.parse(raw);
    } catch (e) {
        console.error('Erro ao ler KB:', e);
        return [];
    }
}

// GET /api/builds/kb - Base de componentes para montagem
router.get('/kb', (req, res) => {
    const data = loadKB();
    res.json(data);
});

// POST /api/builds/verify - Valida compatibilidade
router.post('/verify', (req, res) => {
    const { componentIds } = req.body;
    if (!componentIds || !Array.isArray(componentIds)) {
        return res.status(400).json({ error: 'componentIds deve ser um array de IDs' });
    }
    const kb = loadKB();
    const selected = componentIds.map((id) => kb.find((c) => c.id === id)).filter(Boolean);
    const report = verifyCompatibility(selected);
    res.json(report);
});

// GET /api/builds/recent - Builds salvas do usuário logado
router.get('/recent', auth, async (req, res) => {
    try {
        const builds = await Build.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(20);
        res.json(
            builds.map((b) => ({
                id: b._id.toString(),
                name: b.name,
                created_at: b.createdAt,
                components: b.components || [],
            }))
        );
    } catch (err) {
        console.error('Erro ao listar builds:', err);
        res.status(500).json({ error: 'Erro ao buscar builds do usuário' });
    }
});

// POST /api/builds - Salvar nova build
router.post('/', auth, async (req, res) => {
    try {
        const { name, componentIds } = req.body;
        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'Nome da build é obrigatório' });
        }
        if (!componentIds || !Array.isArray(componentIds) || componentIds.length === 0) {
            return res.status(400).json({ error: 'Selecione pelo menos um componente' });
        }

        const build = new Build({
            user: req.user.id,
            name: name.trim(),
            components: componentIds,
        });
        await build.save();

        res.status(201).json({ message: 'Build salva com sucesso!', buildId: build._id.toString() });
    } catch (err) {
        console.error('Erro ao salvar build:', err);
        res.status(500).json({ error: 'Erro ao salvar build: ' + err.message });
    }
});

// GET /api/builds/compare?id1=...&id2=... - Comparar duas builds
router.get('/compare', auth, async (req, res) => {
    try {
        const { id1, id2 } = req.query;
        if (!id1 || !id2) {
            return res.status(400).json({ error: 'IDs das builds não fornecidos' });
        }

        const b1 = await Build.findById(id1);
        const b2 = await Build.findById(id2);

        if (!b1 || !b2) {
            return res.status(404).json({ error: 'Uma ou ambas as builds não foram encontradas' });
        }

        const kb = loadKB();
        const compMap = {};
        for (const item of kb) {
            compMap[item.id] = item.type;
        }

        const build1 = (b1.components || []).map((id) => ({
            component_id: id,
            type: compMap[id] || 'outro',
        }));

        const build2 = (b2.components || []).map((id) => ({
            component_id: id,
            type: compMap[id] || 'outro',
        }));

        res.json({ build1, build2 });
    } catch (err) {
        console.error('Erro na comparação:', err);
        res.status(500).json({ error: 'Erro ao comparar builds: ' + err.message });
    }
});

module.exports = router;
