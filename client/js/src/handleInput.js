var handleMouseClick = function(event) {
    var velocity = 35 // TODO: Temporary value for testing

    var inputValues = {
        x: event.clientX,
        y: event.clientY,
        velocity: velocity
    };

    var event = new CustomEvent('generateHammer', { detail: { inputValues: inputValues } });
    window.dispatchEvent(event);
};
//making this global variable so that I can access it in setupInputSources

var handleWebCamMotion = function() {

    var topLeft = JSON.parse(localStorage.getItem("topLeft"));
    var bottomRight = JSON.parse(localStorage.getItem("bottomRight"));
    var canvasSize = JSON.parse(localStorage.getItem("canvasSize"));

    var webcamConfig = {
        video: "#vid",
        canvas1: "canvas",
        fps: 30,
        width: 320,
        height: 240,
        testing: true,
        startX: parseInt(topLeft.x),
        endX: parseInt(bottomRight.x),
        startY: parseInt(topLeft.y),
        endY: parseInt(bottomRight.y)
    };

    // resize canvas to config
    var c = document.querySelector("#canvas");    
    c.width = webcamConfig.width;
    c.height = webcamConfig.height;

    webcamMotionInstance = new WebCamMotion(webcamConfig, function(x, y, hits) {
        var newCoords = calibrate(x,y);
        var inputValues = {
            x: newCoords.x,
            y: newCoords.y,
            velocity: 35
        };
        console.log(inputValues);
        var event = new CustomEvent('generateHammer', { detail: { inputValues: inputValues } });
        window.dispatchEvent(event);
    });

    function calibrate(x,y) {
        var targetWidth = bottomRight.x - topLeft.x;
        var targetHeight =  bottomRight.y - topLeft.y;
        var screenHeight = window.innerHeight;
        var screenWidth = window.innerWidth;
        var scaleX = screenWidth / targetWidth;
        var scaleY = screenHeight / targetHeight;
        console.log(screen,scaleX,scaleY);
        return {x:scaleX * x, y: scaleY * y};
    }
};

var setupInputSources = function(event) {

    //remove the listener before setting it up again
    window.removeEventListener('mousedown', handleMouseClick);

    var isMouse = document.querySelector("input[name='hammerSource']:checked").value === 'mouse';

    if (isMouse) {
        window.addEventListener('mousedown', handleMouseClick);
    } else {
        handleWebCamMotion();
    }
};

//this will get called on page load, good for initial setup
setupInputSources();

//run the setup after page load, good for re setting up the source
var radioButtons = document.querySelectorAll("input[name='hammerSource']");
Array.from(radioButtons).forEach(function(radioButton) {
    radioButton.addEventListener('mousedown', function(event) {
        event.target.checked = true;
        event.stopPropagation();
        setupInputSources();
    });
})

var links = document.querySelectorAll('.level-link');

links.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.search = '?level=' + event.target.getAttribute('data-level');
    });
});
