// window.addEventListener( 'mousedown', function (event) {
//     var velocity = 35 // TODO: Temporary value for testing

//     var inputValues = {
//         x: event.clientX,
//         y: event.clientY,
//         velocity: velocity
//     };

//     var event = new CustomEvent('generateHammer', { detail: {inputValues: inputValues} });
//     window.dispatchEvent(event);
// });


// window.onload = function () {
// 	var searchParams = new URLSearchParams(window.location.search);

// 	if (window.location.search) {
// 		var inputValues = {
// 			x: searchParams.get('x'),
// 			y: searchParams.get('y'),
// 			velocity: searchParams.get('velocity')
// 		};

// 		var event = new CustomEvent('generateHammer', { detail: {inputValues: inputValues} });
// 		window.dispatchEvent(event);
// 	}
// };
