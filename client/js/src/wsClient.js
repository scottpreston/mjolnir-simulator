// var websocketServerLocation = 'ws://10.10.10.103:9030';
// var lastTime = 0;
// function start() {
//     ws = new WebSocket(websocketServerLocation);

//     ws.onopen = function () {
//         console.log('Client: Connection to websocket achieved');
//     };

//     // Log errors
//     ws.onerror = function (error) {
//         console.error('Client: WebSocket Error ' + error);
//     };

//     ws.onmessage = function (e) {
//         let data = JSON.parse(e.data);

//         //console.log('Client: Server says to throw hammer at :: x: ' + data.x + ' ; y: ' + data.y + ' with a velocity of :: ' + data.velocity);
        
//         if (data.vibrations > 0) {
//             console.log("vibration=" ,data.vibrations, new Date().getTime(), imageIndex);
//             //console.log('subtracting images1');
//             var now = new Date().getTime();
//             if (now > lastTime + 1000) {
//                 subtractImage(imageIndex-1);
//                 convertCanvasToImage();
//                 lastTime = new Date().getTime();    
//             } else {
//                 console.log('already converted...');
//             }
//         }
        
//         // var inputValues = {
//         //     x: data.x,
//         //     y: data.y,
//         //     velocity: data.velocity
//         // };

//         // var event = new CustomEvent('generateHammer', { detail: {inputValues: inputValues} });
//         // window.dispatchEvent(event);
//     };

//     ws.onclose = function () {
//         console.log('Client: Connection disconnected.');
//         // Try to reconnect every 5 seconds
//         setTimeout(function () {
//             start();
//         }, 5000);
//     };
// }
// function callSubtractImage() {
//     console.log('subtracting images');
//    subtractImage(imageIndex-1);
//    convertCanvasToImage();
// }

//  start();
