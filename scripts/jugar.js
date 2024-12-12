let currentPlayer = 'X';
let cells = []; // Hacerlo accesible globalmente
let gameActive = true;
let dragAndDropInitialized = false; // Control para inicializar Drag and Drop una sola vez

function startGame(gameId) {
    // Ocultar todos los juegos
    const games = document.querySelectorAll('.juega-game');
    games.forEach(game => game.style.display = 'none');

    // Mostrar solo el juego seleccionado
    const selectedGame = document.getElementById(gameId);
    if (selectedGame) {
        selectedGame.style.display = 'block';
    }

    // Reiniciar el juego correspondiente
    if (gameId === 'game1') {
        resetTresEnRaya(); // Reinicia el Tres en Raya
    } else if (gameId === 'game2') {
        resetDragAndDrop(); // Reinicia el juego de Drag and Drop
    }
}

// Reinicia el tablero del Tres en Raya
function resetTresEnRaya() {
    const board = document.getElementById("tic-tac-toe");
    board.innerHTML = ""; // Limpia el tablero actual
    document.getElementById("game-status").textContent = "Turno del jugador: X";

    cells = []; // Reinicia el array de celdas
    gameActive = true; // Reactiva el juego

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
}

// Turno del jugador
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

// Reinicia el juego de Drag and Drop
function resetDragAndDrop() {
    // Restaura los regalos visibles
    const gifts = document.querySelectorAll('.gift');
    gifts.forEach(gift => {
        gift.classList.remove('hidden'); // Hacer visibles los regalos
    });

    // Limpia el contenido del saco
    const sack = document.getElementById('sack');
    sack.innerHTML = `
        <img src="resources/sack.png" alt="Saco de regalos" id="sack-img">
        <p>Arrastra los regalos aquí</p>
    `;

    // Inicializa el Drag and Drop (si aún no se ha hecho)
    initializeDragAndDrop();
}

// Inicializa el juego de Drag and Drop
function initializeDragAndDrop() {
    if (dragAndDropInitialized) return; // Evita inicialización duplicada

    const gifts = document.querySelectorAll('.gift');
    const sack = document.getElementById('sack');

    // Añadir eventos Drag and Drop a cada regalo
    gifts.forEach(gift => {
        gift.addEventListener('dragstart', dragStart);
    });

    sack.addEventListener('dragover', dragOver);
    sack.addEventListener('drop', drop);

    function dragStart(event) {
        event.dataTransfer.setData('text', event.target.id);
    }

    function dragOver(event) {
        event.preventDefault(); // Permitir que el saco sea un área de drop
    }

    function drop(event) {
    event.preventDefault();

    // Obtener el ID del regalo arrastrado
    const giftId = event.dataTransfer.getData('text');
    const gift = document.getElementById(giftId);

    // Verificar si el regalo existe antes de hacer algo
    if (gift) {
        // Ocultar el regalo original
        gift.classList.add('hidden');

        // Crear un clon y añadirlo al saco
        const clonedGift = document.createElement('img');
        clonedGift.src = gift.src;
        clonedGift.alt = gift.alt;
        clonedGift.classList.add('gift-in-sack'); // Clase para posicionarlo sobre el saco
        const sack = document.getElementById('sack');
        sack.appendChild(clonedGift);
    }

    // Verificar si todos los regalos han sido arrastrados
    if (document.querySelectorAll('.gift:not(.hidden)').length === 0) {
        alert('¡Felicidades! ¡El saco de Papá Noel está preparado!');
    }
}


    dragAndDropInitialized = true; // Marca como inicializado
}

// Inicializar el Tres en Raya al cargar la página
document.addEventListener("DOMContentLoaded", resetTresEnRaya);
