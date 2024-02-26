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
            } else{
                computerTurn();
            }
        }
    }

    function computerTurn() {
        let emptyCells = [];
        cells.forEach((cell, index) => {
            if (!cell.textContent) {
                emptyCells.push(index);
            }
        });
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const randomCellIndex = emptyCells[randomIndex];
        cells[randomCellIndex].textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
        if (checkWin()) {
            endGame(currentPlayer === 'X' ? 'X wins!' : 'O wins!');
        } else if (checkDraw()) {
            endGame("It's a draw!");
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

    function endGame(message) {
        if (currentPlayer === 'X') {
            let winsX = localStorage.getItem('winsX') || 0;
            winsX++;
            localStorage.setItem('winsX', winsX);
        } else if (currentPlayer === 'O') {
            let lossesO = localStorage.getItem('lossesO') || 0;
            lossesO++;
            localStorage.setItem('lossesO', lossesO);
        }
        let notification = document.querySelector('.notification');
        notification.textContent = message;
        currentPlayer = null;
        cells.forEach(cell => cell.removeEventListener('click', cellClickHandler));
    }

    function restartGame() {
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
        initGame(); 
        let notification = document.querySelector('.notification');
        notification.innerHTML = ''; 
    }


    document.getElementById('start-button').addEventListener('click', function() {
        initGame(); 
    });


    document.getElementById('restart-button').addEventListener('click', restartGame);
});
