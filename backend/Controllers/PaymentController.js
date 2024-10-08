const Payment = require('../models/PaymentModel');
const mongoose = require('mongoose');

// Create new payment
const createPayment = async (req, res) => {
    console.log('Request Body:', req.body);
    const { AccountNumber, currency, amount, provider } = req.body; // Destructure to match your model

    try {
        const payment = await Payment.create({ AccountNumber, currency, amount, provider });
        res.status(201).json(payment); // Use 201 for created resource
    } catch (error) {
        // Handle validation errors specifically
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find({}).sort({ createdAt: -1 });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

const getPayment = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    try {
        const payment = await Payment.findById(id);
        if (!payment) {
            return res.status(404).json({ error: 'Could not find such payment' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createPayment,
    getPayments,
    getPayment
};
