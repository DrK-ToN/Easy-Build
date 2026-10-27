const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        purpose: { type: String, default: 'JOGO' },
        budget: { type: Number, default: 4500 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Profile', ProfileSchema);
