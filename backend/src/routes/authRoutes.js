const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
        }

        const existing = await User.findOne({ username: username.trim() });
        if (existing) {
            return res.status(400).json({ error: 'Nome de usuário já está em uso' });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = new User({
            username: username.trim(),
            password_hash: hash,
        });
        await user.save();

        // Cria perfil padrão para o novo usuário
        const profile = new Profile({
            user: user._id,
            purpose: 'JOGO',
            budget: 4500,
        });
        await profile.save();

        res.status(201).json({ message: 'Conta criada com sucesso!', userId: user._id });
    } catch (err) {
        console.error('Erro no registro:', err);
        res.status(500).json({ error: 'Erro ao registrar usuário: ' + err.message });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
        }

        const user = await User.findOne({ username: username.trim() });
        if (!user) {
            return res.status(401).json({ error: 'Usuário ou senha incorretos' });
        }

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
            return res.status(401).json({ error: 'Usuário ou senha incorretos' });
        }

        const secret = process.env.JWT_SECRET || 'easybuild_super_secret_jwt_key_2026';
        const token = jwt.sign(
            { id: user._id.toString(), username: user.username, role: user.role },
            secret,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: { id: user._id.toString(), username: user.username },
        });
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ error: 'Erro ao processar login' });
    }
});

module.exports = router;
