const mongoose = require('mongoose');

const BuildSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true, trim: true },
        components: [{ type: String, required: true }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Build', BuildSchema);
