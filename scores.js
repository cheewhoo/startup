document.addEventListener('DOMContentLoaded', function() {
    let playerName = localStorage.getItem('username');
    let wins = localStorage.getItem(`${playerName}_wins`) || 0;
    let losses = localStorage.getItem(`${playerName}_losses`) || 0;
    document.getElementById('wins').textContent = `Wins: ${wins}`;
    document.getElementById('losses').textContent = `Losses: ${losses}`;
    fetchWeatherData().then(data => {
        let temperature = data.properties.periods[0].temperature;
        document.getElementById('weather').textContent = `Temperature: ${temperature}°F`;
    }).catch(error => {
        console.error('Error fetching weather data:', error);
    });
});

async function fetchWeatherData() {
    const apiUrl = 'https://api.weather.gov/gridpoints/SLC/100,192/forecast';
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    
    return response.json();
}
