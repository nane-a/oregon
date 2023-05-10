const express = require('express')
const cors = require('cors')
const app = express()
const permitRouter = require('./routes/PermitRouter')

require('dotenv').config()

const whitelist = ["http://localhost:3000"]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/permit", permitRouter)


app.listen(5000)