// Master Game Object

window.mjolnirGameObject = {
    score: 0
};

window.addEventListener('targetHit', function (event) {
  console.log('Wasted!');
  var score = event.detail.data.score + window.mjolnirGameObject.score;
  window.mjolnirGameObject.score = score;

  updateScore(score);
});

function updateScore(score) {
  document.querySelector('.score-board span').textContent = score;
}
