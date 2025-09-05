import React from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import { BsShieldFillCheck, BsArrowLeft } from 'react-icons/bs';
import { FaHeartbeat, FaCheckCircle } from 'react-icons/fa';
import { MdEmail, MdVisibility } from 'react-icons/md';

const LoginPage = () => {
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
          <form>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <MdEmail className="input-icon left" />
                <input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
           <div className="input-wrapper">
  <input type="password" id="password" placeholder="Enter your password" />
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
