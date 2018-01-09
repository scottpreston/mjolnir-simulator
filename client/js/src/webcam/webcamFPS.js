var webcamInterval;
var decodedFrames  = 0;

function WebCamFPS(options, callback) {
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
        video: { width: { exact: options.width }, height: { exact: options.height }, frameRate: options.fps }
    };

    navigator.getUserMedia(qvgaConstraints, function (stream) {
        self.video.src = window.URL.createObjectURL(stream);
        localMediaStream = stream;

    }, function () {
        console.error('Your browser does not support this...');
    });
    webcamInterval = setInterval(function () {
        self.ctx.drawImage(self.video, 0, 0);
    }, self.fps);

    setInterval(function() {
        var decodedPerSec = (self.video.webkitDecodedFrameCount - decodedFrames);
        decodedFrames = self.video.webkitDecodedFrameCount;
        callback(decodedFrames);
    },1000);
}
