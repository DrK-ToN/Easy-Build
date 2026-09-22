const mongoose = require('mongoose');

// Sub-esquema para a parte de Aprendizado (legado — mantido para retrocompatibilidade)
const LearnSchema = new mongoose.Schema(
    {
        explain: { type: String, required: true },
        analogy: { type: String, required: true },
        fact: { type: String, required: true },
    },
    { _id: false },
);

// Sub-esquema para os dados de Montagem (Intel ou AMD)
const BuildPlatformSchema = new mongoose.Schema(
    {
        specs: [{ type: String }], // Array de strings
        tip: { type: String, required: true },
    },
    { _id: false },
);

// Sub-esquema para cada card de aprendizado detalhado
const LearnCardSchema = new mongoose.Schema(
    {
        titulo: { type: String, required: true },   // ex: 'O que é placa-mãe?'
        conteudo: { type: String, required: true },  // texto explicativo (pode conter HTML)
        icone: { type: String, default: '📋' },      // emoji ou ícone para o card
        ordem: { type: Number, default: 0 },         // controla a ordem de exibição
    },
);

// Esquema Principal do Componente
const ComponenteSchema = new mongoose.Schema(
    {
        id_slug: { type: String, required: true, unique: true }, // ex: 'placa-mae'
        code: { type: String, required: true }, // ex: 'MB'
        name: { type: String, required: true },
        icon: { type: String, required: true },
        blurb: { type: String, required: true },

        // Objeto aninhado para montagem
        build: {
            intel: BuildPlatformSchema,
            amd: BuildPlatformSchema,
        },

        // Objeto aninhado para aprendizado (legado)
        learn: LearnSchema,

        // Array de cards de aprendizado detalhado (novo)
        learnCards: [LearnCardSchema],
    },
    { timestamps: true },
);

module.exports = mongoose.model('Componente', ComponenteSchema);