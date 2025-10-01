import React, { useState } from 'react';
import './SignUpPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { BsArrowLeft, BsShieldLockFill } from 'react-icons/bs';
import { FaUserPlus, FaHeadset, FaHeart, FaCheckCircle, FaUser, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail, MdVisibility } from 'react-icons/md';

const SignUpPage = () => {
  const { signup } = useAuth(); // Get the signup function from context
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    setIsLoading(true);

    try {
      // Call the signup function from our updated AuthContext
      await signup({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      // On success, show an alert and redirect to the login page
      alert('Account created successfully! Please log in.');
      navigate('/login');

    } catch (err) {
      // The catch block is now very simple.
      // It just displays the specific error message thrown by the context.
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon left" />
                <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} required className="left-icon" placeholder="Enter your full name" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <MdEmail className="input-icon left" />
                <input type="email" id="email" value={formData.email} onChange={handleChange} required className="left-icon" placeholder="your.email@example.com" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="input-wrapper">
                <FaPhoneAlt className="input-icon left" />
                <input type="tel" id="phone" value={formData.phone} onChange={handleChange} required className="left-icon" placeholder="+91 9876543210" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input type="password" id="password" value={formData.password} onChange={handleChange} required className="right-icon" placeholder="Create a secure password" />
                <MdVisibility className="input-icon-right right" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="right-icon" placeholder="Confirm your password" />
                <MdVisibility className="input-icon-right right" />
              </div>
            </div>
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" required /> I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
              </label>
            </div>
            <button type="submit" className="action-btn" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
          <p className="signin-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
