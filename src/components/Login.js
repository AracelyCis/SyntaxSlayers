import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes ajustar la lógica para autenticación real
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);  // Actualiza el estado de autenticación
      navigate('/face-recognition'); // Redirige al usuario solo si es autenticado
    } else {
      setError('Invalid username or password');
      setIsAuthenticated(false); // Asegúrate de que el estado de autenticación sea falso
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
          <p>
            Don't have an account?{' '}
            <button onClick={() => navigate('/register')}>Register</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
