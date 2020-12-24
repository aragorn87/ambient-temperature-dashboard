const SerialPort = require("serialport")
const Readline = require('@serialport/parser-readline')

const { Double } = require('mongodb');
const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const readings = require("./model")
const dotenv = require("dotenv")

dotenv.config({path: '../.env'})

const parser = new Readline()
const myPort = new SerialPort("COM3", {
    baudRate: 9600,
})

let timestamp, reading

function onData(data) {
    timestamp = Date.now()
    reading = new readings({ ts:timestamp , value: data});
    reading.save().then(() => console.log('added'));    
}

mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
myPort.pipe(parser)
parser.on("data", onData)