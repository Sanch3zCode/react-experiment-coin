const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    transactions: [{
        type: { type: String, required: true },
        from: { type: String, required: true },
        to: { type: String, required: true },
        total: { type: Number, required: true },
        date: { type: String, required: true }
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;