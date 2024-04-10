import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Play() {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [cells, setCells] = useState(Array(9).fill(''));

  useEffect(() => {
    const handleCellClick = (index) => {
      if (!cells[index] && currentPlayer) {
        const newCells = [...cells];
        newCells[index] = currentPlayer;
        setCells(newCells);
        if (checkWin(newCells)) {
          endGame(`${currentPlayer} wins!`);
        } else if (checkDraw(newCells)) {
          endGame("It's a draw!");
        } else {
          setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
          if (currentPlayer === 'X') {
            computerTurn();
          }
        }
      }
    };

    const cellsElements = document.querySelectorAll('.cell');
    cellsElements.forEach((cell, index) => {
      cell.addEventListener('click', () => handleCellClick(index));
    });

    return () => {
      cellsElements.forEach((cell, index) => {
        cell.removeEventListener('click', () => handleCellClick(index));
      });
    };
  }, [cells, currentPlayer]);

  const computerTurn = () => {
    const emptyCells = cells.reduce((acc, cell, index) => {
      if (!cell) acc.push(index);
      return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCellIndex = emptyCells[randomIndex];
    const newCells = [...cells];
    newCells[randomCellIndex] = currentPlayer;
    setCells(newCells);

    if (checkWin(newCells)) {
      endGame(`${currentPlayer} wins!`);
    } else if (checkDraw(newCells)) {
      endGame("It's a draw!");
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWin = (cells) => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winConditions.some(combination =>
      combination.every(index => cells[index] === currentPlayer)
    );
  };

  const checkDraw = (cells) => {
    return cells.every(cell => cell !== '') && !checkWin(cells);
  };

  const endGame = (message) => {
    let winbool = true;
    let playerName = document.querySelector('.player-name').textContent;
    let wins = localStorage.getItem(`${playerName}_wins`) || 0;
    let losses = localStorage.getItem(`${playerName}_losses`) || 0;
    if (currentPlayer === 'X' && checkWin()) {
      message = `${playerName} wins!`;
      winbool = true;
      localStorage.setItem(`${playerName}_wins`, wins);
    } else if (currentPlayer === 'O' && checkWin()) {
      message = `${playerName} lost!`;
      winbool = false;
      localStorage.setItem(`${playerName}_losses`, losses);
    } else if (checkDraw()) {
      message = "It's a draw!";
    }
  
    if (message !== '') {
      let notification = document.querySelector('.notification');
      notification.textContent = message;
      console.log(message);
    }
  };
  

  const restartGame = () => {
    setCells(Array(9).fill(''));
    setCurrentPlayer('X');
  };

  return (
    <div>
      <header>
        <h1>XGridO</h1>
        <nav>
          <menu>
            <ul className="button-menu">
              <li><NavLink to='/'>Home</NavLink></li>
              <li><NavLink to='/createaccount'>Create Account</NavLink></li>
              <li><NavLink to='/scores'>Scores</NavLink></li>
              <li><NavLink to='/play'>Play</NavLink></li>
            </ul>
          </menu>
        </nav>
      </header>

      <main>
        <div className="players">
          Player:
          <span className="player-name">players name here</span>
        </div>
        <ul className="notification">
          <li className="player-name">soandso started a game</li>
          <li className="player-name">rando started a game</li>
          <li className="player-name">soandso won</li>
          <li className="player-name">rando lost</li>
        </ul>
        <div id="game-container">
          <div className="xgrido">
            <table>
              <tbody>
                <tr>
                  {[0, 1, 2].map((index) => (
                    <td key={index}><button id={`cell-${index}`} className="cell">{cells[index]}</button></td>
                  ))}
                </tr>
                <tr>
                  {[3, 4, 5].map((index) => (
                    <td key={index}><button id={`cell-${index}`} className="cell">{cells[index]}</button></td>
                  ))}
                </tr>
                <tr>
                  {[6, 7, 8].map((index) => (
                    <td key={index}><button id={`cell-${index}`} className="cell">{cells[index]}</button></td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button type="button" className="start-button" onClick={() => setCurrentPlayer('X')}>Start Game</button>
        <button className="restart-button" onClick={restartGame}>Restart Game</button>
      </main>

      <footer>
        <hr />
        <span className="text-reset">Mykle Keni</span>
        <br />
        <a href="https://github.com/cheewhoo/startup/tree/main">GitHub</a>
      </footer>
    </div>
  );
}
