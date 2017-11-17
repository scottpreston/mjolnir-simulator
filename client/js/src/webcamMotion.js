var webcamInterval;
var hitTime = new Date().getTime();
var previousImageData;
function WebCamMotion(options, callback) {
    
    console.log( navigator.mediaDevices.getSupportedConstraints())
    var self = this;
    this.fps = 1000 / options.fps;
    this.video = document.querySelector(options.video);
    this.canvas = document.querySelector(options.canvas1);
    this.canvas2 = document.querySelector(options.canvas2);
    this.ctx = canvas.getContext('2d');
    this.ctx2 = canvas2.getContext('2d');
    this.localMediaStream = null;

    this.interval = null;
    this.processors = [];
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    var qvgaConstraints = {
      video: {width: {exact: 320}, height: {exact: 240}, frameRate: 30}
    };
    navigator.getUserMedia(qvgaConstraints, function (stream) {
        self.video.src = window.URL.createObjectURL(stream);
        localMediaStream = stream;

    }, function () {
        console.error('Your browser does not support this...');
    });
    webcamInterval = setInterval(function () {
        self.ctx.drawImage(self.video, 0, 0);
        canvas2.width = canvas2.width;
        processImage(self.ctx, self.ctx2, callback);
    }, self.fps);
    setTimeout(function() {
        console.log('ready to throw');
    },5000);
}

function stopCapture() {
    clearInterval(webcamInterval);
}

function processImage(ctx, ctx2, callback) {
    var imageData = ctx.getImageData(0, 0, 320, 240);
    var newImageData = ctx2.createImageData(320, 240);
    var data = imageData.data;
    var newData = newImageData.data;
    var avgX = 0, avgY = 0, hits = 0, totalX=0, totalY=0;
    
    if (previousImageData != null) {
        var previousData = previousImageData.data;
        //console.log(previousData)
        for (var x = 0; x < 320; x++) {
            for (var y = 0; y < 240; y++) {
                var offset = x * 4 + y * 4 * imageData.width;
                var r = data[offset]
                var g = data[offset + 1];
                var b = data[offset + 2];
                var a = data[offset + 3];
                var oldR = previousData[offset]
                var oldG = previousData[offset + 1];
                var oldB = previousData[offset + 2];
                var oldA = previousData[offset + 3];
                var gray = (r + g + b) / 3;
                var oldGray = (oldR + oldG + oldB) / 3;
                if (isBlue(r, g, b) && isDifferent(gray, oldGray)) {
                //if (isDifferent(gray, oldGray)) {
                    newData[offset] = 0;
                    newData[offset + 1] = 0;
                    newData[offset + 2] = 0;
                    newData[offset + 3] = a;
                    avgX = avgX + x;
                    avgY = avgY + y;
                    hits++;
                } else {
                    newData[offset] = 255;
                    newData[offset + 1] = 255;
                    newData[offset + 2] = 255;
                    newData[offset + 3] = a;
                }
            }
        }
        if (avgX > 0 && avgY > 0 && hits > 150 && new Date().getTime() > hitTime + 5000) {
            hitTime = new Date().getTime();
            setTimeout(function() {
                console.log('ready')
            },5000);
            var x = avgX/hits, y = avgY/hits;
            circle(x,y)
            //stopCapture();
            callback(x,y)
            console.log('used hits=', hits)
        } else {
            console.log(hits)
        }

    }
    previousImageData = imageData;
    ctx2.putImageData(newImageData, 0, 0);
};
function circle(x,y) {
    var canvas = document.querySelector("#canvas3");
    var context = canvas.getContext('2d');
    var radius = 20;

    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
}

function isDifferent(curPixel, prevPixel) {
    var diff = Math.abs(curPixel - prevPixel);
    return (diff > 25);
}

function isRed(r, g, b) {
    return (r > g + 75 && r > b + 75);
}

function isBlue(r, g, b) {
    //return (b > r + 30 && b > g + 10);
    return (b > 240);
}