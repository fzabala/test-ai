import React from 'react';

function LoginPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f2f5'
    }}>
      <h1>Login to Your Account</h1>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '300px',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}>
        <button
          style={{
            padding: '12px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
            border: '1px solid #ddd',
            backgroundColor: '#ffffff',
            color: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
          onClick={() => console.log('Login with Google clicked')}
        >
          <img
            src="https://img.icons8.com/color/24/000000/google-logo.png"
            alt="Google logo"
            style={{ width: '20px', height: '20px' }}
          />
          Login with Google
        </button>
        <button
          style={{
            padding: '12px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
            border: '1px solid #ddd',
            backgroundColor: '#ffffff',
            color: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
          onClick={() => console.log('Login with Meta clicked')}
        >
          <img
            src="https://img.icons8.com/fluency/24/000000/meta.png"
            alt="Meta logo"
            style={{ width: '20px', height: '20px' }}
          />
          Login with Meta
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
