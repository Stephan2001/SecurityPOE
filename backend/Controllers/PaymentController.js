const Payment = require('../models/PaymentModel')
const mongoose = require('mongoose')
const validator = require('validator')

const updatePaymentConfirmation = async (req, res) => {
  const { id } = req.params

  // Validate if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  try {
    // Find the payment by ID and update the 'confirmed' field to true
    const payment = await Payment.findByIdAndUpdate(
      id,
      { confirmed: true },
      { new: true }
    )

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' })
    }

    res.status(200).json(payment) // Send the updated payment
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Create new payment
const createPayment = async (req, res) => {
  const { AccountNumber, currency, amount, provider, swiftCode } = req.body

  // Input validation and sanitization
  if (!AccountNumber || !validator.matches(AccountNumber, /^[0-9]{10}$/)) {
    return res.status(400).json({
      error: 'Invalid Account Number: Must be exactly 10 digits.',
    })
  }
  if (
    !currency ||
    !['USD', 'EUR', 'GBP', 'AUD', 'CAD', 'ZAR'].includes(currency)
  ) {
    return res.status(400).json({
      error: 'Invalid currency: Must be one of USD, EUR, GBP, AUD, CAD, ZAR.',
    })
  }
  if (amount === undefined || amount < 0) {
    return res.status(400).json({
      error: 'Invalid amount: Must be a non-negative number.',
    })
  }
  if (
    !provider ||
    !validator.matches(provider, /^[A-Za-z\s]+$/) ||
    provider.length < 3 ||
    provider.length > 50
  ) {
    return res.status(400).json({
      error: 'Invalid provider: Must be letters only and 3-50 characters long.',
    })
  }
  if (!swiftCode || !validator.matches(swiftCode, /^[A-Za-z0-9]{8,11}$/)) {
    return res.status(400).json({
      error: 'Invalid SWIFT code: Must be 8 to 11 alphanumeric characters.',
    })
  }

  try {
    // Create the payment after validation
    const payment = await Payment.create({
      AccountNumber: validator.escape(AccountNumber),
      currency,
      amount,
      provider: validator.escape(provider),
      swiftCode: validator.escape(swiftCode),
      confirmed: false, // Set to false explicitly on creation
    })
    res.status(201).json(payment) // Use 201 for created resource
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Get all payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).sort({ createdAt: -1 })
    res.status(200).json(payments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a single payment by ID
const getPayment = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  try {
    const payment = await Payment.findById(id)
    if (!payment) {
      return res.status(404).json({ error: 'Could not find such payment' })
    }
    res.status(200).json(payment)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  createPayment,
  getPayments,
  getPayment,
  updatePaymentConfirmation,
}
