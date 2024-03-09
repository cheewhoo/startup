const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 4000; // Change the port to 4000

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    try {
        const data = await fetchWeatherData();
        const temperature = data.properties.periods[0].temperature;
        res.send(`Temperature: ${temperature}°F`);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Error fetching weather data');
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

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
