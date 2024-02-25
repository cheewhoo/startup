document.addEventListener('DOMContentLoaded', function() {
    let currentPlayer; 
    let cells; 

    function initGame() {
        currentPlayer = 'X';
        cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.addEventListener('click', cellClickHandler));
    }

    function cellClickHandler(event) {
    const cell = event.target;
    if (!cell.textContent && currentPlayer) { 
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (checkWin()) {
            endGame(currentPlayer === 'X' ? 'X wins!' : 'O wins!');
        } else if (checkDraw()) {
            endGame("It's a draw!");
        }
    }
}

    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        return winConditions.some(combination =>
            combination.every(index => cells[index].textContent === currentPlayer)
        );
    }

    function checkDraw() {
    return [...cells].every(cell => cell.textContent !== '') && !checkWin();
}
    // Function to end the game
function endGame(winner) {
    let notification = document.querySelector('.notification');
    if (winner) {
        notification.innerHTML = `<li class="player-name">${winner} wins!</li>`;
    } else {
        notification.innerHTML = `<li class="player-name">It's a draw!</li>`;
    }
    // Reset current player and remove cell click event listeners
    currentPlayer = null;
    cells.forEach(cell => cell.removeEventListener('click', cellClickHandler));
}

    document.getElementById('start-button').addEventListener('click', function() {
        initGame();
    });
});
