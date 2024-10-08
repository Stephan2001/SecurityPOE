const express = require('express');
const {createPayment, getPayment, getPayments} = require('../Controllers/PaymentController')

const router = express.Router();

router.get('/', getPayments);
router.post('/', createPayment);
router.get('/:id', getPayment);

module.exports = router;