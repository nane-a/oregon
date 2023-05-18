const express = require('express')
const ChatController = require('../controllers/ChatController')
const chatRouter = express.Router()

chatRouter.get("/get-messages", ChatController.getMessages)
chatRouter.post("/open-chat", ChatController.openChat)

module.exports = chatRouter
