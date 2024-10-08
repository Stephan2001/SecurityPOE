const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    AccountNumber: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'EUR', 'GBP', 'AUD', 'CAD']
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    provider: {
        type: String,
        required: true,
        match: /^[A-Za-z\s]+$/
    }
}, {timestamps: true})

module.exports = mongoose.model('Payment', paymentSchema);