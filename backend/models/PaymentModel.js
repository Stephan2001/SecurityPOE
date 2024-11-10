const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const paymentSchema = new Schema(
  {
    AccountNumber: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/, // Ensure it contains exactly 10 digits
      minlength: 10,
      maxlength: 10,
    },
    currency: {
      type: String,
      required: true,
      enum: ['USD', 'EUR', 'GBP', 'AUD', 'CAD', 'ZAR'],
      minlength: 3,
      maxlength: 3,
    },
    amount: {
      type: Number,
      required: true,
      min: 0, // Ensure the amount is not negative
    },
    provider: {
      type: String,
      required: true,
      match: /^[A-Za-z\s]+$/, // Letters and spaces only
      minlength: 3,
      maxlength: 50,
    },
    swiftCode: {
      type: String,
      required: true,
      match: /^[A-Za-z0-9]{8,11}$/, // Adjust regex for SWIFT code validation
      minlength: 8,
      maxlength: 11,
    },
    confirmed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
)

// sanitization
paymentSchema.pre('save', function (next) {
  // Sanitize AccountNumber and provider
  this.AccountNumber = validator.escape(this.AccountNumber)
  this.provider = validator.escape(this.provider)
  next()
})

paymentSchema.post('save', function (error, doc, next) {
  if (error) {
    if (error.name === 'ValidationError') {
      next(new Error('Payment validation failed: ' + error.message))
    } else {
      next(error)
    }
  } else {
    next()
  }
})

module.exports = mongoose.model('Payment', paymentSchema)
