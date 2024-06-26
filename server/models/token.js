const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true }
});

const token = mongoose.model('Token', tokenSchema);

module.exports = token;