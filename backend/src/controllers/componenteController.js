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

// Cria um novo componente
const criarComponente = async (req, res) => {
    try {
        const novoComponente = new Componente(req.body);
        const salvo = await novoComponente.save();
        res.status(201).json(salvo);
    } catch (error) {
        console.error('Erro ao criar componente:', error);
        res.status(400).json({ erro: error.message });
    }
};

// Atualiza um componente existente pelo _id do MongoDB
const atualizarComponente = async (req, res) => {
    try {
        const atualizado = await Componente.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!atualizado) {
            return res.status(404).json({ erro: 'Componente não encontrado' });
        }
        res.json(atualizado);
    } catch (error) {
        console.error('Erro ao atualizar componente:', error);
        res.status(400).json({ erro: error.message });
    }
};

// Deleta um componente pelo _id do MongoDB
const deletarComponente = async (req, res) => {
    try {
        const deletado = await Componente.findByIdAndDelete(req.params.id);
        if (!deletado) {
            return res.status(404).json({ erro: 'Componente não encontrado' });
        }
        res.json({ mensagem: 'Componente deletado com sucesso', id: req.params.id });
    } catch (error) {
        console.error('Erro ao deletar componente:', error);
        res.status(500).json({ erro: 'Erro interno ao deletar componente' });
    }
};

// ── LearnCards ────────────────────────────────────────────────────────────────

// Adiciona um LearnCard a um componente
const adicionarLearnCard = async (req, res) => {
    try {
        const comp = await Componente.findById(req.params.id);
        if (!comp) return res.status(404).json({ erro: 'Componente não encontrado' });

        comp.learnCards.push(req.body);
        await comp.save();
        res.status(201).json(comp.learnCards[comp.learnCards.length - 1]);
    } catch (error) {
        console.error('Erro ao adicionar card:', error);
        res.status(400).json({ erro: error.message });
    }
};

// Atualiza um LearnCard específico de um componente
const atualizarLearnCard = async (req, res) => {
    try {
        const comp = await Componente.findById(req.params.compId);
        if (!comp) return res.status(404).json({ erro: 'Componente não encontrado' });

        const card = comp.learnCards.id(req.params.cardId);
        if (!card) return res.status(404).json({ erro: 'Card não encontrado' });

        Object.assign(card, req.body);
        await comp.save();
        res.json(card);
    } catch (error) {
        console.error('Erro ao atualizar card:', error);
        res.status(400).json({ erro: error.message });
    }
};

// Deleta um LearnCard específico de um componente
const deletarLearnCard = async (req, res) => {
    try {
        const comp = await Componente.findById(req.params.compId);
        if (!comp) return res.status(404).json({ erro: 'Componente não encontrado' });

        const card = comp.learnCards.id(req.params.cardId);
        if (!card) return res.status(404).json({ erro: 'Card não encontrado' });

        card.deleteOne();
        await comp.save();
        res.json({ mensagem: 'Card deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar card:', error);
        res.status(500).json({ erro: error.message });
    }
};

module.exports = {
    getTodosComponentes,
    criarComponente,
    atualizarComponente,
    deletarComponente,
    adicionarLearnCard,
    atualizarLearnCard,
    deletarLearnCard,
};
