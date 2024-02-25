const express = require('express')
const generateChatCompletion = require('../controllers/chat-controller')
const chatRoutes = express.Router()

chatRoutes.post("/new", generateChatCompletion)

module.exports = chatRoutes