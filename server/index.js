const express = require('express')
const app = express()
const permitRouter = require('./routes/PermitRouter')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/permit", permitRouter)

require('dotenv').config()

app.listen(5000)