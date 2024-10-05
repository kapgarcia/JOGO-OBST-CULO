// Elementos do jogador e do obstáculo
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const instructions = document.getElementById("instructions");
const gameArea = document.getElementById("gameArea");
const gameOverText = document.getElementById("gameOver");

// Variável para controle do pulo e do estado do jogo
let isJumping = false;
let isGameOver = false;

// Função para iniciar o jogo
function startGame() {
    instructions.classList.add("hidden"); // Oculta a tela de instruções
    gameArea.style.display = "block"; // Mostra a área do jogo
    isGameOver = false; // Reseta o estado do jogo
    gameOverText.style.display = "none"; // Oculta a mensagem de Game Over
    obstacle.style.animation = "obstacleMove 2s infinite linear"; // Reinicia a animação do obstáculo
}

// Função de pulo
function jump() {
    if (isJumping || isGameOver) return; // Evita múltiplos pulos ao mesmo tempo

    isJumping = true;
    let jumpHeight = 0;
    let jumpUp = setInterval(function () {
        if (jumpHeight >= 100) { // Define altura máxima do pulo
            clearInterval(jumpUp);
            let jumpDown = setInterval(function () {
                if (jumpHeight <= 0) {
                    clearInterval(jumpDown);
                    isJumping = false;
                }
                jumpHeight -= 5;
                player.style.bottom = jumpHeight + "px";
            }, 20);
        }
        jumpHeight += 5;
        player.style.bottom = jumpHeight + "px";
    }, 20);
}

// Função para detectar colisão entre o jogador e o obstáculo
function detectCollision() {
    const playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
    const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));

    // Se o obstáculo está no mesmo nível que o jogador e o jogador está no chão
    if (obstacleLeft >= 560 && obstacleLeft <= 600 && playerTop <= 0) {
        gameOver(); // Chama a função de Game Over
    }
}

// Função de Game Over
function gameOver() {
    isGameOver = true;
    obstacle.style.animation = "none"; // Para o movimento do obstáculo
    gameOverText.style.display = "block"; // Mostra a mensagem de Game Over
}

// Função que verifica a colisão continuamente
setInterval(detectCollision, 10);

// Ativar pulo ao pressionar tecla de espaço ou toque na tela (para mobile)
document.addEventListener("keydown", function(event) {
    if (event.key === " ") {
        jump();
    }
});

document.addEventListener("touchstart", function() {
    jump();
});

// Adiciona evento de clique ao botão de iniciar o jogo
document.getElementById("startButton").addEventListener("click", startGame);
