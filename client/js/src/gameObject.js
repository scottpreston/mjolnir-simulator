// Master Game Object

window.mjolnirGameObject = {
    score: 0,

    levels : [{
    	background: "assets/textures/iceground.jpg",
    	ground: "assets/textures/snow.jpg"
    },
    {
    	background: "assets/textures/alien_background2.jpg",
    	ground: "assets/textures/ground_texture.jpg"
    }
	]
};

window.addEventListener('targetHit', function (event) {
	console.log(event.detail.target + ' Wasted');
	window.mjolnirGameObject.score += event.detail.score;
	updateScore(event.detail.score, window.mjolnirGameObject.score);
});

function updateScore(hit_score, total_score) {
	document.querySelector('.hit_score span').textContent = hit_score;
	document.querySelector('.score-board span').textContent = total_score;
}

function getCurrentLevel () {
	var searchParams = new URLSearchParams(window.location.search);
	return searchParams.get('level');
}

function getCurrentLevel () {
	var searchParams = new URLSearchParams(window.location.search);
	return searchParams.get('level');
}
