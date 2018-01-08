const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();

app.use(function (req, res) {
    res.send({
        msg: "hello"
    });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({
    server
});

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


const EventEmitter = require('events').EventEmitter

const eventEmitter = new EventEmitter()

wss.on('connection', function connection(ws, req) {
    const location = url.parse(req.url, true);

    console.log('Server: Connection Established');
    ws.on('close', function () {
        clearInterval(throwHammerInterval);
        console.log('Server: Closing connection');
    });

    eventEmitter.on('sendMessage', function (count) {
        console.log(count);
        ws.send(JSON.stringify({vibrations:count}));
    })
});

server.listen(9030, function listening() {
    console.log('Listening on %d', server.address().port);
});

var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyACM0', { autoOpen: false, baudRate: 9600 });
const Readline = SerialPort.parsers.Readline;
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

port.pipe(parser);
port.open(function (err) {
    if (err) {
        return console.log('Error opening port: ', err.message);
    }
});

port.on('open', function () {
    console.log('node opened...');
});

port.on('data', function (data) {
    console.log(data);
    var d = data.toString('utf8');
    var s = d.split(',');
    var i = parseInt(s[0]);
    if (i >= 0) {
        eventEmitter.emit('sendMessage', i);
    }
});