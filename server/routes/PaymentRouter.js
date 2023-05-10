const express = require('express')
const PaymentRouter = require('../controllers/PaymentController')
const paymentRouter = express.Router()

paymentRouter.post('/send-payment', PaymentRouter.sendPayment)

module.exports = paymentRouter
