let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let spaceship = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0
};

let bullets = [];
let enemies = [];
let score = 0;
let lives = 3;
let gameTimer = 60; // Game time in seconds

// Draw spaceship
function drawSpaceship() {
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

// Move spaceship
function moveSpaceship() {
    spaceship.x += spaceship.dx;
    spaceship.y += spaceship.dy;
    
    // Prevent the spaceship from moving outside the canvas
    if (spaceship.x < 0) spaceship.x = 0;
    if (spaceship.x + spaceship.width > canvas.width) spaceship.x = canvas.width - spaceship.width;
    if (spaceship.y < 0) spaceship.y = 0;
    if (spaceship.y + spaceship.height > canvas.height) spaceship.y = canvas.height - spaceship.height;
}

// Draw bullets
function drawBullets() {
    ctx.fillStyle = "#FF0000";
    for (let i = 0; i < bullets.length; i++) {
        ctx.fillRect(bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height);
    }
}

// Move bullets
function moveBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y -= bullets[i].speed;
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
            i--;
        }
    }
}

// Key event listeners for spaceship movement
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "d") spaceship.dx = spaceship.speed;
    if (e.key === "ArrowLeft" || e.key === "a") spaceship.dx = -spaceship.speed;
    if (e.key === "ArrowUp" || e.key === "w") spaceship.dy = -spaceship.speed;
    if (e.key === "ArrowDown" || e.key === "s") spaceship.dy = spaceship.speed;
    if (e.key === " " || e.key === "Enter") fireBullet();
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "d" || e.key === "a") spaceship.dx = 0;
    if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "w" || e.key === "s") spaceship.dy = 0;
});

// Fire bullets
function fireBullet() {
    let bullet = {
        x: spaceship.x + spaceship.width / 2 - 5,
        y: spaceship.y,
        width: 10,
        height: 20,
        speed: 4
    };
    bullets.push(bullet);
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSpaceship();
    moveSpaceship();
    drawBullets();
    moveBullets();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
