import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Account() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('username', username);
        console.log("logged in :)");
        navigate('/play'); // Navigate to the 'play' route
      } else {
        const errorData = await response.json();
        alert(errorData.msg || 'Account creation failed');
      }
    } catch (error) {
      console.error('Error during account creation:', error);
      alert('An error occurred during account creation. Please try again later.');
    }
  };

  return (
    <div>

      <main>
        <h1>Welcome to XGridO!</h1>
        <h2>Create a free account today</h2>
        <form id="newlogin" onSubmit={handleLoginFormSubmit}>
          <label htmlFor="name" style={{ color: 'black' }}>Username:</label>
          <input type="text" id="name" placeholder="Your gamertag here" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="password" style={{ color: 'black' }}>Password:</label>
          <input type="password" id="password" placeholder="Your password here" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" style={{ color: 'black' }}>Create Account</button>
        </form>
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
