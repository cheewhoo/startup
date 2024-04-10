import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Login from './login.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
// import Play from './play.jsx';
// import Scores from './scores.jsx';
// import CreateAccount from './account.jsx';

export default function App() {
  return (
    <BrowserRouter>
        <header>
          <h1>XGridO</h1>
          <nav>
            <menu className='navbar-nav'>
              <li className='nav-item'>
                <NavLink className='nav-link' to=''>
                  Home
                </NavLink>
              </li>
              
                <li className='nav-item'>
                  <NavLink className='nav-link' to='createaccount'>
                    Create Account
                  </NavLink>
                </li>
              
              
                <li className='nav-item'>
                  <NavLink className='nav-link' to='scores'>
                    Scores
                  </NavLink>
                </li>
              
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
          {/* <Route path='/scores' element={<Scores />} /> */}
          {/* <Route path='/play' element={<Play />} /> */}
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
