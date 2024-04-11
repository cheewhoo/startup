import React, { useEffect } from 'react';

export default function Scores() {
  useEffect(() => {
    async function fetchData() {
      try {
        let playerName = localStorage.getItem('username');
        const response = await fetch(`/api/getscores`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: playerName })
        });
        const score_response = await response.json();

        document.getElementById('wins').textContent = `Wins: ${score_response.wins}`;
        document.getElementById('losses').textContent = `Losses: ${score_response.losses}`;

        // Fetch weather data
        const weatherData = await fetchWeatherData();
        const temperature = weatherData.properties.periods[0].temperature;
        document.getElementById('weather').textContent = `Provo Temperature: ${temperature}°F`;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

    async function fetchWeatherData() {
      const apiUrl = 'https://api.weather.gov/gridpoints/SLC/100,192/forecast';
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      return response.json();
    }
  }, []); // Empty dependency array ensures this effect runs only once after the component mounts

  return (
    <div>
      
      <main>
        <div id="picture" className="picture-box">
          <img width="400px" src="weather.jpg" alt="random" />
          <div id="weather" style={{ color: 'black' }}>Weather today is: some temperature</div>
          <div id="wins" style={{ color: 'black' }}>Wins: 0</div>
          <div id="losses" style={{ color: 'black' }}>Losses: 0</div>
        </div>
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
