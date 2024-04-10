import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Login from './login.jsx';
// import Play from './play.jsx';
// import Scores from './scores.jsx';
// import CreateAccount from './account.jsx';

export default function App() {
  return (
    <BrowserRouter>
        <header>
          <h1>XGridO</h1>
          <nav>
            <menu>
              <ul className="button-menu">
                <li><a href="play.html">Play</a></li>
                <li><a href="scores.html">My Scores</a></li>
              </ul>
            </menu>
            <menu className='navbar-nav'>
              <li className='nav-item'>
                <NavLink className='nav-link' to=''>
                  Home
                </NavLink>
              </li>
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='createaccount'>
                    Create Account
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='scores'>
                    Scores
                  </NavLink>
                </li>
              )}
              <li className='nav-item'>
                <NavLink className='nav-link' to='play'>
                  Play
                </NavLink>
              </li>
            </menu>
          </nav>
        </header>
      
        <Routes>
          <Route path='/' element={<Login/>} exact />
          {/* <Route path='/createaccount' element={<CreateAccount />} /> */}
          <Route path='/scores' element={<Scores />} />
          <Route path='/play' element={<Play />} />
        </Routes>

        <footer>
          <hr />
          <span className="text-reset">Mykle Keni</span>
          <br />
          <a href="https://github.com/cheewhoo/startup/tree/main">GitHub</a>
        </footer>
        </BrowserRouter>
    

  );
}
