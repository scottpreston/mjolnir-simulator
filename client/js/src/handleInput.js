var handleMouseClick = function (event) {
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
var webcamMotionInstance = null;
var handleWebCamMotion = function () {
    var webcamConfig = { video: "#vid", canvas1: "#canvas", canvas2: "#canvas2", fps: 30 };
    if (webcamMotionInstance === null) {
        webcamMotionInstance = new WebCamMotion(webcamConfig, function (x, y) {
            console.log({ x: x, y: y });
            var velocity = 35 // TODO: Temporary value for testing

            var inputValues = {
                x: x * 6,
                y: y * 4.5,
                velocity: velocity
            };

            var event = new CustomEvent('generateHammer', { detail: { inputValues: inputValues } });
            window.dispatchEvent(event);
        });
    }
};

var setupInputSources = function (event) {

    //remove the listener before setting it up again
    window.removeEventListener('mousedown', handleMouseClick);

    webcamMotionInstance !== null ? stopCapture() : console.log('nothing to stop');
    webcamMotionInstance = null;

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
Array.from(radioButtons).forEach(function (radioButton) {
    radioButton.addEventListener('mousedown', function (event) {
        event.target.checked = true;
        event.stopPropagation();
        setupInputSources();
    });
})

var links = document.querySelectorAll('.level-link');

links.forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.search = '?level=' + event.target.getAttribute('data-level');
    });
});
