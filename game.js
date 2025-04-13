const gameGrid = document.getElementById('gameGrid');
const targetColor = document.querySelector('.target-color');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');

let score = 0;
let timeLeft = 30;
let correctIndex;

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

function createGame() {
    gameGrid.innerHTML = '';
    const correctColor = generateRandomColor();
    targetColor.style.backgroundColor = correctColor;
    
    correctIndex = Math.floor(Math.random() * 16);
    
    for(let i = 0; i < 16; i++) {
        const tile = document.createElement('div');
        tile.style.backgroundColor = i === correctIndex ? correctColor : generateRandomColor();
        tile.addEventListener('click', () => handleTileClick(i === correctIndex));
        gameGrid.appendChild(tile);
    }
}

function handleTileClick(isCorrect) {
    if(isCorrect) {
        score += 100;
        scoreElement.textContent = score;
        timeLeft += 5;
        createGame();
    } else {
        timeLeft = Math.max(0, timeLeft - 2);
    }
}

function updateTimer() {
    timeLeft--;
    timeElement.textContent = timeLeft;
    
    if(timeLeft <= 0) {
        gameOver();
    }
}

function gameOver() {
    gameOverScreen.style.display = 'block';
    finalScoreElement.textContent = score;
}

// Start game
createGame();
const timerInterval = setInterval(updateTimer, 1000);