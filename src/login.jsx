


import React from 'react';
import './app.css';

export default function Login() {

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault(); 
    const username = event.target.elements.name.value;
    const password = event.target.elements.password.value;

    if (username.trim() === '' || password.trim() === '') {
        alert("Please enter both username and password.");
        return;
    }

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('username', username); 
            console.log("logged in :)")
            // use navigate

        } else {
            const errorData = await response.json();
            alert(errorData.msg || 'Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Are You Ready To Play?</h1>
      <form id="loginForm" onSubmit={handleLoginFormSubmit}>
        <label htmlFor="name" style={{ color: 'black' }}>Username:</label>
        <input type="text" id="name" placeholder="Your gamertag here" />
        <label htmlFor="password" style={{ color: 'black' }}>Password:</label>
        <input type="password" id="password" placeholder="Your password here" />
        <button type="submit" style={{ color: 'black' }}>Login</button>
      </form>
      <h3>or</h3>
      <form method="get" action="account.html">
        <button type="submit" style={{ color: 'black' }}>Create an Account</button>
      </form>
    </div>
  );
}
