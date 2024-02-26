document.addEventListener('DOMContentLoaded', function() {
    let playerName = localStorage.getItem('username');
    let wins = localStorage.getItem(`${playerName}_wins`) || 0;
    let losses = localStorage.getItem(`${playerName}_losses`) || 0;
    document.getElementById('wins').textContent = `Wins: ${wins}`;
    document.getElementById('losses').textContent = `Losses: ${losses}`;
});
