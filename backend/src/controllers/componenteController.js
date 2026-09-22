// src/controllers/componenteController.js
const Componente = require('../models/Componente');

// Retorna todos os componentes (para preencher os grids de montar e aprender)
const getTodosComponentes = async (req, res) => {
    try {
        const componentes = await Componente.find();

        // Transformamos o array do banco em um objeto LEARN equivalente ao seu app original
        const learnMap = {};
        componentes.forEach((c) => {
            if (c.learn) {
                learnMap[c.id] = c.learn;
            }
        });

        res.json({
            components: componentes,
            learn: learnMap,
        });
    } catch (error) {
        console.error('Erro ao buscar componentes:', error);
        res.status(500).json({ erro: 'Erro interno ao buscar componentes' });
    }
};

module.exports = {
    getTodosComponentes,
};
