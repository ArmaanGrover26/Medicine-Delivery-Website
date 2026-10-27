import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaMotorcycle,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaIdCard,
  FaMapMarkerAlt,
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle
} from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import './DeliverySignUpPage.css';

const DeliverySignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    vehicleType: 'Motorcycle',
    vehicleNumber: '',
    drivingLicense: '',
    city: 'Delhi NCR'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { deliverySignup } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await deliverySignup(formData);
    } catch (err) {
      setError(err.message || 'Failed to complete registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delivery-signup-wrapper">
      <Link to="/" className="back-to-home">
        <BsArrowLeft /> Back to Home
      </Link>

      <div className="delivery-signup-card-light">
        <div className="delivery-signup-header">
          <div className="delivery-signup-icon-badge">
            <FaMotorcycle />
          </div>
          <h2>Join the Delivery Fleet</h2>
          <p>Deliver medicines with flexible hours and instant payouts</p>
        </div>

        {error && <div className="delivery-auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="delivery-login-form">
          <div className="delivery-section-divider">
            <span>1</span> Personal Details
          </div>

          <div className="delivery-form-row-2">
            <div className="delivery-field-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="delivery-input-inner">
                <FaUser className="delivery-input-icon" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="delivery-field-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="delivery-input-inner">
                <FaPhone className="delivery-input-icon" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="delivery-form-row-2">
            <div className="delivery-field-group">
              <label htmlFor="email">Email Address</label>
              <div className="delivery-input-inner">
                <FaEnvelope className="delivery-input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="rider@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="delivery-field-group">
              <label htmlFor="password">Create Password</label>
              <div className="delivery-input-inner">
                <FaLock className="delivery-input-icon" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="delivery-section-divider">
            <span>2</span> Vehicle & Logistics
          </div>

          <div className="delivery-form-row-2">
            <div className="delivery-field-group">
              <label htmlFor="vehicleType">Vehicle Type</label>
              <div className="delivery-input-inner">
                <FaMotorcycle className="delivery-input-icon" />
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                >
                  <option value="Motorcycle">Motorcycle / Bike</option>
                  <option value="Scooter">Scooter / Moped</option>
                  <option value="Bicycle">Bicycle / E-cycle</option>
                  <option value="Electric Van">Electric Van</option>
                </select>
              </div>
            </div>

            <div className="delivery-field-group">
              <label htmlFor="vehicleNumber">Vehicle Registration / Plate</label>
              <div className="delivery-input-inner">
                <FaIdCard className="delivery-input-icon" />
                <input
                  id="vehicleNumber"
                  name="vehicleNumber"
                  type="text"
                  required
                  placeholder="DL-01-AB-1234"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="delivery-form-row-2">
            <div className="delivery-field-group">
              <label htmlFor="drivingLicense">Driving License / Govt ID</label>
              <div className="delivery-input-inner">
                <FaShieldAlt className="delivery-input-icon" />
                <input
                  id="drivingLicense"
                  name="drivingLicense"
                  type="text"
                  required
                  placeholder="DL-987654321098"
                  value={formData.drivingLicense}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="delivery-field-group">
              <label htmlFor="city">Operating City</label>
              <div className="delivery-input-inner">
                <FaMapMarkerAlt className="delivery-input-icon" />
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune</option>
                  <option value="Kolkata">Kolkata</option>
                </select>
              </div>
            </div>
          </div>

          <div className="delivery-perks-box">
            <div className="perk-tag">
              <FaCheckCircle /> Instant Activation
            </div>
            <div className="perk-tag">
              <FaCheckCircle /> Daily Payouts
            </div>
            <div className="perk-tag">
              <FaCheckCircle /> Flexible Shifts
            </div>
          </div>

          <button
            type="submit"
            className="delivery-submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating Partner Account...' : (
              <>
                <span>Complete Application & Enter Dashboard</span>
                <FaArrowRight />
              </>
            )}
          </button>
        </form>

        <div className="delivery-login-footer">
          <p>
            Already a delivery partner?{' '}
            <Link to="/delivery/login">Rider Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliverySignUpPage;
