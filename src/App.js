import React from 'react';
import LoginButtons from './components/LoginButtons';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome</h1>
        <p>Please log in to continue:</p>
        <LoginButtons />
      </header>
    </div>
  );
}

export default App;

