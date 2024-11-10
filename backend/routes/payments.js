const express = require('express')
const {
  createPayment,
  getPayment,
  getPayments,
  updatePaymentConfirmation,
} = require('../Controllers/PaymentController')
const ExpressBrute = require('express-brute')
const store = new ExpressBrute.MemoryStore()

const bruteforcePayment = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 1000 * 60,
  maxWait: 1000 * 60 * 10,
  lifetime: 1000 * 60 * 10,
})

const router = express.Router()

router.get('/', getPayments)
router.post('/', bruteforcePayment.prevent, createPayment)
router.get('/:id', getPayment)
router.put('/:id/confirm', updatePaymentConfirmation)

module.exports = router
