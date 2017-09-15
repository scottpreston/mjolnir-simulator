window.addEventListener( 'mousedown', function (event) {
    var velocity = 35 // TODO: Temporary value for testing

    var inputValues = {
        x: event.clientX,
        y: event.clientY,
        velocity: velocity
    };

    var event = new CustomEvent('generateHammer', { detail: {inputValues: inputValues} });
    window.dispatchEvent(event);
});
