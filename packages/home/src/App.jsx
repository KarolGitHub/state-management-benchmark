import React from 'react';
import '../../../css/bootstrap/dist/css/bootstrap.min.css';
import '../../../css/styles.css';

function App() {
  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Choose a state management framework:</h3>
        </div>
        <div className="panel-body">
          <ul className="nav nav-pills nav-stacked">
            <li>
              <a href="http://localhost:3001">
                <span className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span> React Hooks
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
