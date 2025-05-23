// Get the canvas and context
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Get score display elements
const playerScoreDisplay = document.getElementById('playerScore');
const aiScoreDisplay = document.getElementById('aiScore');

// Get difficulty buttons
const btnBeginner = document.getElementById('btnBeginner');
const btnIntermediate = document.getElementById('btnIntermediate');
const btnAdvanced = document.getElementById('btnAdvanced');
const btnExpert = document.getElementById('btnExpert');

// Game constants
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 10;
const PADDLE_SPEED = 6; // Player paddle speed

// AI speeds for different difficulties
const AI_SPEEDS = {
    beginner: 2,
    intermediate: 4,
    advanced: 6, // Match player speed
    expert: 8    // Faster than player
};

// Game state variables
let playerPaddleY = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;
let aiPaddleY = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;
let ballX = CANVAS_WIDTH / 2;
let ballY = CANVAS_HEIGHT / 2;
let ballSpeedX = 5;
let ballSpeedY = 0;
let playerScore = 0;
let aiScore = 0;

// Current AI difficulty
let currentAIDifficulty = 'beginner'; // Default difficulty
let currentAISpeed = AI_SPEEDS[currentAIDifficulty]; // Initialize AI speed

// Input handling
let keysPressed = {};

document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
});

// Function to change AI difficulty
function changeAIDifficulty(difficulty) {
    currentAIDifficulty = difficulty;
    currentAISpeed = AI_SPEEDS[difficulty];
    console.log(`AI Difficulty set to: ${difficulty}`); // Optional feedback

    // Optional: Add/remove 'active' class for button styling
    document.querySelectorAll('.difficulty-selection button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(`btn${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`).classList.add('active');

    // Reset the game or ball after changing difficulty is a good idea
    // For simplicity here, we just change the speed immediately.
    // A full reset might clear scores and reset ball position.
}

// Add event listeners to difficulty buttons
btnBeginner.addEventListener('click', () => changeAIDifficulty('beginner'));
btnIntermediate.addEventListener('click', () => changeAIDifficulty('intermediate'));
btnAdvanced.addEventListener('click', () => changeAIDifficulty('advanced'));
btnExpert.addEventListener('click', () => changeAIDifficulty('expert'));

// Initial active button highlighting
document.getElementById('btnBeginner').classList.add('active');

// Function to draw elements
function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fill();
}

function drawNet() {
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]); // Dashed line
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash
}

// Function to reset the ball position and speed after scoring
function resetBall() {
    ballX = CANVAS_WIDTH / 2;
    ballY = CANVAS_HEIGHT / 2;
    // Alternate initial direction after a score
    ballSpeedX = (ballSpeedX > 0) ? -5 : 5; // Reset speed to initial value but reverse direction
    ballSpeedY = 0; // Start with no vertical speed
}

// Function to update game state
function update() {
    // Player paddle movement
    if (keysPressed['w'] || keysPressed['W']) {
        playerPaddleY -= PADDLE_SPEED;
    }
    if (keysPressed['s'] || keysPressed['S']) {
        playerPaddleY += PADDLE_SPEED;
    }

    // Keep player paddle within bounds
    playerPaddleY = Math.max(0, Math.min(playerPaddleY, CANVAS_HEIGHT - PADDLE_HEIGHT));

    // AI paddle movement (tracking based on current speed)
    // AI moves towards the ball's vertical position using the current AI speed
    let deltaY = ballY - (aiPaddleY + PADDLE_HEIGHT / 2);
    if (Math.abs(deltaY) > currentAISpeed) {
        aiPaddleY += Math.sign(deltaY) * currentAISpeed;
    } else {
        aiPaddleY += deltaY; // Move the remaining small distance
    }

     // Keep AI paddle within bounds
    aiPaddleY = Math.max(0, Math.min(aiPaddleY, CANVAS_HEIGHT - PADDLE_HEIGHT));

    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top/bottom walls
    if (ballY - BALL_SIZE < 0 || ballY + BALL_SIZE > CANVAS_HEIGHT) {
        ballSpeedY = -ballSpeedY; // Reverse vertical direction
    }

    // Ball collision with paddles
    // Player paddle collision (left side)
    if (ballX - BALL_SIZE < PADDLE_WIDTH &&
        ballY > playerPaddleY &&
        ballY < playerPaddleY + PADDLE_HEIGHT) {

        // Reverse horizontal direction and slightly increase speed
        ballSpeedX = -ballSpeedX * 1.05; // Increase speed slightly on hit

        // Calculate angle change based on collision point on paddle
        let hitPoint = ballY - (playerPaddleY + PADDLE_HEIGHT / 2);
        ballSpeedY = hitPoint * 0.35; // Adjust multiplier for desired angle effect

        // Cap horizontal speed to prevent it from getting out of control
        if (Math.abs(ballSpeedX) > 15) { // Arbitrary cap value
            ballSpeedX = Math.sign(ballSpeedX) * 15;
        }
    }

    // AI paddle collision (right side)
    if (ballX + BALL_SIZE > CANVAS_WIDTH - PADDLE_WIDTH &&
        ballY > aiPaddleY &&
        ballY < aiPaddleY + PADDLE_HEIGHT) {

        // Reverse horizontal direction and slightly increase speed
        ballSpeedX = -ballSpeedX * 1.05; // Increase speed slightly on hit

         // Calculate angle change based on collision point on paddle
        let hitPoint = ballY - (aiPaddleY + PADDLE_HEIGHT / 2);
        ballSpeedY = hitPoint * 0.35; // Use same multiplier for symmetry

         // Cap horizontal speed
        if (Math.abs(ballSpeedX) > 15) {
            ballSpeedX = Math.sign(ballSpeedX) * 15;
        }
    }

    // Scoring
    // Ball passes left wall (AI scores)
    if (ballX - BALL_SIZE < 0) {
        aiScore++;
        aiScoreDisplay.textContent = aiScore; // Update score display
        resetBall();
    }

    // Ball passes right wall (Player scores)
    if (ballX + BALL_SIZE > CANVAS_WIDTH) {
        playerScore++;
        playerScoreDisplay.textContent = playerScore; // Update score display
        resetBall();
    }
}

// Main game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Update game state
    update();

    // Draw elements
    drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, '#000'); // Background
    drawNet(); // Center net
    drawRect(0, playerPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, '#fff'); // Player paddle
    drawRect(CANVAS_WIDTH - PADDLE_WIDTH, aiPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, '#fff'); // AI paddle
    drawCircle(ballX, ballY, BALL_SIZE, '#fff'); // Ball

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();