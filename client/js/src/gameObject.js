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
  updateScore(window.mjolnirGameObject.score);
});

function updateScore(score) {
  document.querySelector('.score-board span').textContent = score;
}

function getCurrentLevel () {
	var searchParams = new URLSearchParams(window.location.search);
	return searchParams.get('level');
}
