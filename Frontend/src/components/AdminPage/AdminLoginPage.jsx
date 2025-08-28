import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLoginPage.css';

const AdminLoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Hardcoded credentials for demonstration
    if (username === 'admin' && password === 'password123') {
      onLogin(); // Call the login function passed from App.jsx
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        <p>Please log in to access the dashboard</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
