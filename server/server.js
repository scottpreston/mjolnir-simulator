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

wss.on('connection', function connection(ws, req) {
    const location = url.parse(req.url, true);
    // You might use location.query.access_token to authenticate or share sessions
    // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

    console.log('Server: Connection Established');
    var throwHammerInterval = setInterval(function () {
        var newHammerData = {
            x: randomIntFromInterval(100, 1800),
            y: randomIntFromInterval(100, 600),
            velocity: randomIntFromInterval(5, 40),
        };

        ws.send(JSON.stringify(newHammerData));
    }, 1000);

    ws.on('close', function () {
        clearInterval(throwHammerInterval);
        console.log('Server: Closing connection');
    });
});

server.listen(9030, function listening() {
    console.log('Listening on %d', server.address().port);
});
