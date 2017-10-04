// Master Game Object

window.mjolnirGameObject = {
    score: 0
};

window.addEventListener('targetHit', function (event) {
  console.log(event.detail.target + ' Wasted');
  window.mjolnirGameObject.score += event.detail.score;
  updateScore(window.mjolnirGameObject.score);
});

function updateScore(score) {
  document.querySelector('.score-board span').textContent = score;
}
