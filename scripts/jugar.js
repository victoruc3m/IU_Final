let currentPlayer = 'X';
let cells = [];
let gameActive = true;
let dragAndDropInitialized = false; // Control para inicializar Drag and Drop una sola vez

function startGame(gameId) {
    // oculto los juegos
    const games = document.querySelectorAll('.juega-game');
    games.forEach(game => game.style.display = 'none');

    // muestro solo el juego seleccionado
    const selectedGame = document.getElementById(gameId);
    if (selectedGame) {
        selectedGame.style.display = 'block';
    }

    // reinicio el juego 
    if (gameId === 'game1') {
        resetTresEnRaya(); 
    } else if (gameId === 'game2') {
        resetDragAndDrop(); 
    }
}

// reinicio el tablero del tres en raya
function resetTresEnRaya() {
    const board = document.getElementById("tic-tac-toe");
    board.innerHTML = ""; // limpia el tablero 
    document.getElementById("game-status").textContent = "Turno del jugador: X";

    cells = []; // reinicia el array de celdas
    gameActive = true; // reactiva el juego

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

// turno jugador
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

    // turno del sistema
    setTimeout(systemMove, 500);
}

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

// ver ganador
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


function resetDragAndDrop() {

    const gifts = document.querySelectorAll('.gift');
    gifts.forEach(gift => {
        gift.classList.remove('hidden'); // hacer visibles los regalos
    });


    const sack = document.getElementById('sack');
    sack.innerHTML = `
        <img src="resources/sack.png" alt="Saco de regalos" id="sack-img">
        <p>Arrastra los regalos aquí</p>
    `;


    initializeDragAndDrop();
}


function initializeDragAndDrop() {
    if (dragAndDropInitialized) return; 

    const gifts = document.querySelectorAll('.gift');
    const sack = document.getElementById('sack');


    gifts.forEach(gift => {
        gift.addEventListener('dragstart', dragStart);
    });

    sack.addEventListener('dragover', dragOver);
    sack.addEventListener('drop', drop);

    function dragStart(event) {
        event.dataTransfer.setData('text', event.target.id);
    }

    function dragOver(event) {
        event.preventDefault(); // permitir que el saco sea drop
    }

    function drop(event) {
    event.preventDefault();


    const giftId = event.dataTransfer.getData('text');
    const gift = document.getElementById(giftId);


    if (gift) {
        // ocultar el regalo original
        gift.classList.add('hidden');

        // añadirlo al saco
        const clonedGift = document.createElement('img');
        clonedGift.src = gift.src;
        clonedGift.alt = gift.alt;
        clonedGift.classList.add('gift-in-sack'); 
        const sack = document.getElementById('sack');
        sack.appendChild(clonedGift);
    }

    // ver si todos los regalos han sido arrastrados
    if (document.querySelectorAll('.gift:not(.hidden)').length === 0) {
        alert('¡Felicidades! ¡El saco de Papá Noel está preparado!');
    }
}


    dragAndDropInitialized = true; 
}


document.addEventListener("DOMContentLoaded", resetTresEnRaya);
