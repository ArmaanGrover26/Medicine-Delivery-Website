import React from 'react';
import './SignUpPage.css'; // We will create this CSS file next
import { Link } from 'react-router-dom';
// Import all the icons we need for this page
import { BsArrowLeft, BsShieldLockFill } from 'react-icons/bs';
import { FaUserPlus, FaHeadset, FaHeart, FaCheckCircle, FaUser, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail, MdVisibility } from 'react-icons/md';

const SignUpPage = () => {
  return (
    <div className="signup-page-container">
      <Link to="/" className="back-to-home">
        <BsArrowLeft /> Back to Home
      </Link>
      <div className="signup-content-wrapper">
        {/* Left Column */}
        <div className="signup-promo-column">
          <div className="signup-logo">
            <FaUserPlus />
            <span>Join HealthMeds</span>
          </div>
          <h2>Create Your <span className="health-text">Health Account</span></h2>
          <p>Join thousands of users who trust HealthMeds for their healthcare needs. Get access to verified medicines, expert consultations, and personalized care.</p>
          
          <h4>Why choose HealthMeds?</h4>
          <div className="promo-features-list">
            <div className="feature-item">
              <div className="feature-icon"><BsShieldLockFill /></div>
              <div>
                <strong>Secure Account</strong>
                <p>Your data is protected with enterprise-grade security</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><FaHeadset /></div>
              <div>
                <strong>Expert Support</strong>
                <p>24/7 access to certified pharmacists and healthcare professionals</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><FaHeart /></div>
              <div>
                <strong>Personalized Care</strong>
                <p>Tailored recommendations based on your health profile</p>
              </div>
            </div>
          </div>

          <div className="trusted-by-box">
            <FaCheckCircle className="trusted-icon" />
            <div>
              <strong>Trusted by 50,000+ Users</strong>
              <p>Licensed pharmacy with verified medicines and expert healthcare professionals</p>
            </div>
          </div>
        </div>

        {/* Right Column (Sign-up Form) */}
        <div className="signup-form-column">
          <h3>Create Account</h3>
          <p className="form-subtitle">Fill in your details to get started</p>
          <form>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input type="text" id="fullName" placeholder="Enter your full name" />
              </div>
            </div>
             <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <MdEmail className="input-icon" />
                <input type="email" id="email" placeholder="your.email@example.com" />
              </div>
            </div>
             <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="input-wrapper">
                <FaPhoneAlt className="input-icon" />
                <input type="tel" id="phone" placeholder="+91 9876543210" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input type="password" id="password" placeholder="Create a secure password" />
                <MdVisibility className="input-icon-right" />
              </div>
            </div>
             <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <input type="password" id="confirmPassword" placeholder="Confirm your password" />
                <MdVisibility className="input-icon-right" />
              </div>
            </div>
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" /> I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
              </label>
            </div>
            <button type="submit" className="action-btn">Create Account</button>
          </form>
          <p className="signin-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;