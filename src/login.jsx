import React from 'react';
import './app.css';



export default function Login() {
    <div>
        <h1>Are You Ready To Play?</h1>
        <form id="loginForm" method="get" action="play.html">
            <label for="name" style="color: black;">Username:</label>
            <input type="text" id="name" placeholder="Your gamertag here" />
            <label for="password" style="color: black;">Password:</label>
            <input type="text" id="password" placeholder="Your password here" />
            <button type="submit" style="color: black;">Login</button>
          </form>
        <h3>or</h3>
        <form method="get" action="account.html">
            <button type="submit" style="color: black;">create an account</button>
        </form>
    </div>
}