const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const dotenv = require("dotenv")
const readings = require("./model")

dotenv.config({path: '../.env'})
app = express()
app.use(cors())
app.use(express.urlencoded({extended:false}))

mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})

app.get('/readings', async (req, res) => {
    try {
        const entries = await readings.find().sort({_id:-1}).limit(parseInt(req.query.limit))
        res.json(entries)
    } catch (err) {
        res.json({message: err})
    }
})

app.listen(process.env.SERVERPORT)