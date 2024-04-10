import React from 'react';
import Login from './login.jsx';

export default function App() {
  return (
    <div>
        <header>
          <h1>XGridO</h1>
          <nav>
            <menu>
              <ul className="button-menu">
                <li><a href="index.html">Home</a></li>
                <li><a href="account.html">Create Account</a></li>
                <li><a href="play.html">Play</a></li>
                <li><a href="scores.html">My Scores</a></li>
              </ul>
            </menu>
          </nav>
        </header>
      
        <main>
          <Login />
        </main>

        <footer>
          <hr />
          <span class="text-reset">Mykle Keni</span>
          <br />
          <a href="https://github.com/cheewhoo/startup/tree/main">GitHub</a>
        </footer>
    </div>
    

  );
}
