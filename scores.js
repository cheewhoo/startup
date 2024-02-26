document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the win count for X and the loss count for O from localStorage
    let winsX = localStorage.getItem('winsX') || 0;
    let lossesO = localStorage.getItem('lossesO') || 0;

    // Display the win count for X and the loss count for O on the page
    document.getElementById('wins').textContent = `Wins: ${winsX}`;
    document.getElementById('losses').textContent = `Losses: ${lossesO}`;
});
