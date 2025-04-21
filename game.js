

// --- Canvas Setup ---
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gameWidth = canvas.width;
const gameHeight = canvas.height;

// --- Config ---
const config = {
  shootKey: " ", // default: spacebar
  gameTimeSeconds: 120    // 2 minutes default
};

// --- Images ---
const shipImg = new Image();
shipImg.src = "images/spaceship.png";

const enemyMissileImg = new Image();
enemyMissileImg.src = "images/enemy_missile.png";

const playerMissileImg = new Image();
playerMissileImg.src = "images/self_missile.png";

const explosionImg = new Image();
explosionImg.src = "images/Explosion.png";

const enemyImages = [
  "images/fourth_row_enemy.png",
  "images/third_row_enemy.png",
  "images/second_row_enemy.png",
  "images/first_row_enemy.png"
].map(src => {
  const img = new Image();
  img.src = src;
  return img;
});
// --- Variables ---
let score = 0;
let lives = 3;
let gameOver = false;
let gameWon = false;
let speedBoosts = 0;
const maxSpeedBoosts = 4;
const speedBoostInterval = 5000; // 5 seconds
let timeLeft = config.gameTimeSeconds;
let timerInterval = null;


// --- Ship ---
const movementAreaHeight = gameHeight * 0.4;
const ship = {
  width: 40,
  height: 50,
  x: Math.random() * (gameWidth - 50),
  y: gameHeight - 50,
  speed: 5,
  dx: 0,
  dy: 0
};

// --- Controls ---
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft": ship.dx = -ship.speed; break;
    case "ArrowRight": ship.dx = ship.speed; break;
    case "ArrowUp": ship.dy = -ship.speed; break;
    case "ArrowDown": ship.dy = ship.speed; break;
  }
  if (e.key === config.shootKey) {
    firePlayerBullet();
  }
});

document.addEventListener("keyup", (e) => {
  if (["ArrowLeft", "ArrowRight"].includes(e.key)) ship.dx = 0;
  if (["ArrowUp", "ArrowDown"].includes(e.key)) ship.dy = 0;
});

function updatePosition() {
  const newX = ship.x + ship.dx;
  const newY = ship.y + ship.dy;
  if (newX >= 0 && newX <= gameWidth - ship.width) ship.x = newX;
  const lowerBound = gameHeight - ship.height - 20;
  const upperBound = gameHeight - movementAreaHeight;
  if (newY >= upperBound && newY <= lowerBound) ship.y = newY;
  else if (newY < upperBound) ship.y = upperBound;
  else if (newY > lowerBound) ship.y = lowerBound;
}

// --- Player Bullets ---
let playerBullets = [];
let canShoot = true;

function firePlayerBullet() {
    if (!canShoot) return;
  
    playerBullets.push({
      x: ship.x + ship.width / 2 - 8,
      y: ship.y,
      width: 16,
      height: 32,
      speed: 5
    });
  
    canShoot = false;
    setTimeout(() => {
      canShoot = true;
    }, 200); 
  }
  

function updatePlayerBullets() {
  for (let i = 0; i < playerBullets.length; i++) {
    const bullet = playerBullets[i];
    bullet.y -= bullet.speed;

    for (let j = 0; j < enemies.length; j++) {
      const enemy = enemies[j];
      if (!enemy.alive) continue;

      const enemyX = enemyGroup.x + enemy.x;
      const enemyY = enemyGroup.y + enemy.y;

      if (
        bullet.x < enemyX + enemyWidth &&
        bullet.x + bullet.width > enemyX &&
        bullet.y < enemyY + enemyHeight &&
        bullet.y + bullet.height > enemyY
      ) {

        explosions.push({
            x: enemyGroup.x + enemy.x + enemyWidth / 2 - 16,
            y: enemyGroup.y + enemy.y + enemyHeight / 2 - 16,
            frame: 0,
            frameDelay: 5,
            delayCount: 0
          });

        explosions.push({
            x: enemyGroup.x + enemy.x + enemyWidth / 2 - 16,
            y: enemyGroup.y + enemy.y + enemyHeight / 2 - 16,
            frame: 0,
            frameDelay: 5,
            delayCount: 0
          });
          
          // Scoring based on enemy row
          const row = enemy.rowIndex;
          if (row === 3) score += 5;
          else if (row === 2) score += 10;
          else if (row === 1) score += 15;
          else if (row === 0) score += 20;
          
          enemy.alive = false;
          playerBullets.splice(i, 1);
          i--;
          
      }
    }

    if (bullet && bullet.y + bullet.height < 0) {
      playerBullets.splice(i, 1);
      i--;
    }
  }
}

function drawPlayerBullets() {
    playerBullets.forEach(bullet => {
        ctx.drawImage(
          playerMissileImg,
          bullet.x,
          bullet.y,
          bullet.width,
          bullet.height
        );
      });
      
}

// --- Enemies ---
const enemies = [];
const rows = 4;
const cols = 5;
const enemyWidth = 45;
const enemyHeight = 45;
const spacing = 24;

const enemyGroup = {
  x: 50,
  y: 50,
  dx: 2,
  width: cols * (enemyWidth + spacing)
};

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    enemies.push({
      x: col * (enemyWidth + spacing),
      y: row * (enemyHeight + spacing),
      rowIndex: row,
      alive: true
    });
  }
}

function updateEnemies() {
  enemyGroup.x += enemyGroup.dx;
  if (enemyGroup.x <= 0 || enemyGroup.x + enemyGroup.width >= canvas.width) {
    enemyGroup.dx *= -1;
  }
  // Check if all enemies are dead - if so, game won
  if (!gameWon && enemies.every(e => !e.alive)) {
    gameWon = true;
  }
}

