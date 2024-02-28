document.addEventListener('DOMContentLoaded', function() {
    let playerName = localStorage.getItem('username');
    let wins = localStorage.getItem(`${playerName}_wins`) || 0;
    let losses = localStorage.getItem(`${playerName}_losses`) || 0;
    document.getElementById('wins').textContent = `Wins: ${wins}`;
    document.getElementById('losses').textContent = `Losses: ${losses}`;
    let randomWeather = getRandomNumber(0, 100);
    document.getElementById('weather').textContent = `Temperature: ${randomWeather} F`;
});
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
