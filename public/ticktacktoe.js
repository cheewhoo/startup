document.addEventListener('DOMContentLoaded', function() {
    let currentPlayer; 
    let cells;

    // setInterval(() => {
    //     const players = ['Lee','Billy','Max','James','Alison','Shaniqua']; // Add more player names as needed
    //     const randomPlayerIndex = Math.floor(Math.random() * players.length);
    //     const randomPlayer = players[randomPlayerIndex];
    //     const notification = document.querySelector('.notification');
    //     const message = `${randomPlayer} won!`;
    //     const listItem = document.createElement('li');
    //     listItem.textContent = message;
    //     notification.appendChild(listItem);
    // }, 4000); 
    // WebSocket event listener for gameEnded event

    socket.on('gameEnded', function(message) {
        const notification = document.querySelector('.notification');
        const listItem = document.createElement('li');
        listItem.textContent = message;
        notification.appendChild(listItem);
    });
    
    function initGame() {
        currentPlayer = 'X'; 
        cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.addEventListener('click', cellClickHandler));
    }

    function cellClickHandler(event) {
        const cell = event.target;
        if (!cell.textContent && currentPlayer) { 
            cell.textContent = currentPlayer; 
            if (checkWin()) {
                endGame(`${currentPlayer} wins!`);
            } else if (checkDraw()) {
                endGame("It's a draw!"); 
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
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
        if (checkWin()) {
            endGame(`${currentPlayer} wins!`);
        } else if (checkDraw()) {
            endGame("It's a draw!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
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

    async function endGame() {
        let winbool = true
        let playerName = document.querySelector('.player-name').textContent;
        let wins = localStorage.getItem(`${playerName}_wins`) || 0;
        let losses = localStorage.getItem(`${playerName}_losses`) || 0;
        let message = '';
        if (currentPlayer === 'X' && checkWin()) {
            message = `${playerName} wins!`;
            winbool = true;
            localStorage.setItem(`${playerName}_wins`, wins);
        } else if (currentPlayer === 'O' && checkWin()) {
            message = `${playerName} lost!`;
            winbool = false
            localStorage.setItem(`${playerName}_losses`, losses);
        } else if (checkDraw()) {
            message = "It's a draw!";
        }
    
        if (message !== '') {
            let notification = document.querySelector('.notification');
            notification.textContent = message;
        }
    
        let inputObject = {username: playerName, win: winbool}
        console.log(inputObject)
        currentPlayer = null;
        cells.forEach(cell => cell.removeEventListener('click', cellClickHandler));
        const response = await fetch(`/api/updatescores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(inputObject)
        });
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
    //websocket event listener
    socket.on('gameEnd', function(message) {
        const notification = document.querySelector('.notification');
        notification.textContent = message;
    });
});
