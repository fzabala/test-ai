import React from 'react';
import './LoginButtons.css';

function LoginButtons() {
  return (
    <div className="login-buttons-container">
      <button className="login-button google-button">
        Login with Google
      </button>
      <button className="login-button meta-button">
        Login with Meta
      </button>
    </div>
  );
}

export default LoginButtons;

