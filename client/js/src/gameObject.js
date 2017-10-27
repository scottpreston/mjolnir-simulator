// Master Game Object

window.mjolnirGameObject = {
    score: 0,

    levels: [{
        background: "assets/textures/iceground.jpg",
        ground: "assets/textures/snow.jpg"
    },
    {
        background: "assets/textures/alien_background2.jpg",
        ground: "assets/textures/ground_texture.jpg"
    },
    {
        background: "assets/textures/snow_texture.jpg",
        ground: "assets/textures/snow.jpg"
    }
    ]
};

window.addEventListener('targetHit', function (event) {
    console.log(event.detail.target + ' Wasted');
    window.mjolnirGameObject.score += event.detail.score;

    var scoreData = {
        totalScore: window.mjolnirGameObject.score
    };

    localStorage.setItem('mjs-score', JSON.stringify(scoreData));

    updateScore(event.detail.score);
});

function updateScore(hit_score) {
    document.querySelector('.hit-score span').textContent = hit_score || 0;
    document.querySelector('.score-board span').textContent = window.mjolnirGameObject.score;
}

function resetGame() {
    localStorage.removeItem('mjs-score');

    window.history.pushState({}, '', '?level=1');
    window.location.reload();
}

function getCurrentLevel() {
    var searchParams = new URLSearchParams(window.location.search);
    var levelNumber = searchParams.get('level');
    if (levelNumber) {
        return levelNumber;
    }
    window.history.pushState({}, '', '?level=1');
    return 1;
}

function scoreInit() {
    var scoreData = localStorage.getItem('mjs-score');
    console.log(scoreData);
    if (scoreData) {
        scoreData = JSON.parse(scoreData);
        window.mjolnirGameObject.score = scoreData.totalScore;
        updateScore();
    }
}

scoreInit();
