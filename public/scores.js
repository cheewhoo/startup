document.addEventListener('DOMContentLoaded', async function() {
    let playerName = localStorage.getItem('username');
    
    try {
        // Fetch player scores from the server
        const response = await fetch(`/score/${playerName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch player scores');
        }

        const scores = await response.json();
        const { wins, losses } = scores;
        document.getElementById('wins').textContent = `Wins: ${wins}`;
        document.getElementById('losses').textContent = `Losses: ${losses}`;

        // Fetch weather data
        const weatherData = await fetchWeatherData();
        const temperature = weatherData.properties.periods[0].temperature;
        document.getElementById('weather').textContent = `Provo Temperature: ${temperature}°F`;
    } catch (error) {
        console.error('Error:', error);
    }
});

async function fetchWeatherData() {
    const apiUrl = 'https://api.weather.gov/gridpoints/SLC/100,192/forecast';
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    
    return response.json();
}
