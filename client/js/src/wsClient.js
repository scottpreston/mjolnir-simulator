var websocketServerLocation = 'ws://localhost:9030';

function start() {
    ws = new WebSocket(websocketServerLocation);

    ws.onopen = function () {
        console.log('Client: Connection to websocket achieved');
    };

    // Log errors
    ws.onerror = function (error) {
        console.error('Client: WebSocket Error ' + error);
    };

    ws.onmessage = function (e) {
        let data = JSON.parse(e.data);

        console.log('Client: Server says to throw hammer at :: x: ' + data.x + ' ; y: ' + data.y + ' with a velocity of :: ' + data.velocity);

        var inputValues = {
            x: data.x,
            y: data.y,
            velocity: data.velocity
        };

        var event = new CustomEvent('generateHammer', { detail: {inputValues: inputValues} });
        window.dispatchEvent(event);
    };

    ws.onclose = function () {
        console.log('Client: Connection disconnected.');
        // Try to reconnect every 5 seconds
        setTimeout(function () {
            start();
        }, 5000);
    };
}

// start();
