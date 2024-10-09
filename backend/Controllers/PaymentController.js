const Payment = require('../models/PaymentModel');
const mongoose = require('mongoose');

// Create new payment
const createPayment = async (req, res) => {
    const { AccountNumber, currency, amount, provider, swiftCode } = req.body;

    // Input validation and sanitization
    if (!AccountNumber || !validator.matches(AccountNumber, /^[0-9]{10}$/)) {
        return sendErrorResponse(res, 400, 'Invalid Account Number: Must be exactly 10 digits.');
    }
    if (!currency || !['USD', 'EUR', 'GBP', 'AUD', 'CAD', 'ZAR'].includes(currency)) {
        return sendErrorResponse(res, 400, 'Invalid currency: Must be one of USD, EUR, GBP, AUD, CAD, ZAR.');
    }
    if (amount === undefined || amount < 0) {
        return sendErrorResponse(res, 400, 'Invalid amount: Must be a non-negative number.');
    }
    if (!provider || !validator.matches(provider, /^[A-Za-z\s]+$/) || provider.length < 3 || provider.length > 50) {
        return sendErrorResponse(res, 400, 'Invalid provider: Must be letters only and 3-50 characters long.');
    }
    if (!swiftCode || !validator.matches(swiftCode, /^[A-Za-z0-9]{8,11}$/)) {
        return sendErrorResponse(res, 400, 'Invalid SWIFT code: Must be 8 to 11 alphanumeric characters.');
    }

    try {
        // Create the payment after validation
        const payment = await Payment.create({ 
            AccountNumber: validator.escape(AccountNumber),
            currency,
            amount,
            provider: validator.escape(provider),
            swiftCode: validator.escape(swiftCode)
        });
        res.status(201).json(payment); // Use 201 for created resource
    } catch (error) {
        if (error.name === 'ValidationError') {
            return sendErrorResponse(res, 400, error.message);
        }
        sendErrorResponse(res, 500, 'Internal Server Error');
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
