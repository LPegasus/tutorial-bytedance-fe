import React from 'react';
import logo from './logo.svg';
import './App.css';
import animationData from './assets/lottie/mario-run.json';

import { useLottie } from '@sjtu-fe/react-components';

function App() {
  const elm = useLottie({
    animationData,
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {elm}
    </div>
  );
}

export { App };
