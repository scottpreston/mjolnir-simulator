var webcamInterval;
var MyFPS = 15;
var hitTime = new Date().getTime();
var previousImageData = new Array(MyFPS);
var imageIndex = 0;
var timeCapture = 0;
var frameCount = 0;
var startTime = new Date().getTime();
var initialTime = new Date().getTime();
var droppedFrames = 0, decodedFrames  = 0;

function WebCamMotion(options) {

    console.log(navigator.mediaDevices.getSupportedConstraints())
    var self = this;
    this.fps = 1000 / MyFPS;
    this.video = document.querySelector(options.video);
    this.canvas = document.querySelector(options.canvas1);
    this.ctx = canvas.getContext('2d');
    this.localMediaStream = null;
    this.interval = null;
    this.processors = [];
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    var qvgaConstraints = {
        video: { width: { exact: 320 }, height: { exact: 240 }, frameRate: MyFPS }
    };
    navigator.getUserMedia(qvgaConstraints, function (stream) {
        self.video.src = window.URL.createObjectURL(stream);
        localMediaStream = stream;

    }, function () {
        console.error('Your browser does not support this...');
    });
    webcamInterval = setInterval(function () {
        self.ctx.drawImage(self.video, 0, 0);
        populateImageData(self.ctx);
    }, self.fps);
    setInterval(function() {
        var decodedPerSec = (self.video.webkitDecodedFrameCount - decodedFrames);
        decodedFrames = self.video.webkitDecodedFrameCount;
        console.log('my fps =' , decodedPerSec);
    },1000);
}

function stopCapture() {
    clearInterval(webcamInterval);
}

function populateImageData(ctx) {
    var imageData = ctx.getImageData(0, 0, 320, 240);
    previousImageData[imageIndex] = new ImageData(new Uint8ClampedArray(imageData.data),imageData.width,imageData.height);
    imageIndex++;
    if (imageIndex == MyFPS) imageIndex = 0;
}

function subtractImage(curIndex) {
    var canvas2 = document.querySelector("#canvas2");
    var ctx2 = canvas2.getContext('2d');
    var newImageData = ctx2.createImageData(320, 240);
    var newData = newImageData.data;

    var oldIndex = curIndex + 1;
    if (oldIndex >= MyFPS) oldIndex = 0;

    //var currentData = Object.assign({}, previousImageData[imageIndex]);
    var currentData = previousImageData[curIndex]
    var data = currentData.data;

    var oldImageData = Object.assign({}, previousImageData[oldIndex]);
    var previousData = oldImageData.data;
    //console.log(data.toString() === previousData.toString());
console.log('subImgfunction',imageIndex,new Date().getTime())
    var avgX = 0, avgY = 0, hits = 0, totalX = 0, totalY = 0;

    for (var x = 0; x < 320; x++) {
        for (var y = 0; y < 240; y++) {
            var offset = x * 4 + y * 4 * currentData.width;
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
            if (isDifferent(gray, oldGray)) {
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

    console.log("hits=", hits);
    //if (hits>0) {
        clearInterval(webcamInterval);
        //clearInterval(myInterval);
    //}
    ctx2.putImageData(newImageData, 0, 0);
};

function isDifferent(curPixel, prevPixel) {
    var diff = Math.abs(curPixel - prevPixel);
    return (diff > 25);
}

function convertCanvasToImage() {
    var canvas3 = document.querySelector("#canvas3");
    var ctx3 =canvas3.getContext('2d');
    for (var i = 0; i < MyFPS; i++) {
        var id = new ImageData(previousImageData[i].data,previousImageData[i].width,previousImageData[i].height)
        ctx3.putImageData(id, 0, 0);
        var elt = document.createElement("p");
        elt.innerHTML = i;
        document.querySelector("#snag_area").appendChild(elt);
        var image = new Image();
        image.src = canvas3.toDataURL("image/jpeg");
        document.querySelector("#snag_area").appendChild(image);
    }    
	clearInterval(webcamInterval);
}
// var myInterval = setInterval(function() {subtractImage()}, 1000);
