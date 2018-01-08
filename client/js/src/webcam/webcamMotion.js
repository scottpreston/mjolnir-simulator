var webcamInterval;
var hitTime = new Date().getTime();
var previousImageData;

function WebCamMotion(options, callback) {

    console.log(navigator.mediaDevices.getSupportedConstraints())
    var self = this;
    this.fps = 1000 / options.fps;
    this.video = document.querySelector(options.video);
    this.canvas = document.querySelector(options.canvas1);
    this.ctx = canvas.getContext('2d');
    this.localMediaStream = null;
    this.interval = null;
    this.processors = [];
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    var qvgaConstraints = {
        video: {
            width: {
                exact: options.width
            },
            height: {
                exact: options.height
            },
            frameRate: options.fps
        }
    };
    navigator.getUserMedia(qvgaConstraints, function (stream) {
        self.video.src = window
            .URL
            .createObjectURL(stream);
        localMediaStream = stream;

    }, function () {
        console.error('Your browser does not support this...');
    });
    webcamInterval = setInterval(function () {
        self.ctx.drawImage(self.video, 0, 0);
        processImage(options, self.ctx, callback);
    }, self.fps);
    setTimeout(function () {
        console.log('ready to throw');
    }, 5000);
}

function stopCapture() {
    clearInterval(webcamInterval);
}

function processImage(options, ctx, callback) {
    var imageData = ctx.getImageData(0, 0, options.width, options.height);
    var data = imageData.data;
    var avgX = 0,
        avgY = 0,
        hits = 0,
        totalX = 0,
        totalY = 0,
        x = 0,
        y = 0;
    for (var x = 0; x < options.width; x++) {
        for (var y = 0; y < options.height; y++) {
            var offset = x * 4 + y * 4 * imageData.width;
            var r = data[offset]
            var g = data[offset + 1];
            var b = data[offset + 2];
            var a = data[offset + 3];
            var gray = (r + g + b) / 3;
            
            if (gray > 250) {
                avgX = avgX + x;
                avgY = avgY + y;
                hits++;
            }
        }
    }
    if (hits > 0) {
        x = avgX / hits;
        y = avgY / hits;
    }
    if (avgX > 0 && avgY > 0 && hits > 150 && new Date().getTime() > hitTime + 5000) {
        hitTime = new Date().getTime();
        setTimeout(function () {
            console.log('ready')
        }, 5000);
        console.log('used hits=', hits);
        callback(x, y, hits);
    } else {
        if (options.testing) {
            ctx.beginPath();
            ctx.moveTo(0,y);
            ctx.lineTo(options.width,y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x,0);
            ctx.lineTo(x,options.height);
            ctx.strokeStyle="#00FF00";
            ctx.stroke();
        }
        console.log(hits)
    }
}