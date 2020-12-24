const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

app = express()
app.use(cors())
mongoose.connect('mongodb://localhost:27017/sensordata', {useNewUrlParser: true, useUnifiedTopology: true});

const readings = mongoose.model('temperature', { ts: Number, value: mongoose.Types.Decimal128 });

app.get('/readings', async (req, res) => {
    try {
        const entries = await readings.find().sort({_id:-1}).limit(1000)
        res.json(entries)
    } catch (err) {
        res.json({message: err})
    }
})

app.listen(3000)