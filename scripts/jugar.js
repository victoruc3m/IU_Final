
// Juego de Tres en Raya Navideño: Un jugador
let currentPlayer = 'X';
const cells = [];
let gameActive = true;

// Inicializar el tablero al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("tic-tac-toe");
    board.style.display = "grid";
    board.style.gridTemplateColumns = "repeat(3, 100px)";
    board.style.gridGap = "5px";

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.style.width = "100px";
        cell.style.height = "100px";
        cell.style.background = "#FFF";
        cell.style.border = "2px solid #333";
        cell.style.display = "flex";
        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";
        cell.style.fontSize = "24px";
        cell.style.fontWeight = "bold";
        cell.addEventListener("click", () => makeMove(cell, i), { once: true });
        board.appendChild(cell);
        cells.push(cell);
    }
});

// turno del jugador
function makeMove(cell, index) {
    if (!gameActive || cell.textContent !== '') return;

    cell.textContent = 'X';
    cell.style.color = 'red';

    if (checkWinner('X')) {
        document.getElementById("game-status").textContent = "¡Has ganado!";
        gameActive = false;
        return;
    }

    if (cells.every(cell => cell.textContent !== '')) {
        document.getElementById("game-status").textContent = "¡Es un empate!";
        gameActive = false;
        return;
    }

    // Turno del sistema
    setTimeout(systemMove, 500);
}

// Turno del sistema
function systemMove() {
    if (!gameActive) return;

    const emptyCells = cells.filter(cell => cell.textContent === '');
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.textContent = 'O';
        randomCell.style.color = 'green';

        if (checkWinner('O')) {
            document.getElementById("game-status").textContent = "El sistema ha ganado.";
            gameActive = false;
            return;
        }

        if (cells.every(cell => cell.textContent !== '')) {
            document.getElementById("game-status").textContent = "¡Es un empate!";
            gameActive = false;
        }
    }
}

// Verificar si hay ganador
function checkWinner(player) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => cells[index].textContent === player);
    });
}
