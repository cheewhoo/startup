import React, { useState } from 'react';
import './account.css';
import { NavLink } from 'react-router-dom';

export default function Account() {
  const [username, setUsername] = useState('');

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('username', username);
    // Redirect to play page or perform any other action as needed
    window.location.href = 'play.html';
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
          <input type="password" id="password" placeholder="Your password here" />
          <button type="submit" style={{ color: 'black' }}>Login</button>
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
