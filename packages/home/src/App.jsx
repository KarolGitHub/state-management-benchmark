import React from 'react';
import '../../../css/styles.css';

function App() {
  return (
    <div className="container">
      <h3>Choose a state management framework:</h3>
      <div className="card p-2">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="http://localhost:3001">
              <span className="fas fa-arrow-right" aria-hidden="true"></span> React Hooks v17.0.1
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://localhost:3002">
              <span className="fas fa-arrow-right" aria-hidden="true"></span> Svelte v3.42.1
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://localhost:3003">
              <span className="fas fa-arrow-right" aria-hidden="true"></span> Vue v3.2.1
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://localhost:4200">
              <span className="fas fa-arrow-right" aria-hidden="true"></span> Angular v12.0.1
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
