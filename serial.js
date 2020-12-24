const SerialPort = require("serialport")
const Readline = require('@serialport/parser-readline')

const { Double } = require('mongodb');
const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sensordata', {useNewUrlParser: true, useUnifiedTopology: true});

const readings = mongoose.model('temperature', { ts: Number, value: mongoose.Types.Decimal128 });



const myPort = new SerialPort("COM3", {
    baudRate: 9600,
})

const parser = new Readline()
let timestamp = Date.now()

myPort.pipe(parser)

parser.on("data", onData)

// myPort.on('open', onOpen)
// // myPort.on('data', onData)

// function onOpen() {
//     console.log("Open connection")
// }

function onData(data) {
    timestamp = Date.now()
    console.log(timestamp, data)
    let reading = new readings({ ts:timestamp , value: data});
    reading.save().then(() => console.log('added'));    
}