import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" href="styles.css" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossOrigin="anonymous"
        />
        <link href="https://getbootstrap.com/docs/5.1/assets/css/docs.css" rel="stylesheet" />
        <title>startup-xgrido</title>
      </head>
      <body>
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
      </body>

      <main>App components go here</main>

      <footer>
        <hr />
        <span class="text-reset">Mykle Keni</span>
        <br />
        <a href="https://github.com/cheewhoo/startup/tree/main">GitHub</a>
      </footer>
    </div>
    

  );
}
