const express = require('express')
const PaymentController = require('../controllers/PaymentController')
const paymentRouter = express.Router()

paymentRouter.post('/send-payment', PaymentController.sendPayment)
paymentRouter.post('/show-list', PaymentController.showList)
paymentRouter.post('/refund', PaymentController.refund)

module.exports = paymentRouter
