import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';  // Asegúrate de que esta línea esté presente

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else if (type === 'checkbox') {
      setAcceptTerms(checked);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!acceptTerms) {
      setError('You must accept the privacy terms to register.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // Aquí puedes agregar la lógica para el registro real
    console.log('User registered:', username);
    navigate('/');
  };

  return (
    <div className="register-background">
      <div className="register-container">
        <h2>Register</h2>
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
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={acceptTerms}
              onChange={handleChange}
              required
            />
            <label htmlFor="acceptTerms">
              I agree to the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            </label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
