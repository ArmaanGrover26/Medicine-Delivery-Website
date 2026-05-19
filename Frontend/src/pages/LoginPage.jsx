import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';
import { BsShieldFillCheck, BsArrowLeft } from 'react-icons/bs';
import { FaHeartbeat, FaCheckCircle } from 'react-icons/fa';
import { MdEmail, MdVisibility } from 'react-icons/md';

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // This function now handles the real API call
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Call the login function from AuthContext, which talks to the backend
      await login({ email, password });
      // Navigation to the profile page is handled inside the login function on success
    } catch (err) {
      // If the login function throws an error (e.g., 401 Unauthorized), we catch it here
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <Link to="/" className="back-to-home">
        <BsArrowLeft /> Back to Home
      </Link>
      <div className="login-content-wrapper">
        {/* Sign-in Form */}
        <div className="login-form-column">
          <h3>Sign In</h3>
          <p className="form-subtitle">
            Enter your credentials to access your account
          </p>
          <form onSubmit={handleSignIn}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <MdEmail className="input-icon left" />
                <input
                  type="email"
                  id="email"
                  className="left-icon"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  className="right-icon"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <MdVisibility className="input-icon right" />
              </div>
            </div>
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#/">Forgot password?</a>
            </div>
            <button type="submit" className="signin-btn" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          {/* Display error messages from the backend */}
          {error && <p className="error-message">{error}</p>}
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;