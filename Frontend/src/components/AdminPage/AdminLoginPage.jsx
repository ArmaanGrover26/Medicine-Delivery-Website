import React, { useState } from 'react';
import { BsArrowLeft, BsShieldLockFill } from 'react-icons/bs';
import { MdEmail, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FaUserPlus, FaHeadset, FaHeart, FaCheckCircle, FaUser, FaPhoneAlt, FaLock } from 'react-icons/fa'; // Import FaLock
import { useNavigate } from 'react-router-dom';
import './AdminLoginPage.css';

const AdminLoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="admin-login-container">
      <div className="login-content-wrapper">
        {/* Left Column (Promotional Content) */}
        <div className="login-promo-column">
          <h2>
            Welcome Back to <span className="health-text">Better Health</span>
          </h2>
          <p>
            Access your personalized healthcare dashboard, track orders and manage your wellness journey with our comprehensive platform.
          </p>
          <div className="promo-features-list">
            <div className="feature-item">
              <div className="feature-icon">
                <BsShieldLockFill />
              </div>
              <p>Secure & Encrypted</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <FaCheckCircle />
              </div>
              <p>Verified Medicines</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <FaHeadset />
              </div>
              <p>Expert Care</p>
            </div>
          </div>
        </div>

        {/* Right Column (Login Form) */}
        <div className="login-form-column">
          <h3>Sign In</h3>
          <p className="form-subtitle">Welcome to your admin dashboard</p>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                {/* New: Add a static lock icon */}
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <span onClick={togglePasswordVisibility} className="input-icon-right">
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </span>
              </div>
            </div>
            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