function drawEnemies() {
  enemies.forEach(enemy => {
    if (enemy.alive) {
      const img = enemyImages[enemy.rowIndex];
      ctx.drawImage(
        img,
        enemyGroup.x + enemy.x,
        enemyGroup.y + enemy.y,
        enemyWidth,
        enemyHeight
      );
    }
  });
}

// --- Enemy Missiles ---
let enemyMissiles = [];
let missileTriggeredNext = false;

function fireEnemyMissile() {
  const aliveEnemies = enemies.filter(e => e.alive);
  if (aliveEnemies.length === 0) return;
  const shooter = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
  enemyMissiles.push({
    x: enemyGroup.x + shooter.x + enemyWidth / 2 - 5,
    y: enemyGroup.y + shooter.y + enemyHeight,
    speed: 2 * Math.pow(1.2, speedBoosts),
    width: 10,
    height: 20
  });
}

function updateEnemyMissiles() {
  if (enemyMissiles.length === 0) {
    fireEnemyMissile();
    return;
  }

  for (let i = 0; i < enemyMissiles.length; i++) {
    const missile = enemyMissiles[i];
    missile.y += missile.speed;

    if (!missileTriggeredNext && missile.y > canvas.height * 0.75 && i === enemyMissiles.length - 1) {
      missileTriggeredNext = true;
      setTimeout(() => {
        fireEnemyMissile();
        missileTriggeredNext = false;
      }, 300);
    }

    if (
      missile.x < ship.x + ship.width &&
      missile.x + missile.width > ship.x &&
      missile.y < ship.y + ship.height &&
      missile.y + missile.height > ship.y
    ) {
      explosions.push({
        x: ship.x + ship.width / 2 - 16,
        y: ship.y + ship.height / 2 - 16,
        frame: 0,
        frameDelay: 5,
        delayCount: 0
      });
      enemyMissiles.splice(i, 1);
      i--;
    //   ship.x = Math.random() * (gameWidth - ship.width);
    //   ship.y = gameHeight - ship.height - 20;
      lives--;
      if(lives <=0){
        gameOver = true;
      }else{
        ship.x = Math.random() * (gameWidth - ship.width);
        ship.y = gameHeight - ship.height - 20;
      }
    //   continue;
    }

    if (missile.y > canvas.height) {
      enemyMissiles.splice(i, 1);
      i--;
    }
  }
}

function drawEnemyMissiles() {
  enemyMissiles.forEach(missile => {
    ctx.drawImage(
      enemyMissileImg,
      missile.x,
      missile.y,
      missile.width,
      missile.height
    );
  });
}

// --- Explosions ---
let explosions = [];

function updateExplosions() {
  for (let i = 0; i < explosions.length; i++) {
    const exp = explosions[i];
    exp.delayCount++;
    if (exp.delayCount >= exp.frameDelay) {
      exp.frame++;
      exp.delayCount = 0;
    }
    if (exp.frame >= 8) {
      explosions.splice(i, 1);
      i--;
    }
  }
}

function drawExplosions() {
  explosions.forEach(exp => {
    ctx.drawImage(
      explosionImg,
      exp.frame * 32, 0, 32, 32,
      exp.x, exp.y, 32, 32
    );
  });
}

// --- Ship ---
function drawShip() {
  ctx.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
}

function drawHUD() {
    // Score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 20, 30);
  
    // Lives
    ctx.fillText(`Lives: ${"❤️".repeat(lives)}`, 20, 60);
  
    // Timer
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    ctx.fillText(`Time Left: ${minutes}:${seconds}`, 20, 90);
  }


  
function drawEndScreen() {
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    ctx.fillStyle = "white";
    ctx.font = "36px Arial";
    ctx.textAlign = "center";
  
    let message = "";
  
    if (gameWon) {
      message = "Champion!";
    } else if (lives <= 0) {
      message = "You Lost!";
    } else if (timeLeft <= 0) {
      message = score < 100
        ? `You can do better: ${score}`
        : "Winner!";
    }
  
    ctx.fillText(message, canvas.width / 2, canvas.height / 2 - 20);
  
    const button = document.createElement("button");
    button.textContent = "Play Again";
    button.style.position = "absolute";
    button.style.left = `${canvas.width / 2 - 60}px`;
    button.style.top = `${canvas.height / 2 + 20}px`;
    button.style.fontSize = "18px";
    button.style.padding = "10px 20px";
    document.body.appendChild(button);
  
    button.onclick = () => {
      location.reload();
    };
  }
  
  

  
  

// --- Game Loop ---
function gameLoop() {
  updatePosition();
  updateEnemies();
  updateEnemyMissiles();
  updatePlayerBullets();
  updateExplosions();

  ctx.clearRect(0, 0, gameWidth, gameHeight);

  drawShip();
  drawEnemies();
  drawEnemyMissiles();
  drawPlayerBullets();
  drawExplosions();
//   drawScore();
//   drawLives();
  drawHUD();


  if (gameOver || gameWon) {
    drawEndScreen();
    return;
  }
  requestAnimationFrame(gameLoop);

}

shipImg.onload = () => {
    gameLoop();
  
    timerInterval = setInterval(() => {
      if (!gameOver && !gameWon) {
        timeLeft--;
        if (timeLeft <= 0) {
          gameOver = true;
          clearInterval(timerInterval);
        }
      }
    }, 1000);
  };

setInterval(() => {
    if (speedBoosts < maxSpeedBoosts) {
      enemyGroup.dx *= 1.2; // Speed up enemy group movement
  
      enemyMissiles.forEach(missile => {
        missile.speed *= 1.2; // Speed up current missiles
      });
  
      speedBoosts++;
    }
  }, speedBoostInterval);
  