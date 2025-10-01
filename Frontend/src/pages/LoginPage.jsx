import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Import the useAuth hook
import './LoginPage.css';
import { BsShieldFillCheck, BsArrowLeft } from 'react-icons/bs';
import { FaHeartbeat, FaCheckCircle } from 'react-icons/fa';
import { MdEmail, MdVisibility } from 'react-icons/md';

const LoginPage = () => {
  const { login } = useAuth(); // 2. Get the login function from the context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 3. Create the function to handle form submission
  const handleSignIn = (e) => {
    e.preventDefault(); // Prevent the page from reloading
    if (email && password) {
      // For this mock login, we'll create a user object
      // In a real app, you would send this to your backend for verification
      const userData = {
        email: email,
        name: 'John Doe', // You can get the name from a backend in a real app
      };
      login(userData); // Call the login function from the context
    } else {
      alert('Please enter both email and password.');
    }
  };

  return (
    <div className="login-page-container">
      <Link to="/" className="back-to-home">
        <BsArrowLeft /> Back to Home
      </Link>
      <div className="login-content-wrapper">
        {/* Left Column */}
        <div className="login-promo-column">
          <div className="login-logo">
            <FaHeartbeat />
            <span>HealthMeds</span>
          </div>
          <h2>
            Welcome Back to Better <span className="health-text">Health</span>
          </h2>
          <p>
            Access your personalized healthcare dashboard, track orders, and
            manage your wellness journey with our comprehensive platform.
          </p>
          <div className="promo-features">
            <div className="promo-feature-item">
              <BsShieldFillCheck /> Secure & Encrypted
            </div>
            <div className="promo-feature-item">
              <BsShieldFillCheck /> Verified Medicines
            </div>
            <div className="promo-feature-item">
              <BsShieldFillCheck /> Expert Care
            </div>
          </div>
          <div className="testimonial-box">
            <FaCheckCircle className="testimonial-icon" />
            <p className="testimonial-quote">
              "HealthMeds has revolutionized how I manage my family's healthcare
              needs. Quick delivery, authentic medicines, and excellent customer
              service."
            </p>
            <span className="testimonial-author">
              Dr. Sarah Johnson, Family Physician
            </span>
          </div>
        </div>

        {/* Right Column (Sign-in Form) */}
        <div className="login-form-column">
          <h3>Sign In</h3>
          <p className="form-subtitle">
            Enter your credentials to access your account
          </p>
          {/* 4. Connect the form to the handleSignIn function */}
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
                    onChange={(e) => setEmail(e.target.value)} // 5. Update email state
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
                    onChange={(e) => setPassword(e.target.value)} // 6. Update password state
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
            <button type="submit" className="signin-btn">
              Sign In
            </button>
          </form>
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;