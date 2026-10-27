const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');

// GET /api/profile/me - Retorna perfil do usuário logado
router.get('/me', auth, async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            profile = { purpose: 'JOGO', budget: 4500 };
        }
        res.json({
            purpose: profile.purpose || 'JOGO',
            budget: profile.budget || 4500,
        });
    } catch (err) {
        console.error('Erro ao buscar perfil:', err);
        res.status(500).json({ error: 'Erro ao buscar perfil' });
    }
});

// POST /api/profile - Atualiza objetivo e orçamento
router.post('/', auth, async (req, res) => {
    try {
        const { purpose, budget } = req.body;
        const updated = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { purpose: purpose || 'JOGO', budget: Number(budget) || 4500 },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        res.json({ message: 'Perfil salvo com sucesso!', profile: updated });
    } catch (err) {
        console.error('Erro ao salvar perfil:', err);
        res.status(500).json({ error: 'Erro ao salvar perfil: ' + err.message });
    }
});

module.exports = router;
