document.addEventListener('DOMContentLoaded', async function() {
    let playerName = localStorage.getItem('username');
    
    const response = await fetch(`/api/getscores`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({username: playerName})
    });
    const score_response = await response.json()

    document.getElementById('wins').textContent = `Wins: ${score_response.wins}`;
    document.getElementById('losses').textContent = `Losses: ${score_response.losses}`;

        // Fetch weather data
        const weatherData = await fetchWeatherData();
        const temperature = weatherData.properties.periods[0].temperature;
        document.getElementById('weather').textContent = `Provo Temperature: ${temperature}°F`; 
});

async function fetchWeatherData() {
    const apiUrl = 'https://api.weather.gov/gridpoints/SLC/100,192/forecast';
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    
    return response.json();
}
