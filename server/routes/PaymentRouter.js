const express = require('express')
const PaymentController = require('../controllers/PaymentController')
const paymentRouter = express.Router()

paymentRouter.post('/send-payment', PaymentController.sendPayment)

module.exports = paymentRouter
