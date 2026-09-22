const mongoose = require('mongoose');

// Sub-esquema para a parte de Aprendizado
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

        // Objeto aninhado para aprendizado
        learn: LearnSchema,
    },
    { timestamps: true },
);

module.exports = mongoose.model('Componente', ComponenteSchema);