const express = require('express')
const PermitController = require('../controllers/PermitController')
const permitRouter = express.Router()

permitRouter.post('/contact-info', PermitController.contacts)
permitRouter.post('/truck', PermitController.truckData)
permitRouter.post('/route', PermitController.routeData)
permitRouter.get('/get-exit-points', PermitController.getExitPoints)
permitRouter.get('/get-start-points', PermitController.getStartPoints)
permitRouter.get('/get-weights', PermitController.getWeights)
permitRouter.get('/get-us-states', PermitController.getUsStates)
permitRouter.get('/get-canada-states', PermitController.getCanadaStates)
permitRouter.post('/get-distance-and-price', PermitController.getTotalPriceAndDistance)

module.exports = permitRouter
